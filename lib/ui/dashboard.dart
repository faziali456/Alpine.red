import 'dart:convert';
import 'dart:io';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:flutterfirebase/model/user_data.dart';
import 'package:flutterfirebase/ui/addFriend.dart';
import 'package:flutterfirebase/ui/drawer_2.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../constant.dart';
import '../main.dart';
import 'chat.dart';
import 'notificationActivity.dart';

class FindChat extends StatefulWidget {
  final String currentUserId;

  FindChat({Key key, @required this.currentUserId}) : super(key: key);

  @override
  State createState() => MainScreenState(currentUserId: currentUserId);
}

class MainScreenState extends State<FindChat> {
  MainScreenState({Key key, @required this.currentUserId});

  final String currentUserId;
  final FirebaseMessaging firebaseMessaging = new FirebaseMessaging();
  final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
      new FlutterLocalNotificationsPlugin();
  final GoogleSignIn googleSignIn = GoogleSignIn();

  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  var searchKey = "";

  bool isLoading = false;
  List<Choice> choices = const <Choice>[
    const Choice(title: 'Settings', icon: Icons.settings),
    const Choice(title: 'Log out', icon: Icons.exit_to_app),
  ];

  @override
  void initState() {
    super.initState();
    registerNotification();
    configLocalNotification();
  }

  void registerNotification() {
    firebaseMessaging.requestNotificationPermissions();

    firebaseMessaging.configure(onMessage: (Map<String, dynamic> message) {
      print('onMessage: $message');
      showNotification(message['notification']);
      return;
    }, onResume: (Map<String, dynamic> message) {
      print('onResume: $message');
      return;
    }, onLaunch: (Map<String, dynamic> message) {
      print('onLaunch: $message');
      return;
    });

    firebaseMessaging.getToken().then((token) {
      print('token: $token');
      Firestore.instance
          .collection('users')
          .document(currentUserId)
          .updateData({'pushToken': token});
    }).catchError((err) {
      Fluttertoast.showToast(msg: err.message.toString());
    });
  }

  void configLocalNotification() {
    var initializationSettingsAndroid =
        new AndroidInitializationSettings('app_icon');
    var initializationSettingsIOS = new IOSInitializationSettings();
    var initializationSettings = new InitializationSettings(
        initializationSettingsAndroid, initializationSettingsIOS);
    flutterLocalNotificationsPlugin.initialize(initializationSettings);
  }

  //exiting the aapp
  void onItemMenuPress(Choice choice) {
    if (choice.title == 'Log out') {
      handleSignOut();
    } else {}
  }

  void showNotification(message) async {
    var androidPlatformChannelSpecifics = new AndroidNotificationDetails(
      Platform.isAndroid
          ? 'com.dfa.flutterchatdemo'
          : 'com.duytq.flutterchatdemo',
      'Flutter chat demo',
      'your channel description',
      playSound: true,
      enableVibration: true,
      importance: Importance.Max,
      priority: Priority.High,
    );
    var iOSPlatformChannelSpecifics = new IOSNotificationDetails();
    var platformChannelSpecifics = new NotificationDetails(
        androidPlatformChannelSpecifics, iOSPlatformChannelSpecifics);
    await flutterLocalNotificationsPlugin.show(0, message['title'].toString(),
        message['body'].toString(), platformChannelSpecifics,
        payload: json.encode(message));
  }

  Future<bool> onBackPress() {
    openDialog();
    return Future.value(false);
  }

