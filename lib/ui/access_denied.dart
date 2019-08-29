import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class AccessDeniedPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: new AppBar(
        title: new Text('Access Denied'),
      ),
      body: new Container(
        padding: const EdgeInsets.all(20.0),
        alignment: Alignment.center,
        child: Center(
          child: new Card(
            child: Column(
              children: <Widget>[
                Container(
                  padding: const EdgeInsets.all(20.0),
                  child: Text(
                      "This application is designed and intended for the use of Employees you can download and sign in to Attendance Manager (For Management)."),
                ),
                RaisedButton(
                  color: Theme.of(context).accentColor,
                  textColor: Colors.white,
                  child: Text('Log Out'),
                  onPressed: () async {
                    await FirebaseAuth.instance.signOut().then((action) {
                      Navigator.of(context).pushReplacementNamed('/');
                    }).catchError((e) {
                      print(e);
                    });
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
