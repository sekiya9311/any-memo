import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class AnyMemoPage extends StatefulWidget {
  AnyMemoPage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<AnyMemoPage> {
  FirebaseUser _user;

  void _addMemo() {
    // TODO: implememts
  }

  void _deleteMemo() {
    // TODO: implememts
  }

  @override
  Widget build(BuildContext context) {
    Widget body;
    FloatingActionButton incBtn;
    if (_user != null) {
      body = buildAppBody();
      incBtn = FloatingActionButton(
        onPressed: _addMemo,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      );
    } else {
      body = buildGoogleSignIn();
    }
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: body,
      floatingActionButton: incBtn
    );
  }

  Widget buildGoogleSignIn() {
    // TODO: implememts
  }
  Widget buildAppBody() {
    return Center();
  }
}