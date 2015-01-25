/*
 * 内置模块引用
 */
var fs = require("fs");
/*
 * 配置
 */
var root_db = __dirname + "/../lib/db";
/*
 * 模块内变量
 */
var updatetime = Date.now();
var db_data = {};
/*
 * 模块导出对象
 */
var db = {};
db.updatetime = updatetime;
db.turnOptions = function(options){
	if( typeof options === "string" ){
		var options_temp = options;
		options = {};
		options.table = options_temp;
	} else {
		options = options || {};
		options.table = options.table || "";
	}

	return options;
}
db.select = function(options){
	// 如果参数为字符串，直接当做表名来查找

	options = db.turnOptions(options);
	if( !options.table || options.table.replace(/[^a-zA-Z]/g,"") == "" ){
		return "table is null";
	}
	// console.log( updatetime + "||" + db.updatetime);
	if( fs.existsSync(root_db+"/"+options.table) ){
		var template_db_data = {};
		if( !db_data[options.table] || db.updatetime != updatetime ){
			console.log("update db_cache");
			updatetime = db.updatetime;
			template_db_data[options.table] = db_data[options.table] = JSON.parse(fs.readFileSync(root_db+"/"+options.table,"utf-8"));
			//console.log( JSON.parse(fs.readFileSync(root_db+"/"+options.table,"utf-8") )  );
		}
		//console.log( db_data );
		if( !!options.field ){
			options.field = options.field.split(" ");
			var ele = {};
			for( var j = 0; j < options.field.length; j++ ){
				if( !!db_data[options.table][0][ options.field[j] ] ){
					ele[ ptions.field[j] ] = [];
					for( var i = 0; i < data.length; i++ ){
						ele[ options.field[j] ] = db_data[options.table][i][ options.field[j] ];
					}
				}
			}
			template_db_data[options.table] = options.orderby && options.orderby == "desc" ? db.quickSort( ele, "updatetime" ):ele;
		} else {
			template_db_data[options.table] = options.orderby && options.orderby == "desc" ? db.quickSort( db_data[options.table], "updatetime" ):db_data[options.table]; 
		}
		return template_db_data[options.table];
	} else {
		return "table undefined";
	}
}
db.update = function(options){
	options = db.turnOptions(options);
	if( !options.table || options.table.replace(/[^a-zA-Z]/g,"") == "" ){
		return "table is null";
	}
	//console.log( match(options.id, options.data, db.select("artical") ) );
	fs.writeFileSync(root_db+"/"+options.table, JSON.stringify(match(options.id, options.data, db.select("artical") ) ), "utf-8");
	db.updatetime = Date.now();
	return "更新成功";
}
// 文件直接覆盖源文件，没有便新增
db.cover = function(options){
	options = db.turnOptions(options);
	if( !options.table || options.table.replace(/[^a-zA-Z]/g,"") == "" ){
		return "table is null";
	}
	console.log( "cover" );
	fs.writeFileSync(root_db+"/"+options.table, JSON.stringify(options.data), "utf-8");
	db.updatetime = Date.now();
	return "覆盖成功";
}
db.delete = function(options){
	options = db.turnOptions(options);
	if( !options.table || options.table.replace(/[^a-zA-Z]/g,"") == "" ){
		return "table is null";
	}
	options.index = options.index || -1;
	if( options.index >= 0 ){
		var data = db.select(options.table);
		data.splice(options.index, 1);
		fs.writeFileSync(root_db+"/"+options.table, JSON.stringify( data ), "utf-8");
		db.updatetime = Date.now();
		return "删除成功";
	} else {
		return "删除记录不存在";
	}
}
db.add = function(options){
	options = db.turnOptions(options);
	if( !options.table || options.table.replace(/[^a-zA-Z]/g,"") == "" ){
		return "table is null";
	}
	var allData = db.select(options.table);
	console.log( options.data );
	for( var i=0; i < options.data.length; i++ ){
		if( isExist("name", options.data, allData) ){
			var opt = options;
			opt.data = options.data[i];
			return addOne(opt, options.index);
		}
	}
}
db.test = function(){
	db.updatetime = Date.now();
}
db.dataFormat = function(){
	Date.prototype.Format = function(fmt) {
		var o = {
			"M+": this.getMonth() + 1, //鏈堜唤 
			"d+": this.getDate(), //鏃� 
			"h+": this.getHours(), //灏忔椂 
			"m+": this.getMinutes(), //鍒� 
			"s+": this.getSeconds(), //绉� 
			"q+": Math.floor((this.getMonth() + 3) / 3), //瀛ｅ害 
			"S": this.getMilliseconds() //姣 
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
}
// 快速排序，desc
db.quickSort = function(arr, type){
	var type_ar = [];
	
	var d = [];
	for( var i=0; i<arr.length; i++ ){
		type_ar.push( arr[i][type] );
	}
	console.log( type_ar );
	type_ar.sort(function(a,b){return a<b?1:-1});
	for( var i=0; i<type_ar.length; i++ ){
		for( var j=0; j<arr.length; j++ ){
			if( type_ar[i] == arr[j][type] && type_ar[i] != type_ar[i-1] ){
				d.push(arr[j]);
			} 
		}
	}
	return d;
}
function addOne(options){
	options = db.turnOptions(options);
	if( !options.table || options.table.replace(/[^a-zA-Z]/g,"") == "" ){
		return "table is null";
	}
	var d = db.select(options.table);
	if( options.index && options.index>=0 ){
		d[options.index] = options.data;
	} else {
		d.push( options.data );
	}
	fs.writeFileSync(root_db+"/"+options.table, JSON.stringify( d ), "utf-8");
	db.updatetime = Date.now();
	return "新增一条记录成功";
}
function isExist(id, data, allData){
	if( !!allData[0][id] ){
		for( var j = 0; j < allData.length; j++ ){
			if( allData[j][id] == data[id] ){
				return false;
			}
		}
	}
	return true;
}
function match(id, data, allData){
	if( !!allData[0][id] ){
		for( var i = 0; i < data.length; i++ ){
			for( var j = 0; j < allData.length; j++ ){
				if( allData[j][id] == data[i][id] ){
					
					allData[j] = data[i];
				}
			}
		}
	}

	return allData;
}

// quickSort(db.select("artical"), "updatetime");
module.exports = db;