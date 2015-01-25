/*
 * 内置模块引用
 */
var render = require('./render')
	, url = require('url')
	, fs = require('fs')
	, db = require('./db');
db.dataFormat();
/*
 * 配置
 */
var filePath = __dirname+"/../config/artical";
/*
 * 路由集合
 */
var route_homepage = require('./homepage')
	, route_blog = require('./blog')
	, route_base = require('./base')
	, route_restful = require('./restful')
	, route_admin = require('./admin')
	, route_error = require('./error');
var filePath = __dirname+"/../config/artical";
/*
 * 模块内变量
 */
var art_list = {};



function jsonModel(app){
	app.set("jsonModel", {
		restful: {
			status: -1,
			data: {}
		},
		beg: {
			status: -1,
			message: ""
		}
	});
}

function readArticalFile(){
	art_list = fs.existsSync(filePath) ? fs.readFileSync(filePath,"utf-8") : "";
	art_list = art_list != "" ? JSON.parse(art_list) : {};
}
readArticalFile();

function route(app){
	jsonModel(app);
	app.set("art_list", art_list);
	// 首页
	route_homepage(app);
	route_base(app);
	// 文章页
	route_blog(app);
	route_restful(app);
	route_admin(app);

	app.get('/manage.html', function(req, res){
		res.send(fs.readFileSync(__dirname+"/../views/manage.html","utf-8"));
	})

	app.get('/manage/', function(req, res){
		
		var __method = req.query.__method || 'GET';

		var data = fs.readFileSync(filePath,"utf-8");
			data = data != "" ? JSON.parse(data) : {};
			data.artical = data.artical || [];
			data.sql = [];
		if(__method === 'GET'){
			
			fs.readdir(__dirname+"/../views/blog_md/", function(err, files){
				var i = 0;
				var f = '';
				data.artical.forEach(function(item){
					data.sql[item.filename] = item;
				});
				data.artical = [];
				files.forEach(function(file){
					data.artical[i] = {};
					if( data.sql[file] ){
						console.log(data.sql[file]);
						data.artical[i].filename = data.sql[file].filename || file;
						data.artical[i].articalname = data.sql[file].articalname && data.sql[file].articalname != "" ? data.sql[file].articalname : data.sql[file].filename || file ;
						data.artical[i].sort = data.sql[file].sort || "";
						data.artical[i].content = data.sql[file].content || "";
						data.artical[i].tag = data.sql[file].tag || "";
						data.artical[i].archive = data.sql[file].archive || "";
					} else {
						data.artical[i].filename = file;
						data.artical[i].articalname = file;
						data.artical[i].sort = "";
						data.artical[i].content = "";
						data.artical[i].tag = "";
						data.artical[i].archive = "";
					}
					i++;
				});
				//console.log( data );
				app.set("art_list", data);
				res.send(data);
			});
		} else if(__method === 'POST'){
			var data = req.query.data;
			var data_bak = fs.existsSync(filePath+"_bak") ? fs.readFileSync(filePath+"_bak","utf-8") : "";
			data_bak = data_bak != "" ? JSON.parse(data_bak) : {};
			data_bak.backup = data_bak.backup || [];
			// 备份文件为空或不存在时直接写入
			if( data_bak.backup.length == 0 ){
				data_bak.backup.push( JSON.parse(data).artical );
				fs.writeFileSync(filePath+"_bak", JSON.stringify(data_bak));
			}
			// 备份文件不为空时，判断是否有修改过，有修改就备份，没有修改不做备份
			if( data_bak.backup.length > 0 && JSON.stringify(data_bak.backup[data_bak.backup.length-1]) != JSON.stringify(JSON.parse(data).artical) ){
				data_bak.backup.push( JSON.parse(data).artical );
				fs.writeFileSync(filePath+"_bak", JSON.stringify(data_bak));
				
			}
			// 同时更新当前配置文件
			// data = JSON.parse(req.query.data);
			// data.sql = {};
			// data.artical.forEach(function(item){
			// 	data.sql[item.filename] = item;
			// });
			fs.writeFile(filePath, data, function(err,data){
				art_list = JSON.parse(req.query.data);
				app.set("art_list", art_list);
				res.send("ok");
			});
		} else if(__method === 'PUT'){

			fs.readdir(__dirname+"/../views/blog_md/", function(err, files){
				var i = 0;
				var f = '';
				data.artical.forEach(function(item){
					data.sql[item.filename] = item;
				});
				data.artical = [];
				files.forEach(function(file){
					data.artical[i] = {};
					if( data.sql[file] ){
						// console.log(data.sql[file]);
						data.artical[i].filename = data.sql[file].filename || file;
						data.artical[i].articalname = data.sql[file].articalname || data.sql[file].filename || file;
						data.artical[i].sort = data.sql[file].sort || "";
						data.artical[i].content = data.sql[file].content || "";
						data.artical[i].tag = data.sql[file].tag || "";
						data.artical[i].archive = data.sql[file].archive || "";
					} else {
						data.artical[i].filename = file;
						data.artical[i].articalname = file+"临时";
						data.artical[i].sort = "";
						data.artical[i].content = "";
						data.artical[i].tag = "";
						data.artical[i].archive = "";
					}
					i++;
				});
				art_list = JSON.stringify(data);
				fs.writeFile(filePath, art_list, function(err,data){
					app.set("art_list", data);
					res.send("ok");
				});
			});
		} else {
			
		}
	});


	app.get('*.html', function(req, res){
		var template_path = req.query.model === "artical" ? "/../block/template_artical.html" : "/../block/template.html";
		var pathname = url.parse(req.url).pathname;
		// console.log( __dirname + template_path );
		fs.readFile(__dirname + template_path, "utf-8", function(err, data){
			data = render.block(data);
			if( pathname == "/list.html" ){
				var h = '<ul class="list">';
				art_list.artical.forEach(function(item){
					h += '<li>'+
							'<a>'+
								'<h3>' + item.articalname + '</h3>'+
								'<span>' + item.content + '</span>'+
								'<em>作者: wangcl, 创建于: 2014.12.02</em>'+
							'</a>'+
						'</li>';
				});
				h += '</ul>';
				data = data.replace("<# main #>", h );
			} else {
				data = data.replace("<# main #>", fs.readFileSync( __dirname + "/../views" + pathname, 'utf-8' ) );
			}
			
			res.send(render.block(data));
		});
	});

	route_error(app);
}

module.exports = route;