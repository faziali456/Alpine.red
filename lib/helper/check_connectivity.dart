import 'dart:async';
import 'package:connectivity/connectivity.dart';

abstract class InternetConnectivity {
  Future<bool> connectivityResult();
}

class Conn implements InternetConnectivity {
  Future<bool> connectivityResult() async {
    bool isConnected = false;
    var connectivityResult = await (new Connectivity().checkConnectivity());
    if (connectivityResult == ConnectivityResult.mobile||connectivityResult == ConnectivityResult.wifi) {
      isConnected = true;
    } 
    return isConnected;
  }
}
