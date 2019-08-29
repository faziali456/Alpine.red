import '../helper/check_connectivity.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:rflutter_alert/rflutter_alert.dart';

class ForgotPasswordPage extends StatelessWidget {
  static final mformKey = new GlobalKey<FormState>();
  final GlobalKey<ScaffoldState> _scaffoldKey = new GlobalKey<ScaffoldState>();
  final TextEditingController _email = new TextEditingController();
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      key: _scaffoldKey,
      backgroundColor: Colors.grey,
      appBar: AppBar(
        title: Text('Forgot Password'),
        centerTitle: true,
      ),
      body: _buildSignIn(context),
    );
  }

  Widget _buildSignIn(BuildContext context) {
    return Container(
      alignment: Alignment.center,
      padding: EdgeInsets.only(top: 30.0),
      child: Column(
        children: <Widget>[
          Card(
            elevation: 2.0,
            color: Colors.white,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8.0),
            ),
            child: Container(
              width: 300.0,
              height: 270.0,
              child: Form(
                key: mformKey,
                child: Column(
                  children: <Widget>[
                    Padding(
                      padding: EdgeInsets.all(10.0),
                      child: Text(
                        'Please enter the email associated with your account. We\'ll send a link to reset your password.',
                        style: TextStyle(
                            fontFamily: "WorkSansSemiBold",
                            fontSize: 15.0,
                            color: Colors.black),
                        textAlign: TextAlign.center,
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.only(
                          top: 20.0, bottom: 20.0, left: 25.0, right: 25.0),
                      child: TextFormField(
                        controller: _email,
                        validator: (value) {
                          Pattern pattern =
                              r"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$";
                          RegExp regex = new RegExp(pattern);
                          if (!regex.hasMatch(value.trim()))
                            return 'Please enter a valid email';
                          else
                            return null;
                        },
                        onSaved: (val) => _email.text = val,
                        keyboardType: TextInputType.emailAddress,
                        style: TextStyle(
                            fontFamily: "WorkSansSemiBold",
                            fontSize: 16.0,
                            color: Colors.black),
                        decoration: InputDecoration(
                          border: InputBorder.none,
                          icon: Icon(
                            FontAwesomeIcons.envelope,
                            color: Colors.black,
                            size: 22.0,
                          ),
                          hintText: "Enter Email Address",
                          hintStyle: TextStyle(
                              fontFamily: "WorkSansSemiBold", fontSize: 17.0),
                        ),
                      ),
                    ),
                    Container(
                      padding: EdgeInsets.only(top: 20.0, bottom: 20.0),
                      child: MaterialButton(
                          color: Theme.of(context).buttonColor,
                          child: Padding(
                            padding: const EdgeInsets.symmetric(
                                vertical: 10.0, horizontal: 10.0),
                            child: Text(
                              "Send Email",
                              style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 16.0,
                                  fontFamily: "WorkSansBold"),
                            ),
                          ),
                          onPressed: () {
                           _sendEmail(context);
                          }),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _sendEmail(BuildContext ctx) async {
    final form = mformKey.currentState;
    if (form.validate()) {
      form.save();
      showInSnackBar("Sending you email...");
      Conn().connectivityResult().then((connected) {
        if (connected) {
          FirebaseAuth.instance
              .sendPasswordResetEmail(email: _email.text)
              .then((onValue) {
            Fluttertoast.showToast(
                msg: "Email Sent! Check inbox to verify.",
                toastLength: Toast.LENGTH_SHORT,
                gravity: ToastGravity.BOTTOM,
                timeInSecForIos: 1,
                backgroundColor: Colors.black,
                textColor: Colors.white);
            //Navigator.of(ctx).pop();
          }).catchError((onError) {
            print(onError);
            _showErrorDialogAccordingly(onError.toString(), ctx);
            //showInSnackBar("Something went wrong try again!");
          });
        } else {
          showInSnackBar("You are not connected to the internet.");
        }
      });
    }
  }

  void showInSnackBar(String value) {
    _scaffoldKey.currentState?.removeCurrentSnackBar();
    _scaffoldKey.currentState.showSnackBar(new SnackBar(
      content: new Text(
        value,
        textAlign: TextAlign.center,
        style: TextStyle(
            color: Colors.white,
            fontSize: 16.0,
            fontFamily: "WorkSansSemiBold"),
      ),
      backgroundColor: Colors.blue,
      duration: Duration(seconds: 3),
    ));
  }

  void _showErrorDialogAccordingly(String error, BuildContext ctx) {
    if (error.contains('There is no user record ')) {
      _showCustomAlertDialog(
          "Email not Found!",
          'There is no user found corresponding to this email. Check your email and try again.',
          ctx);
    } else if (error.contains('network error')) {
      _showCustomAlertDialog(
          "Request Failed!",
          'Network error has occured. The request timed out. Try again in a while',
          ctx);
    } else {
      _showCustomAlertDialog(
          "Error!", 'something went wrong please try again!', ctx);
    }
  }

  void _showCustomAlertDialog(String title, String message, BuildContext ctx) {
    Alert(
      context: ctx,
      type: AlertType.error,
      title: title,
      desc: message,
      buttons: [
        DialogButton(
          child: Text(
            "Okay",
            style: TextStyle(color: Colors.white, fontSize: 20),
          ),
          onPressed: () => Navigator.of(ctx, rootNavigator: true).pop(),
          width: 120,
        )
      ],
    ).show();
  }


}
