var db = require('./../config/db')
	, session = require('express-session')
	, crypto = require('crypto');


function user(app){
	app.use(session({
		resave:false,
		saveUninitialized:false,
		secret: 'keyboard cat'
	}));

	app.get('/login/', function(req, res){
		if( session.uid > 0 && session.ua === req.headers['user-agent'] ) {
			res.redirect('/');
			return;
		}
		var __method = req.query.__method || 'GET';
		if(__method === 'GET'){
			res.render('login', {
				"title": "testset",
				"user": {
					"name": "hahah"
				}
			});
		} else if(__method === 'POST'){
			if( req.query.username === db.user.username 
				&& crypto.createHash('sha1').update( req.query.password ).digest('base64') === db.user.password ){
				session.user = session.user || [];
				var user_type = crypto.createHash('sha1').update( req.headers['user-agent'] ).digest('base64');
				if( !session.user[ user_type ] ){
					session.user[ user_type ] = {};
					session.user[ user_type ].uid = session.uid;
					session.user[ user_type ].ua = req.headers['user-agent'];
					session.user[ user_type ].auth = crypto.createHash('sha512').update( req.query.username ).digest('base64');
				}
				res.send({code: 200, message: "登录成功！", uid: session.uid, auth: session.user[ user_type ].auth});
			} else {
				res.send({code: 201, message: "用户名或密码错误!"});
			}
		} else if(__method === 'PUT'){
			
		} else {
			res.send("Use __method=GET/PUT please.");
		}
	});

	app.get('/md5/', function(req, res){
		res.send( crypto.createHash('sha1').update( req.query.password ).digest('base64') );
	});

	app.get('/session/', function(req, res){
		res.send( "<script> console.log(" + session.user  + "); </script>");
	});

	app.get('/logout', function(req, res){

	});
}

function mobileDetect(req) {
    var u = req.headers['user-agent'];
    var ua= {         //移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    };
    if(ua.mobile===true){
        return 'isMobile';
    }
}
module.exports = user;