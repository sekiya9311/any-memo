import 'package:flutter/material.dart';
import './any_memo_page.dart';

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AnyMemo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: AnyMemoPage(title: 'AnyMemo'),
    );
  }
}
