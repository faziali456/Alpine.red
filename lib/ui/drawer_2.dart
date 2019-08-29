import 'package:flutter/material.dart';

class DrawerPage extends PreferredSize {
  DrawerPage(BuildContext context)
      : super(
            preferredSize: Size.fromHeight(70),
            child: ClipPath(
                clipper: TriangleClipper(),
                child: Container(
                    width: MediaQuery.of(context).size.width / 1.3,
                    height: double.infinity,
                    decoration: BoxDecoration(
                      color: Colors.white,
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        SizedBox(
                          height: 30,
                        ),
                        InkWell(
                          onTap: () {
                            Navigator.pop(context);
                          },
                          child: Icon(
                            Icons.arrow_back,
                            color: Color.fromARGB(255, 81, 195, 199),
                          ),
                        ),
                        SizedBox(
                          height: 25,
                        ),
                        InkWell(
                          onTap: () => _asyncFAQDiaogue(context),
                          child: Container(
                            margin: EdgeInsets.only(left: 10, right: 80),
                            decoration: BoxDecoration(
                                border: Border(
                                    bottom: BorderSide(
                              width: 1.0,
                              color: Color.fromARGB(255, 81, 195, 199),
                            ))),
                            child: Row(
                              children: <Widget>[
                                Icon(
                                  Icons.home,
                                  color: Color.fromARGB(255, 81, 195, 199),
                                  size: 30,
                                ),
                                Padding(
                                    padding: EdgeInsets.only(left: 10),
                                    child: Text(
                                      "FAQ",
                                      style: TextStyle(
                                          fontSize: 22,
                                          color: Color.fromARGB(
                                              255, 81, 195, 199)),
                                    ))
                              ],
                            ),
                          ),
                        ),
                        SizedBox(
                          height: 25,
                        ),
                        InkWell(
                            onTap: () {},
                            child: Container(
                                margin: EdgeInsets.only(left: 10, right: 80),
                                decoration: BoxDecoration(
                                    border: Border(
                                        bottom: BorderSide(
                                  width: 1.0,
                                  color: Color.fromARGB(255, 81, 195, 199),
                                ))),
                                child: Row(children: <Widget>[
                                  Icon(
                                    Icons.person,
                                    color: Color.fromARGB(255, 81, 195, 199),
                                    size: 30,
                                  ),
                                  Padding(
                                    padding: EdgeInsets.only(left: 10),
                                    child: Text("How Alpine Works",
                                        style: TextStyle(
                                            fontSize: 20,
                                            color: Color.fromARGB(
                                                255, 81, 195, 199))),
                                  ),
                                ]))),
                        SizedBox(
                          height: 25,
                        ),
                        InkWell(
                          onTap: () {},
                          child: Container(
                            margin: EdgeInsets.only(left: 10, right: 80),
                            decoration: BoxDecoration(
                                border: Border(
                                    bottom: BorderSide(
                              width: 1.0,
                              color: Color.fromARGB(255, 81, 195, 199),
                            ))),
                            child: Row(
                              children: <Widget>[
                                Icon(
                                  Icons.mail,
                                  color: Color.fromARGB(255, 81, 195, 199),
                                  size: 30,
                                ),
                                Padding(
                                  padding: EdgeInsets.only(left: 10),
                                  child: Text("Login",
                                      style: TextStyle(
                                          fontSize: 22,
                                          color: Color.fromARGB(
                                              255, 81, 195, 199))),
                                )
                              ],
                            ),
                          ),
                        ),
                        SizedBox(
                          height: 30,
                        ),
                        InkWell(
                          onTap: (){},
                          child: Container(
                            margin: EdgeInsets.only(left: 10, right: 80),
                            decoration: BoxDecoration(
                                color: Color.fromARGB(255, 81, 195, 199),
                                border: Border(
                                    bottom: BorderSide(
                                  width: 1.0,
                                  color: Color.fromARGB(255, 81, 195, 199),
                                ))),
                            child: Row(
                              children: <Widget>[
                                Icon(
                                  Icons.message,
                                  color: Color.fromARGB(255, 81, 195, 199),
                                  size: 30,
                                ),
                                Padding(
                                  padding: EdgeInsets.only(left: 10),
                                  child: Text("Register",
                                      style: TextStyle(
                                          fontSize: 22, color: Colors.white)),
                                )
                              ],
                            ),
                          ),
                        )
                      ],
                    ))));
}

