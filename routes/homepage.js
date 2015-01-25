/*
 * 内置模块引用
 */
var db = require("./db");
/*
 * 模块导出
 */
module.exports = function(app){
	app.get('^[/]+$', function(req, res){
		var d = db.select({table:"artical",orderby: "desc"});
		var template_d = [];
		// console.log(  db.select({table:"artical",orderby: "desc"}) );
		for( var i=0; i<d.length; i++ ){
			//template_d[i] = d[i];

			//template_d[i].updatetime = new Date(parseInt(template_d[i].updatetime,10));
			//d[i].updatetime = new Date(parseInt(d[i].updatetime,10)).Format("yyyy-MM-dd");
		}
		res.render("index",{
			list: d
		});
	});
}