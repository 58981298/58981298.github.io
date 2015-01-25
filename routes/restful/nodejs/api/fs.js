var fs = require('fs');
var root_demo = __dirname+'/../../../../demo/nodejs/api/fs';
console.log( root_demo );
module.exports = function(app){
	app.get('/restful/nodejs/api/fs/readfile/', function(req, res){
			fs.readFile(root_demo+'/readfile', function(err,data){
				if(err) throw err;
				res.send(data);
			});
	});
}

// $.ajax({
// 	url: "http://localhost:3000/restful/nodejs/api/fs/readfile/",
// 	data: { 
// 		data: "nimade"
// 	}, 
// 	success: function(data){
// 		console.log(data); 
// 	}
// })