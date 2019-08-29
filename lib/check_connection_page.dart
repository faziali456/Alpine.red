import 'package:flutter/material.dart';
import 'auth.dart';
import 'package:connectivity/connectivity.dart';
import 'package:flutter/services.dart';
import 'dart:async';

class LoadingPage extends StatefulWidget {
  LoadingPage({Key key, this.title, this.auth, this.onSignIn})
      : super(key: key);

  final String title;
  final BaseAuth auth;
  final VoidCallback onSignIn;

  @override
  _LoadingPageState createState() => new _LoadingPageState();
}

class _LoadingPageState extends State<LoadingPage> {
  String _connectionStatus = 'Unknown';
  final Connectivity _connectivity = Connectivity();
  StreamSubscription<ConnectivityResult> _connectivitySubscription;

  @override
  void initState() {
    super.initState();
    initConnectivity();
    _connectivitySubscription =
        _connectivity.onConnectivityChanged.listen((ConnectivityResult result) {
      setState(() => _connectionStatus = result.toString());
    });
  }

  @override
  void dispose() {
    _connectivitySubscription.cancel();
    super.dispose();
  }
  

  // Platform messages are asynchronous, so we initialize in an async method.
  Future<Null> initConnectivity() async {
    String connectionStatus;
    // Platform messages may fail, so we use a try/catch PlatformException.
    try {
      connectionStatus = (await _connectivity.checkConnectivity()).toString();
      print(connectionStatus);
    } on PlatformException catch (e) {
      print(e.toString());
      connectionStatus = 'Failed to get connectivity.';
    }

    if (!mounted) {
      return;
    }
  }

  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text(widget.title),
      ),
      backgroundColor: Colors.grey[300],
      body: new Container(
        padding: const EdgeInsets.all(20.0),
        alignment: Alignment.center,
        child: Center(
          child: new Card(
            child: Center(
              child: _connectionStatus.contains('ConnectivityResult.none')  ? 
              Text('No Internet Connection',
                style: TextStyle(fontSize: 20.0, color: Colors.red),) : Text('Please Wait...',
                style: TextStyle(fontSize: 20.0, color: Colors.green),)  
            ),
          ),
        ),
      ),
    );
  }
}
