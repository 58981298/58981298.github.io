/*
 * create by wangcl on 20141112
 */
var config = {
	block: {
		"body_header": __dirname + "/../block/body_header.html",
		"body_banner": __dirname + "/../block/body_banner.html",
		"head_start": __dirname + "/../block/head_start.html",
		"head_end": __dirname + "/../block/head_end.html",
		"aside": __dirname + "/../block/aside.html"
	}
}

var cBLOCK = config.block;
var cBLOCK_KEYS = Object.keys(cBLOCK); // block集合

var fs = require('fs');

// 是否需要读取block文件
var isNeedBlock = function(data, blockname){
	//console.log(data);
	if( data.indexOf('<# B(\'' + blockname + '\')#>') >= 0 
	|| data.indexOf('<# B("' + blockname + '")#>') >= 0 ){
		return true;
	} else return false;
}

var render = {
	// 渲染block文件进模板里
	block: function(data){
			// 临时增加类型
		var blockData = '';
		var reg = '';
		while( /<# B\(.*\)#>/.test(data) ){
			cBLOCK_KEYS.forEach(function(blockname){
				//console.log( blockname );
				if( blockname != "port" && isNeedBlock(data, blockname) ){
					if( fs.existsSync( cBLOCK[blockname] ) ){
						blockData = fs.readFileSync( cBLOCK[blockname], 'utf-8' );
						//console.log( blockData );
						reg = eval( '/<# B\\([\'"]' + blockname + '[\'"]\\)#>/gi' );
						data = data.replace(reg, blockData);
					}
				}
			});
		}
		

		
		// cCOM_KEYS.forEach(function(comname){
			
		// 	var reg = '<\\?=' + comname + '\\?>';
		// 	var port = !!cCOM['port'] ? cCOM['port'] == 80 ? ":80" : ":"+cCOM['port'] : "";
		// 	data = data.replace(new RegExp(reg, 'gi'), cCOM[comname] + port );
		// 	data = data.replace(/<\?php.*\?>/gi, ""); // 去除php
		// 	if( comname == "SOURCE_SEEDIT_COM" ){
		// 		data = data.replace(new RegExp('office.bzdev.net/nodeapp/silian', 'gi'), 'wcl.bzdev.net/nodeapp/silian' );
		// 		data = data.replace(new RegExp('office.bzdev.net/crazy/web', 'gi'), 'wcl.bzdev.net/crazy/web' );
		// 	}
		// });
		return data;
	}
};

module.exports = render;