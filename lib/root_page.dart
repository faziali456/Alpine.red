import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'auth.dart';
import 'check_connection_page.dart';
import './ui/login_page.dart';
import './ui/dashboard.dart';
import 'model/user_data.dart';

class RootPage extends StatefulWidget {
  RootPage({Key key, this.auth}) : super(key: key);
  final BaseAuth auth;
  @override
  State<StatefulWidget> createState() => _RootPageState();
}

enum AuthStatus {
  checking,
  notSignedIn,
  signedIn,
}

class _RootPageState extends State<RootPage> {
  var user;

  AuthStatus authStatus = AuthStatus.checking;
  @override
  void initState() {
    super.initState();
    _getuser();
    widget.auth.currentUser().then((userId) {
      setState(() {
        if (userId != null) {
          _updateAuthStatus(AuthStatus.signedIn);
        } else {
          _updateAuthStatus(AuthStatus.notSignedIn);
        }
      });
    });
  }

  void _updateAuthStatus(AuthStatus status) {
    setState(() {
      authStatus = status;
    });
  }

  void _getuser() async {
    SharedPreferences prefs =
        await SharedPreferences.getInstance().then((onVal) async {
      user = await onVal.get('id');
      User.userData.userId=user;
    });
  }

  @override
  Widget build(BuildContext context) {
    switch (authStatus) {
      case AuthStatus.checking:
        return LoadingPage(
          title: 'Firebase Auth',
          auth: widget.auth,
        );
      case AuthStatus.notSignedIn:
        return LoginPage(auth: Auth());
      case AuthStatus.signedIn:
        return FindChat(
          currentUserId: user,
        );
    }
  }
}
