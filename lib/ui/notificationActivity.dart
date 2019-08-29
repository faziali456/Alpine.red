import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:flutterfirebase/model/user_data.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../constant.dart';

class Notificatios extends StatefulWidget {
  @override
  _NotificatiosState createState() => _NotificatiosState();
}

class _NotificatiosState extends State<Notificatios> {


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
          ),
        ),
        body: Container(child: _buildSuggestions()));
  }
//building notifications card
  Widget _buildSuggestions() {
    return StreamBuilder(
        stream: getData(),
        builder: (BuildContext context, snapshot) {
          if (snapshot.hasData) {
            if (snapshot.data.documents.length < 1) {
              return Center(child: Text('No Notifications'));
            } else {
              return ListView.builder(
                itemCount: snapshot.data.documents.length,
                itemBuilder: (context, index) {
                  DocumentSnapshot ds = snapshot.data.documents[index];
                  String documnetid = ds.documentID.toString();
                  String friendId = '${User.userData.userId}-$documnetid';
                  return Card(
                    margin: EdgeInsets.all(10),
                    elevation: 10,
                    child: Container(
                      padding: EdgeInsets.all(15),
                      width: 300,
                      child: Column(
                        children: <Widget>[
                          Text(
                            '${ds['sender_name']} send you a request ',
                            style: TextStyle(
                              color: textColor,
                              fontWeight: FontWeight.bold,
                              fontSize: 20,
                            ),
                          ),
                          SizedBox(
                            height: 10,
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: <Widget>[
                              Container(
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(10),
                                  color: textColor,
                                ),
                                height: 30,
                                child: FlatButton(
                                    child: Text(
                                      "Accept Request",
                                      style: TextStyle(
                                        color: Colors.white,
                                        fontSize: 15,
                                      ),
                                    ),
                                    onPressed: () {
                                      _sendRequest(
                                          ds['from'], ds['sender_name']);
                                      ds.reference.delete();
                                    }),
                              ),
                              Container(
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(10),
                                  color: textColor,
                                ),
                                height: 30,
                                child: FlatButton(
                                  child: Text(
                                    "Decline Request",
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 15,
                                    ),
                                  ),
                                  onPressed: () {
                                    ds.reference.delete();
                                  },
                                ),
                              ),
                            ],
                          )
                        ],
                      ),
                    ),
                  );
                },
              );
            }
          } else {
            return Center(child: CircularProgressIndicator());
          }
        });
  }

// becoming freinds after accepting the request of particular user

  void _sendRequest(String documentId, String name) {
    var refrence = Firestore.instance
        .collection('friends')
        .document(User.userData.userId)
        .collection('friend')
        .document(documentId);

    Firestore.instance.runTransaction((transaction) async {
      await transaction.set(
        refrence,
        {
          'friends_with': documentId,
          'sender_name': name,
        },
      );
    });
    var refrence2 = Firestore.instance
        .collection('friends')
        .document(documentId)
        .collection('friend')
        .document(User.userData.userId);

    Firestore.instance.runTransaction((transaction) async {
      await transaction.set(
        refrence2,
        {
          'friends_with': User.userData.userId,
          'sender_name': User.userData.userName,
        },
      );
    });
  }
//getting data from the stream
  Stream getData() {
    Stream stream1 = Firestore.instance
        .collection("notification")
        .document(User.userData.userId)
        .collection('notification')
        .snapshots();
    return stream1;
  }
}