  Future<Null> openDialog() async {
    switch (await showDialog(
        context: context,
        builder: (BuildContext context) {
          return SimpleDialog(
            contentPadding:
                EdgeInsets.only(left: 0.0, right: 0.0, top: 0.0, bottom: 0.0),
            children: <Widget>[
              Container(
                color: themeColor,
                margin: EdgeInsets.all(0.0),
                padding: EdgeInsets.only(bottom: 10.0, top: 10.0),
                height: 100.0,
                child: Column(
                  children: <Widget>[
                    Container(
                      child: Icon(
                        Icons.exit_to_app,
                        size: 30.0,
                        color: Colors.white,
                      ),
                      margin: EdgeInsets.only(bottom: 10.0),
                    ),
                    Text(
                      'Exit app',
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: 18.0,
                          fontWeight: FontWeight.bold),
                    ),
                    Text(
                      'Are you sure to exit app?',
                      style: TextStyle(color: Colors.white70, fontSize: 14.0),
                    ),
                  ],
                ),
              ),
              SimpleDialogOption(
                onPressed: () {
                  Navigator.pop(context, 0);
                },
                child: Row(
                  children: <Widget>[
                    Container(
                      child: Icon(
                        Icons.cancel,
                        color: primaryColor,
                      ),
                      margin: EdgeInsets.only(right: 10.0),
                    ),
                    Text(
                      'CANCEL',
                      style: TextStyle(
                          color: primaryColor, fontWeight: FontWeight.bold),
                    )
                  ],
                ),
              ),
              SimpleDialogOption(
                onPressed: () {
                  Navigator.pop(context);
                  handleSignOut();
                },
                child: Row(
                  children: <Widget>[
                    Container(
                      child: Icon(
                        Icons.check_circle,
                        color: primaryColor,
                      ),
                      margin: EdgeInsets.only(right: 10.0),
                    ),
                    Text(
                      'YES',
                      style: TextStyle(
                          color: primaryColor, fontWeight: FontWeight.bold),
                    )
                  ],
                ),
              ),
            ],
          );
        })) {
      case 0:
        break;
      case 1:
        exit(0);
        break;
    }
  }

  Future<Null> handleSignOut() async {
    this.setState(() {
      isLoading = true;
    });

    await FirebaseAuth.instance.signOut();
    SharedPreferences pref = await SharedPreferences.getInstance();
    pref.remove("id");
    pref.remove("nickname");
    pref.remove("photoUrl");
    this.setState(() {
      isLoading = false;
    });

    Navigator.of(context)
        .pushNamedAndRemoveUntil('/', (Route<dynamic> route) => false);
  }

  // defining the main body of the page
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(40.0),
        child: AppBar(
          backgroundColor: theme,
          leading: InkWell(
            onTap: () => _scaffoldKey.currentState.openDrawer(),
            child: Icon(
              Icons.menu,
              color: Colors.white,
              size: 40,
            ),
          ),
          title: Text(
            'Find Users',
            style: TextStyle(fontSize: 25),
          ),
          centerTitle: true,
          actions: <Widget>[
//notification of upcoming friend request till yet
            Stack(
              children: <Widget>[
                Padding(
                    padding: EdgeInsets.fromLTRB(10.0, 0.0, 10.0, 0.0),
                    child: InkWell(
                      onTap: () => Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => Notificatios())),
                      child: Icon(
                        Icons.notifications,
                        color: Colors.white,
                        size: 40.0,
                      ),
                    )),
                Positioned(
                  left: 30,
                  top: 5,
                  child: CircleAvatar(
                    backgroundColor: Colors.red,
                    child: Text(
                      "1",
                      style: TextStyle(fontSize: 10),
                    ),
                    radius: 7,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
      drawer: DrawerPage(context),
      body: WillPopScope(
        child: ListHandler(currentUserId),
        onWillPop: onBackPress,
      ),
    );
  }
}

class Choice {
  const Choice({this.title, this.icon});

  final String title;
  final IconData icon;
}

class ListHandler extends StatefulWidget {
  final String currentUserId;
  ListHandler(this.currentUserId);

  @override
  State createState() => new ListHandlerState(currentUserId);
}

class ListHandlerState extends State<ListHandler> {
  final String currentUserId;
  ListHandlerState(
    this.currentUserId,
  );
  var searchkey1 = "";

//getting Stream from firebase
  Stream getData() {
    Stream stream1 = Firestore.instance
        .collection('friends')
        .document(User.userData.userId)
        .collection('friend')
        .snapshots();
    return stream1;
  }

  @override
  Widget build(BuildContext context) {
    //Building the main list of messages from friends
    return SingleChildScrollView(
        child: Column(
      children: <Widget>[
        Container(
            child: Row(
          children: <Widget>[
            Expanded(
              flex: 4,
//Searching Friends
              child: Container(
                margin:
                    EdgeInsets.only(left: 30, right: 30, top: 10, bottom: 10),
                alignment: Alignment.center,
                padding: EdgeInsets.only(left: 10),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(30.0),
                  color: Color(0xffF6F6F6),
                ),
                child: Row(
                  children: <Widget>[
                    Flexible(
                      child: TextField(
                        maxLines: 1,
                        keyboardType: TextInputType.emailAddress,
                        textAlign: TextAlign.center,
                        autofocus: false,
                        onChanged: (val) {
                          setState(() {
                            searchkey1 = val;
                            print('$searchkey1');
                          });
                        },
                        decoration: new InputDecoration(
                            border: InputBorder.none,
                            hintText: 'Search User by Name',
                            hintStyle: TextStyle(
                              color: textColor,
                              fontSize: 20.0,
                            ),
                            icon: InkWell(
                              child: Icon(
                                Icons.search,
                                color: textColor,
                              ),
                            )),
                      ),
                    )
                  ],
                ),
              ),
            ),
// adding friends
            Expanded(
                flex: 2,
                child: Container(
                  margin: EdgeInsets.only(right: 10),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(30.0),
                    color: textColor,
                  ),
                  child: FlatButton(
                    onPressed: () => Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) =>
                                AddFriend(widget.currentUserId))),
                    child: Text(
                      'Add friends',
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                )),
          ],
        )),
        SizedBox(
          height: 5,
        ),
//list of firends
        Container(
          height: MediaQuery.of(context).size.height / 1.4,
          child: StreamBuilder(
              stream: getData(),
              builder: (context, snapshot) {
                if (!snapshot.hasData) {
                  print(snapshot);
                  return new Text("loading");
                }
                if (snapshot.data.documents.length < 1) {
                  return Center(child: Text('No Friends'));
                } else {
                  return ListView.builder(
                      itemCount: snapshot.data.documents.length,
                      padding: const EdgeInsets.only(top: 2.0),
                      itemBuilder: (context, index) {
                        DocumentSnapshot ds = snapshot.data.documents[index];
                        if (searchkey1.toString().isEmpty) {
                          return Container(
                            padding:
                                EdgeInsets.only(left: 10, right: 10, top: 10),
                            child: Row(
                              children: <Widget>[
                                Container(
                                  padding: EdgeInsets.only(right: 10),
                                  child: InkWell(
                                    // onTap: () => Navigator.push(
                                    //     context,
                                    //     MaterialPageRoute(
                                    //         builder: (context) =>
                                    //             FriendsProfile())),
                                    child: CircleAvatar(
                                      backgroundColor: Colors.transparent,
                                      backgroundImage:
                                          AssetImage('assets/img/man.png'),
                                      radius: 25.0,
                                    ),
                                  ),
                                ),
                                Expanded(
                                  child: InkWell(
                                      onTap: () => Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                              builder: (BuildContext context) =>
                                                  Chat(
                                                    peerId: ds.documentID,
                                                    peerAvatar: ds['photoUrl'],
                                                    peername: ds['sender_name'],
                                                  ))),
                                      child: Column(
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceBetween,
                                        children: <Widget>[
                                          Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.spaceBetween,
                                            children: <Widget>[
                                              Text(
                                                ds['sender_name'],
                                                style: TextStyle(
                                                    color: textColor,
                                                    fontWeight: FontWeight.bold,
                                                    fontSize: 20.0),
                                              ),
                                              Text(
                                                "${DateTime.now().hour}:${DateTime.now().minute}",
                                                style: TextStyle(
                                                    color: textColor,
                                                    fontSize: 15.0),
                                              )
                                            ],
                                          ),
                                          Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.spaceBetween,
                                            children: <Widget>[
                                              Flexible(
                                                child: Text(
                                                  "",
                                                  style:
                                                      TextStyle(fontSize: 15.0),
                                                  overflow:
                                                      TextOverflow.ellipsis,
                                                  maxLines: 2,
                                                ),
                                              )
                                            ],
                                          ),
                                        ],
                                      )),
                                )
                              ],
                            ),
                          );
                        }
                        //searching the friedns from the list
                        else if (ds['sender_name']
                            .toString()
                            .toLowerCase()
                            .contains(searchkey1)) {
                          return Container(
                            padding:
                                EdgeInsets.only(left: 10, right: 10, top: 10),
                            child: Row(
                              children: <Widget>[
                                Container(
                                    padding: EdgeInsets.only(right: 10),
                                    child: InkWell(
                                      // onTap: () => Navigator.push(
                                      //     context,
                                      //     MaterialPageRoute(
                                      //         builder: (context) =>
                                      //             FriendsProfile())),
                                      child: CircleAvatar(
                                        backgroundColor: Colors.transparent,
                                        backgroundImage:
                                            AssetImage('assets/img/man.png'),
                                        radius: 25.0,
                                      ),
                                    )),
                                Expanded(
                                  child: InkWell(
                                      onTap: () => Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                              builder: (BuildContext context) =>
                                                  Chat(
                                                    peerId: ds.documentID,
                                                    peerAvatar: ds['photoUrl'],
                                                    peername: ds['sender_name'],
                                                  ))),
                                      child: Column(
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceBetween,
                                        children: <Widget>[
                                          Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.spaceBetween,
                                            children: <Widget>[
                                              Text(
                                                ds['sender_name'],
                                                style: TextStyle(
                                                    color: Color(0xff55D1D5),
                                                    fontWeight: FontWeight.bold,
                                                    fontSize: 20.0),
                                              ),
                                              Text(
                                                '${DateTime.now()}',
                                                style: TextStyle(
                                                    color: Color(0xff55D1D5),
                                                    fontSize: 15.0),
                                              )
                                            ],
                                          ),
                                          Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.spaceBetween,
                                            children: <Widget>[
                                              Flexible(
                                                child: Text(
                                                  "",
                                                  style:
                                                      TextStyle(fontSize: 15.0),
                                                  overflow:
                                                      TextOverflow.ellipsis,
                                                  maxLines: 2,
                                                ),
                                              )
                                            ],
                                          ),
                                        ],
                                      )),
                                )
                              ],
                            ),
                          );
                        } else {
                          return Container();
                        }
                      });
                }
              }),
        ),
      ],
    ));
  }
}
