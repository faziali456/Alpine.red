import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:flutterfirebase/model/user_data.dart';
import 'package:flutterfirebase/ui/notificationActivity.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../constant.dart';

class AddFriend extends StatefulWidget {
  final String currentUserId;
  AddFriend(this.currentUserId);

  @override
  State createState() => new ListHandlerState(currentUserId);
}

class ListHandlerState extends State<AddFriend> {
  final String currentUserId;
  ListHandlerState(
    this.currentUserId,
  );
  var searchkey1 = "";
//getting stream
  Stream getData() {
    Stream stream1 = Firestore.instance.collection('users').snapshots();
    return stream1;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: PreferredSize(
          preferredSize: Size.fromHeight(40.0),
          child: AppBar(
            backgroundColor: theme,
            leading: InkWell(
              onTap: () => Navigator.pop(context),
              child: Icon(
                FontAwesomeIcons.arrowLeft,
                color: Colors.white,
                size: 40,
              ),
            ),
            title: Text(
              'Add Friends',
              style: TextStyle(fontSize: 25),
            ),
            centerTitle: true,
            actions: <Widget>[
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
        body: SingleChildScrollView(
            child: Column(
          children: <Widget>[
            Column(
              children: <Widget>[
                Container(
                  height: 40,
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
//Searching users from the all user list
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
              ],
            ),
            SizedBox(
              height: 5,
            ),
            Container(
              height: MediaQuery.of(context).size.height / 1.4,
              child: StreamBuilder(
                  stream: getData(),
                  builder: (context, snapshot) {
                    if (!snapshot.hasData) {
                      print(snapshot);
                      return new Text("loading");
                    }
                    return new ListView.builder(
                        itemCount: snapshot.data.documents.length,
                        padding: const EdgeInsets.only(top: 2.0),
                        itemBuilder: (context, index) {
                          DocumentSnapshot ds = snapshot.data.documents[index];
                          String documnetid = ds.documentID.toString();

                          String friendId = '$currentUserId-$documnetid';
                          if (ds['id'] == currentUserId) {
                            return Container();
                          } else if (searchkey1.toString().isEmpty) {
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
                                        onTap: () {
                                          _showDialog(currentUserId, friendId,
                                              documnetid);
                                        },
                                        child: Column(
                                          mainAxisAlignment:
                                              MainAxisAlignment.spaceBetween,
                                          children: <Widget>[
                                            Row(
                                              mainAxisAlignment:
                                                  MainAxisAlignment
                                                      .spaceBetween,
                                              children: <Widget>[
                                                Text(
                                                  ds['nickname'],
                                                  style: TextStyle(
                                                      color: textColor,
                                                      fontWeight:
                                                          FontWeight.bold,
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
                                                  MainAxisAlignment
                                                      .spaceBetween,
                                              children: <Widget>[
                                                Flexible(
                                                  child: Text(
                                                    "",
                                                    style: TextStyle(
                                                        fontSize: 15.0),
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
                          } else if (ds['nickname']
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
                                        onTap: () {
                                          _showDialog(currentUserId, friendId,
                                              documnetid);
                                        },
                                        child: Column(
                                          mainAxisAlignment:
                                              MainAxisAlignment.spaceBetween,
                                          children: <Widget>[
                                            Row(
                                              mainAxisAlignment:
                                                  MainAxisAlignment
                                                      .spaceBetween,
                                              children: <Widget>[
                                                Text(
                                                  ds['nickname'],
                                                  style: TextStyle(
                                                      color: Color(0xff55D1D5),
                                                      fontWeight:
                                                          FontWeight.bold,
                                                      fontSize: 20.0),
                                                ),
                                                Text(
                                                  '${DateTime.now().hour}:${DateTime.now().minute}',
                                                  style: TextStyle(
                                                      color: Color(0xff55D1D5),
                                                      fontSize: 15.0),
                                                )
                                              ],
                                            ),
                                            Row(
                                              mainAxisAlignment:
                                                  MainAxisAlignment
                                                      .spaceBetween,
                                              children: <Widget>[
                                                Flexible(
                                                  child: Text(
                                                    "",
                                                    style: TextStyle(
                                                        fontSize: 15.0),
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
                  }),
            ),
          ],
        )));
  }

  void _showDialog(String currentUserID, String friendId, String documentId) {
    // flutter defined function
    showDialog(
      context: context,
      builder: (BuildContext context) {
        // return object of type Dialog
        return AlertDialog(
          title: new Text("Alert Dialog title"),
          content: new Text("Alert Dialog body"),
          actions: <Widget>[
            // usually buttons at the bottom of the dialog
            FlatButton(
              child: new Text("Send Request"),
              onPressed: () {
                Navigator.of(context).pop();
                _sendRequest(currentUserID, friendId, documentId);
              },
            ),
            FlatButton(
              child: new Text("Close"),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  void _sendRequest(String currentUserID, String friendId, String documentId) {
    var refrence = Firestore.instance
        .collection('notification')
        .document(documentId)
        .collection('notification')
        .document(User.userData.userId);

    Firestore.instance.runTransaction((transaction) async {
      await transaction.set(
        refrence,
        {
          'from': currentUserID,
          'type': "send_request",
          'sender_name': User.userData.userName,
        },
      );
    });
  }
}
