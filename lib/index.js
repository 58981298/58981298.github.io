/*
 * 模块依赖
 */
var express = require('express')
	, route = require('./../routes')
	, path = require('path');

var app = express();

/*
 * 坏境变量
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname + '/../views'));
app.set('view engine', 'ejs');



app.get('/', function(req, res){
	res.send('Can I help you and from homepage?');
});
route(app);


app.listen( app.get('port'), function(){
	console.log('listen to ' + app.get('port'));
} );