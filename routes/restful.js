// 内置模块引用
var fs = require('fs')
	markdown = require("markdown-js");
// 自定义模块
var db = require("./db")
	, nodejs_api_fs = require("./restful/nodejs/api/fs");

var root_views = __dirname + "/../views";
var jsonModel = "";
var template_artical = fs.readFileSync(root_views+"/blog_block/blog.ejs", 'utf-8');
module.exports = function(app){
	nodejs_api_fs(app);
	jsonModel = app.get("jsonModel");
	function r(curstatus, curdata){
		jsonModel.restful.status = curstatus;
		jsonModel.restful.data = curdata;
		return jsonModel.restful;
	}

	app.get('/restful/artical/content/', function(req, res){
		var __method = req.query.__method || "GET"
			, file_name = req.query.name
			, file_path = root_views+"/blog_md/"+file_name+".md"
			, exist = fs.existsSync( file_path )
			, data = "init";
		// 文件名不能为空
		if( file_name === undefined ){
			res.send(r(-1, "文件名不能为空"));
		}
		// Restful选择
		if( __method === "GET" ){
			if( exist ) data = fs.readFileSync( file_path, "utf-8" );
			else data = "not found file";
			res.send( r(0, data) );
		} else if( __method === "POST" ){
			fs.writeFile( file_path, req.query.data, "utf-8", function(err){
				if(err) throw err;
				fs.writeFile( root_views+"/blog/"+file_name+".ejs" , 
					template_artical.replace("<# main #>", markdown.makeHtml(req.query.data) ), "utf-8", function(err){
						if(err) throw err;
						updateArticalTime(file_name);
						res.send(r(0, "更新成功"));
				})
			});
		} else if( __method === "PUT" ){

		} else {

		}
	})

	app.get('/restful/artical/relate/', function(req, res){
		var __method = req.query.__method || "GET";
		if( __method === "GET" ){
			// GET 读取数据表artical
			res.send( db.select({
				table: "artical",
				orderby: "normal"
			}) );
		} else if( __method === "POST" ){
			// POST
			if( !req.query.data instanceof Array || req.query.data.length <=0 ){
				res.send( r(-1,"data参数必须是不为空数组") );
			}
			fs.writeFileSync(root_views+"/blog_md/"+req.query.data[0].name+".md","### 我是新增文件","utf-8");
			articalParse(req.query.data[0].name);
			res.send( r(0, db.add({
				table: "artical",
				data: new Array( req.query.data[0] )
			})) );
		} else if( __method === "PUT" ){
			// PUT
			if( !req.query.data instanceof Array || req.query.data.length <=0 ){
				res.send( r(-1,"data参数必须是不为空数组") );
			}
			var d = db.select("artical");
			var result = "";
			for( var i=0; i<req.query.data.length; i++ ){
				if( req.query.data[i].isupdatename && req.query.data[i].isupdatename == "yes" ){
					result = [];
					result[1] = db.delete({
						table: "artical",
						index: req.query.index
					});
					result[0] = db.add({
						table: "artical",
						data: new Array( req.query.data[i] )
					});
					
				} else {

					result = db.update({
						table: "artical",
						id: "name",
						data: new Array( req.query.data[i] )
					})
				}
			}
			// if( req.query.data[0].isupdatename && req.query.data[0].isupdatename == "yes" ){
			// 	result = [];
			// 	result[0] = db.add({
			// 		table: "artical",
			// 		data: new Array( req.query.data[0] )
			// 	});
			// 	result[1] = db.delete({
			// 		table: "artical",
			// 		index: req.query.index
			// 	});
			// } else {
			// 	result = db.update({
			// 		table: "artical",
			// 		id: "name",
			// 		data: req.query.data
			// 	})
			// }
			res.send( r(0, result) );
		} else if( __method === "DELETE" ) {
			// DELETE 删除记录
			if( req.query.index >= 0 ){
				var name = db.select("artical")[req.query.index].name;
				fs.existsSync(root_views+"/blog_md/"+name+".md") ? fs.unlinkSync(root_views+"/blog_md/"+name+".md") : "";
				fs.existsSync(root_views+"/blog/"+name+".ejs") ? fs.unlinkSync(root_views+"/blog/"+name+".ejs") : "";
				res.send( r(0, db.delete({
					table: "artical",
					index: req.query.index
				}) ) );
			} else res.send( r(-1, "不存在") );
		} else if( __method === "UPDATE" ){
			// UPDATE 从文章目录更新数据表artical
			console.log(__method);
			var artical = db.select("artical");
			fs.readdir(root_views+"/blog_md/", function(err, files){
				var d = []
					, i = 0;
				files.forEach(function(file){

					if( artical.length == 0 ){

						var temp = getEle("name title intro sort tag archive updatetime serical");
						file = file.replace(".md","");
						console.log(file);
						temp.name = temp.title = temp.intro = file;
						d.push( temp );
					} else {
						var index = getIndex(file, artical);
						if( index >= 0 ){
							d.push( artical[index] );
						} else {
							var temp = getEle("name title intro sort tag archive updatetime serical");
							file.replace(".md","");
							temp.name = temp.title = temp.intro = file;
							d.push( temp );
						}
					}
				})
				db.cover({"table": "artical", "data": d});
				res.send("ok");
				
				// if( artical.length == 0 ){
				// 	var i = 0;
				// 	var d = [];
				// 	files.forEach(function(file){
				// 		d[i] = getEle("name title intro sort tag archive updatetime serical");
				// 		d[i].name = d[i].title = d[i].intro =file;
				// 		i++;
				// 	})
				// 	db.cover({"table": "artical", "data": d});
				// 	res.send("ok");
				// } else {
				// 	var d = [];
				// 	files.forEach(function(file){
				// 		var index = getIndex(file, artical);
				// 		console.log( index );
				// 		if( index >= 0 ){
				// 			d.push( artical[index] );
				// 		} else {
				// 			var temp = getEle("name title intro sort tag archive updatetime serical");
				// 			temp.name = temp.title = temp.intro =file;
				// 			d.push( temp );
				// 		}
				// 	})
				// 	db.cover({"table": "artical", "data": d});
				// 	res.send("ok2");
				// }
			});
		}
	})

	app.get("/restful/artical/field", function(req, res){
		var __method = req.query.__method || "GET";
		if( __method === "GET" ){
			res.send(db.select("artical"));
		} else if( __method === "POST" ){
			var d = db.select("artical");
			var result = '';
			if( req.query.field && /^[a-zA-Z]*$/.test(req.query.field) && !d[0][req.query.field] ){
				for( var i=0; i<d.length; i++ ){
					d[i] = d[i] || {};
					d[i][req.query.field] = d[i][req.query.field] || '';
				}
				res.send( r(0,db.cover({table: "artical", data: d})) );
			} else {
				res.send( r(0,"新增字段名字不规范或者已存在！") );
			}
		} else if( __method === "PUT" ){

		} else if( __method === "DELETE" ){

		}
	});

	app.get("/admin/homepage/", function(req, res){
		db.test();
		res.send("ok");
	});

	app.get('/admin/artical/list/', function(req, res){
		res.send( app.get("art_list") );
	})

	app.get('/admin/test/', function(req, res){
		console.log( Date.now() );
		res.send( JSON.parse( fs.readFileSync(root_views+"/admin/test","utf-8") ) );
	})
	function updateArticalTime(field){
		var d = db.select("artical");
		var ind = getIndex( field, d );
		d[ind].updatetime = Date.now();
		return db.cover({table:"artical", data: d});
	}
	function articalParse(file){
		var template_artical = fs.readFileSync(root_views+"/blog_block/blog.ejs", 'utf-8');
		var dd = template_artical.replace( "<# main #>", markdown.makeHtml( fs.readFileSync( root_views + "/blog_md/"+file+".md", { encoding: "utf-8" } ) ) );
		fs.writeFileSync( root_views+"/blog/"+file.replace(".md","")+".ejs", dd);
	}

	function getIndex(field, data){
		for( var i=0; i<data.length; i++ ){
			if( data[i].name.replace(".md","") == field.replace(".md","") ){
				return i;
			}
		}
		return -1;
	}
	function getEle(fields){
		fields = fields || "";
		fields = fields.split(" ");
		var ele = {};
		fields.forEach(function(field){
			ele[field] = "";
		});
		return ele;
	}

}


// if( artical == "" ){
// 					var arr = [];
// 					arr[i] = {};
// 					arr[i].name = 
// 				}
// 				var i = 0;
// 				var index = -1;
// 				files.forEach(function(file){
// 					index = getIndex(file, artical);
// 					if( index >= 0 ){
// 						db.update({
// 							table: "artical",
// 							id: "name",
// 							data: artical[i]
// 						});
// 					} else {
// 						db.update({
// 							table: "artical",
// 							id: "name",
// 							data: {
// 								name: file,
// 								title: file
// 							}
// 						});
// 					}
// 				});