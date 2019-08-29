// import 'package:flutter/material.dart';
// import 'package:flutterfirebase/constant.dart';
// import 'package:font_awesome_flutter/font_awesome_flutter.dart';

// class FriendsProfile extends StatefulWidget {
//   @override
//   _FriendsProfileState createState() => _FriendsProfileState();
// }

// class _FriendsProfileState extends State<FriendsProfile> {
//   @override
//   Widget build(BuildContext context) {
//     return Container(
//       color: Colors.white,
//       padding: EdgeInsets.all(7),
//       child: Column(
//         children: <Widget>[
//           Container(
//               height: 250,
//               child: Stack(
//                 alignment: Alignment(0, 0),
//                 children: <Widget>[
//                   Stack(
//                     alignment: Alignment(0, 0),
//                     children: <Widget>[
//                       Image(
//                         image: AssetImage('assets/img/cover.jpg'),
//                         fit: BoxFit.cover,
//                         height: 180,
//                         width: MediaQuery.of(context).size.width,
//                       ),
//                       Positioned(
//                           right: 5,
//                           bottom: 5,
//                           child: Container(
//                             height: 30,
//                             width: 40,
//                             child: Card(
//                               child: Icon(
//                                 FontAwesomeIcons.camera,
//                                 size: 20,
//                                 color: Colors.blueAccent,
//                               ),
//                             ),
//                           ))
//                     ],
//                   ),
//                   Positioned(
//                     bottom: 1,
//                     child: Stack(
//                       alignment: Alignment(0, 0),
//                       children: <Widget>[
//                         CircleAvatar(
//                           backgroundColor: Colors.white,
//                           radius: 50,
//                           child: CircleAvatar(
//                             backgroundColor: Colors.white,
//                             radius: 45.0,
//                             backgroundImage: AssetImage('assets/img/man.png'),
//                           ),
//                         ),
//                         Positioned(
//                           right: 2,
//                           bottom: 5,
//                           child: CircleAvatar(
//                             backgroundColor: Colors.white,
//                             radius: 12,
//                             child: Icon(
//                               FontAwesomeIcons.camera,
//                               size: 15,
//                               color: Colors.blueAccent,
//                             ),
//                           ),
//                         )
//                       ],
//                     ),
//                   ),
//                 ],
//               )),
//           Row(
//             mainAxisAlignment: MainAxisAlignment.end,
//             children: <Widget>[
//               Text(
//                 'Williams',
//                 style: TextStyle(
//                   color: textColor,
//                   fontSize: 18,
//                 ),
//               ),
//               SizedBox(
//                 width: 30,
//               ),
//               Icon(
//                 FontAwesomeIcons.edit,
//                 color: textColor,
//                 size: 15,
//               ),
//               Text(
//                 'Edit Profile',
//                 style: TextStyle(
//                   color: textColor,
//                   fontSize: 15,
//                 ),
//               )
//             ],
//           ),
//           SizedBox(
//             height: 5,
//           ),
//           Container(
//             margin: EdgeInsets.only(left: 30, right: 30),
//             height: 2,
//             color: Color(0xff16ABE4),
//           ),
//           SizedBox(
//             height: 10,
//           ),
//           Row(
//             children: <Widget>[
//               Icon(
//                 FontAwesomeIcons.graduationCap,
//                 color: Colors.blueAccent,
//                 size: 20,
//               ),
//               SizedBox(
//                 width: 10,
//               ),
//               Text(
//                 'Studied at ',
//                 style: TextStyle(
//                   color: Colors.grey,
//                   fontSize: 15,
//                 ),
//               ),
//               Text(
//                 "Universit of Boston",
//                 style: TextStyle(
//                   color: textColor,
//                   fontSize: 15,
//                 ),
//               )
//             ],
//           ),
//           SizedBox(
//             height: 10,
//           ),
//           Row(
//             children: <Widget>[
//               Icon(
//                 FontAwesomeIcons.home,
//                 color: Colors.blueAccent,
//                 size: 20,
//               ),
//               SizedBox(
//                 width: 10,
//               ),
//               Text(
//                 'Lives in ',
//                 style: TextStyle(
//                   color: Colors.grey,
//                   fontSize: 15,
//                 ),
//               ),
//               Text(
//                 "Boston",
//                 style: TextStyle(
//                   color: textColor,
//                   fontSize: 15,
//                 ),
//               )
//             ],
//           ),
//           SizedBox(
//             height: 10,
//           ),
//           Row(
//             children: <Widget>[
//               Icon(
//                 FontAwesomeIcons.mapMarkerAlt,
//                 color: Colors.blueAccent,
//                 size: 20,
//               ),
//               SizedBox(
//                 width: 10,
//               ),
//               Text(
//                 'From',
//                 style: TextStyle(
//                   color: Colors.grey,
//                   fontSize: 15,
//                 ),
//               ),
//               Text(
//                 "Austrailia",
//                 style: TextStyle(
//                   color: textColor,
//                   fontSize: 15,
//                 ),
//               )
//             ],
//           ),
//           SizedBox(
//             height: 10,
//           ),
//           Row(
//             children: <Widget>[
//               Container(
//                 child: Row(
//                   mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                   children: <Widget>[
//                     Icon(
//                       FontAwesomeIcons.userFriends,
//                       color: Colors.blueAccent,
//                       size: 20,
//                     ),
//                     Column(
//                       children: <Widget>[
//                         Text(
//                           'Friends',
//                           style: TextStyle(
//                             fontSize: 10,
//                             color: Colors.grey,
//                           ),
//                         ),
//                         Text(
//                           '25',
//                           style: TextStyle(
//                             fontSize: 10,
//                             color: textColor,
//                           ),
//                         )
//                       ],
//                     )
//                   ],
//                 ),
//               ),
//                Container(
//                 child: Row(
//                   mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                   children: <Widget>[
//                     Icon(
//                       FontAwesomeIcons.users,
//                       color: Colors.blueAccent,
//                       size: 20,
//                     ),
//                     Column(
//                       children: <Widget>[
//                         Text(
//                           'Followers',
//                           style: TextStyle(
//                             fontSize: 10,
//                             color: Colors.grey,
//                           ),
//                         ),
//                         Text(
//                           '25',
//                           style: TextStyle(
//                             fontSize: 10,
//                             color: textColor,
//                           ),
//                         )
//                       ],
//                     )
//                   ],
//                 ),
//               ),
//                Container(
//                 child: Row(
//                   mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                   children: <Widget>[
//                     Icon(
//                       FontAwesomeIcons.users,
//                       color: Colors.blueAccent,
//                       size: 20,
//                     ),
//                     Column(
//                       children: <Widget>[
//                         Text(
//                           'FOllowing',
//                           style: TextStyle(
//                             fontSize: 10,
//                             color: Colors.grey,
//                           ),
//                         ),
//                         Text(
//                           '25',
//                           style: TextStyle(
//                             fontSize: 10,
//                             color: textColor,
//                           ),
//                         )
//                       ],
//                     )
//                   ],
//                 ),
//               ),
//             ],
//           )
//         ],
//       ),
//     );
//   }
// }
