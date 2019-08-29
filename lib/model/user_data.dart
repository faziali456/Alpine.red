class User {
  // singleton
  static final User _singleton = User._internal();
  factory User() => _singleton;
  User._internal();
  static User get userData => _singleton;
  String userName;
  String userId;
  String userImg;
  String userPushToken;
  String userCreatedAt;
}
