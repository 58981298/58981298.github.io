/*
 * 模块依赖
 */
var express = require('express')
	, session = require('express-session')
	, cookieParser = require('cookie-parser')
	//, favicon = require('serve-favicon')
	, route = require('./routes')
	, user = require('./routes/user')
	, path = require('path');
var app = express();
var url = require('url');
var fs = require('fs');
// var render = require('./render.js');
var markdown = require('markdown-js'); 
/*
 * 坏境变量
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');
//app.use(favicon(__dirname + '/common/favicon.ico'));
app.use(cookieParser('xiaocc_'));
app.use(session({
  resave:false,
  saveUninitialized:false,
  secret: 'keyboard cat'
}))
app.use('/common/',express.static(__dirname + '/common'));
app.use('/widget/',express.static(__dirname + '/widget'));

//app.use(express.favicon());
//app.use(express.session());


// app.get('/', function(req, res){
// 	console.log( session.Session );
// 	//console.log( req.session );
// 	res.send('Can I help you and from homepage?');
// });



app.get('/update/blog/', function(req,res){
	// fs.readdir(__dirname+"/views/blog_block/", function(err, files){
	// 	files.forEach(function(file){
	// 		fs.writeFileSync( __dirname+"/views/blog/"+file.replace(".md","")+".ejs", fs.readFileSync( __dirname + "/views/blog_block/"+file, "utf-8"));
	// 	})
	// });
	// var template_artical = fs.readFileSync(__dirname+"/views/blog_block/blog.ejs", 'utf-8');
	// fs.readdir(__dirname+"/views/blog_md/", function(err, files){
	// 	files.forEach(function(file){
	// 		var dd = template_artical.replace( "<# main #>", markdown.makeHtml( fs.readFileSync( __dirname + "/views/blog_md/"+file, { encoding: "utf-8" } ) ) );
	// 		fs.writeFileSync( __dirname+"/views/blog/"+file.replace(".md","")+".ejs", dd);
	// 	})
		
	// });
	var template_1 = fs.readFileSync(__dirname+"/views/block/template_1.ejs", 'utf-8');
	var template_2 = fs.readFileSync(__dirname+"/views/block/template_2.ejs", 'utf-8');
	fs.writeFileSync( __dirname+"/views/about.ejs"
		, template_1.replace("<# main #>", markdown.makeHtml( fs.readFileSync(__dirname+"/doc/framework.md","utf-8") ) )
	);
	fs.writeFileSync( __dirname+"/views/nav.ejs"
		, template_1.replace("<# main #>", markdown.makeHtml( fs.readFileSync(__dirname+"/doc/nav.md","utf-8") ) )
	);
	fs.writeFileSync( __dirname+"/views/demo.ejs"
		, template_2.replace("<# main #>", markdown.makeHtml( fs.readFileSync(__dirname+"/doc/demo.md","utf-8") ) )
	);

	res.send("ok");
})

user(app);
route(app);





app.listen( app.get('port'), function(){
	console.log('listen to ' + app.get('port'));
} );