/*
 * 内置模块引用
 */
var url = require('url')
	, fs = require('fs')
	, db = require('./db');
/*
 * 配置
 */
var root_views = __dirname + "/../views";
/*
 * 模块内变量
 */
module.exports = function(app){
	app.get('/blog/*/', function(req, res){
		var pathname = url.parse(req.url).pathname;
		if( fs.existsSync(root_views+"/"+pathname.match(/[^/].*[^/]/)[0]+".ejs") ){
			res.render(pathname.match(/[^/].*[^/]/)[0], {
				title: getArticalName( pathname, db.select("artical") )
			});
		} else {
			res.render('404', {
		        title: 'No Found'
		    })
		}
		
	})

	function getArticalName(path, arr){
		
		path = path.match(/[^/].*[^/]/)[0].split("/") || [];
		path = path[ path.length-1 ];
		var reg = new RegExp(path);
		for( var i=0; i<arr.length; i++ ){
			if( reg.test(arr[i].name) ) return arr[i].title
		}
		return "not found title"
	}
}
