/*
 * 内置模块引用
 */
var url = require('url');
/*
 * 模块内变量
 */
module.exports = function(app){
	app.get('/about/', function(req, res){
		res.render('about', {
			title: "test"
		});
	})

	app.get('/nav/', function(req, res){
		res.render('nav', {
			title: "clary_nav"
		});
	})

	app.get('/demo/', function(req, res){
		res.render('demo', {
			title: "clary_demo"
		});
	})

	app.get('/test/', function(req, res){
		res.send("ok"+ new Date(1420070400000).Format("yyyy-MM-dd") );
	})

	app.get('/restful/template/', function(req, res){
		var __method = req.query.__method || "GET";
		if( __method === "GET" ){

		} else if( __method === "POST" ){

		} else if( __method === "PUT" ){
			
		} else if( __method === "DELETE" ){
			
		} else {

		}
	})
}
