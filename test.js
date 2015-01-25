var express = require('express');
var session = require('express-session'); //如果要使用session，需要单独包含这个模块
var cookieParser = require('cookie-parser'); //如果要使用cookie，需要显式包含这个模块
var app = express();
 
// 设置 Cookie
app.use(cookieParser('xiaocc_'));
 
// 设置 Session
app.use(session({
  resave:false,
  saveUninitialized:false,
  secret: 'keyboard cat'
}))
 
app.get("/", function(req, res) {
  console.log(req.session);  //装了n多次，没有把调试工具下载弄好，实在悲哀，

//  var session = req.session;
  session.count = session.count || 0;
  var n = session.count++;
  res.send('hello, session id:' + session.id + ' count:' + n);
});
 
app.listen(2000);
 
console.log('Web server has started on http://127.0.0.1:2000/');