/*
 * 内置模块引用
 */

/*
 * 配置
 */
var root_views = __dirname + "/../views";
/*
 * 模块内变量
 */
module.exports = function(app){
	// 404
	app.get('*', function(req, res){
	    res.render('404', {
	        title: 'No Found'
	    })
	});
}
