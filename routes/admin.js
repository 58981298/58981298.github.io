/*
 * 内置模块引用
 */
var fs = require('fs');
/*
 * 配置
 */
var root_view = __dirname + "/../views";
/*
 * 模块导出
 */
module.exports = function(app){
	app.get('/admin/artical/content/', function(req, res){
		res.render("admin/artical/content", {
			title: "文章内容编辑器"
		});
	})

	app.get('/admin/artical/relate/', function(req, res){
		res.render("admin/artical/relate", {
			title: "文章相关信息编辑器"
		});
	})

	app.get('/restful/template/', function(req, res){
		var __method = req.query.__method || "GET";
		if( __method === "GET" ){

		} else if( __method === "POST" ){

		} else if( __method === "PUT" ){
			
		} else {

		}
	})
}