class TriangleClipper extends CustomClipper<Path> {
  Path getClip(Size size) {
    final path = Path();
    path.lineTo(size.width - 70, 0);
    var firstControlPoint = Offset(size.width, size.height / 2);
    var firstEndPoint = Offset(size.width - 70, size.height);
    path.quadraticBezierTo(firstControlPoint.dx, firstControlPoint.dy,
        firstEndPoint.dx, firstEndPoint.dy);
    path.quadraticBezierTo(size.width, size.height, size.width, size.height);
    path.lineTo(0, size.height);
    path.close();
    return path;
  }

  bool shouldReclip(TriangleClipper oldClipper) => false;
}

Future<String> _asyncFAQDiaogue(
  BuildContext context,
) async {
  TextEditingController emailController = new TextEditingController();
  return showDialog<String>(
    context: context,
    barrierDismissible: true,
    builder: (BuildContext context) {
      return AlertDialog(
          shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.all(Radius.circular(32.0))),
          contentPadding: EdgeInsets.only(top: 10.0),
          content: Container(
              height: MediaQuery.of(context).size.height / 1.2,
              width: MediaQuery.of(context).size.width,
              padding: EdgeInsets.only(left: 10, right: 10, top: 20),
              decoration: new BoxDecoration(
                shape: BoxShape.rectangle,
                color: const Color(0xFFFFFF),
                borderRadius: new BorderRadius.all(new Radius.circular(32.0)),
              ),
              child: Column(
                children: <Widget>[
                  SizedBox(
                    height: 10,
                  ),
                  Text(
                    "FAQ - Frequently Asked Questions",
                    style: TextStyle(fontSize: 20),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  Container(
                    color: Colors.black54,
                    height: 1,
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  Card(
                    elevation: 2,
                    child: Padding(
                      padding: EdgeInsets.only(left: 5, top: 5, bottom: 5),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                          Text("What is tr"),
                          Icon(
                            Icons.arrow_left,
                            size: 30,
                          )
                        ],
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  Card(
                    elevation: 2,
                    child: Padding(
                      padding: EdgeInsets.only(left: 5, top: 5, bottom: 5),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                          Text("Do i have to pay anything for joining?"),
                          Icon(
                            Icons.arrow_left,
                            size: 30,
                          )
                        ],
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  Card(
                    elevation: 2,
                    child: Padding(
                      padding: EdgeInsets.only(left: 5, top: 5, bottom: 5),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                          Text("How do i use Alpine?"),
                          Icon(
                            Icons.arrow_left,
                            size: 30,
                          )
                        ],
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  Card(
                    elevation: 2,
                    child: Padding(
                      padding: EdgeInsets.only(left: 5, top: 5, bottom: 5),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                          Text("How to add a position to an invitation?"),
                          Icon(
                            Icons.arrow_left,
                            size: 30,
                          )
                        ],
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  Card(
                    elevation: 2,
                    child: Padding(
                      padding: EdgeInsets.only(left: 5, top: 5, bottom: 5),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                          Text("Can I delete an active invitation of mine?"),
                          Icon(
                            Icons.arrow_left,
                            size: 30,
                          )
                        ],
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  Card(
                    elevation: 2,
                    child: Padding(
                      padding: EdgeInsets.only(left: 5, top: 5, bottom: 5),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                          Text("is there any rating system?"),
                          Icon(
                            Icons.arrow_left,
                            size: 30,
                          )
                        ],
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  Card(
                    elevation: 2,
                    child: Padding(
                      padding: EdgeInsets.only(left: 5, top: 5, bottom: 5),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                          Text("What about Alpine app?"),
                          Icon(
                            Icons.arrow_left,
                            size: 30,
                          )
                        ],
                      ),
                    ),
                  ),
                ],
              )));
    },
  );
}
