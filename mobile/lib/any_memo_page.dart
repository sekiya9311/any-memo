import 'dart:async';

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
  Firestore _firestore;

  void _addMemo() {
    // TODO: implememts
  }

  Future<void> _deleteMemo(dynamic delMemo) {
    return _firestore.collection('users').document(_user.uid).updateData({
      'memos': FieldValue.arrayRemove([delMemo])
    });
  }

  @override
  void initState() {
    super.initState();
    setState(() {
      _firestore = Firestore.instance;
    });
  }

  @override
  Widget build(BuildContext context) {
    Widget body;
    FloatingActionButton incBtn;
    if (_user != null) {
      body = _buildAppBody();
      incBtn = FloatingActionButton(
        onPressed: _addMemo,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      );
    } else {
      body = _buildGoogleSignIn();
    }
    return Scaffold(
        appBar: AppBar(
          title: Text(widget.title),
        ),
        body: body,
        floatingActionButton: incBtn);
  }

  Widget _buildGoogleSignIn() {
    return Center(
      child: RaisedButton(
        child: Text('AUTH GOOGLE'),
        onPressed: () {
          _doGoogleSignIn().then((user) {
            setState(() {
              _user = user;
            });
          }).catchError((err) {
            print(err);
          });
        },
      ),
    );
  }

  Widget _buildAppBody() {
    return StreamBuilder<DocumentSnapshot>(
      stream: _firestore.collection('users').document(_user.uid).snapshots(),
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return Text('Error: ${snapshot.error}');
        }
        switch (snapshot.connectionState) {
          case ConnectionState.waiting:
            {
              // TODO: use component of like loaging
              return Text('Waiting...');
            }
          default:
            {
              final memos = snapshot.data.data['memos'] as List;
              return ListView(
                children: memos.map((memo) => _makeMemoTile(memo)).toList(),
              );
            }
        }
      },
    );
  }

  ListTile _makeMemoTile(dynamic memo) {
    return ListTile(
        title: Text(memo['context']),
        subtitle: Text(memo['created_time'].toString()),
        trailing: Icon(Icons.remove),
        onTap: () {
          _deleteMemo(memo);
        });
  }

  Future<FirebaseUser> _doGoogleSignIn() async {
    final googleSignIn = GoogleSignIn();
    final firebaseAuth = FirebaseAuth.instance;

    final googleUser = await googleSignIn.signIn();
    final googleAuth = await googleUser.authentication;

    final currentUser = await firebaseAuth.signInWithGoogle(
        accessToken: googleAuth.accessToken, idToken: googleAuth.idToken);

    return currentUser;
  }
}
