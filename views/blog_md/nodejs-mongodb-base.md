# mongodb-tes
mongodb入门，初步掌握其基本操作
本测试提供demo，端口默认1212，地址/test  
测试访问地址：http://localhost:1212/test,具体实际地址根据实际情况请自行调整
由于测试数据库较大，暂不上传

## 下载并安装mongodb
https://www.mongodb.org/downloads

## mongodb全局命令行操作
把mongodb安装目录下的bin目录加入到windows的环境变量中

## 为数据库指定存放路径，并启动数据库服务  
cd到项目下，新建一个文件夹来存放数据库，如data，输入：  
```bash
cd YourApplication  
mongod -dbpath ./data  
```
提示"[initandlisten] waiting for connections on port 27017"的时候说明正常启动成功  
此时数据库已经启动
## 命令行模式下测试mongodb( 测试数据库名：clary )  
+ 进入mongodb命令行模式  
cmd命令行下执行mongo进去mongodb的命令行模式
```bash
mongo  
``` 

+ 新建数据库  
```bash
use clary  
```  
使用上面命令后还不会创建数据库，当有数据插入后它才会去创建数据库

+ 插入数据  
插入一条数据：用户名test1001，邮箱test1001@qq.com  
```bash
db.usercolection.insert({"username":"test1001", "email":"test1001@qq.com"})  
```  
成功后看不到任何东西（不友好），执行查找看看是否插入成功

+ 查找数据  
```bash
db.usercollection.find()  
```
查找并显示数据，（字符串类型输出）
```bash  
db.usercollection.find().pretty()  
```  
查找并显示数据，（json类型输出） 

+ 多数据插入（使用数组插入）  
插入两条数据：用户名test1002，邮箱test1002@qq.com 和 用户名test1003，邮箱test1003@qq.com  
```bash
var temp_array = [{"username":"test1002", "email":"test1002@qq.com"},  
                         {"username":"test1003", "email":"test1003@qq.com"}];  
db.usercollection.insert(temp_array)  
```  
查看是否插入成功  
```bash
db.usercollection.find().pretty()  
```

## nodejs文件里面使用mongodb( 测试数据库名：clary )    
+ 为项目安装相关的mongodb并写入包配置文件  
```bash
		npm install mongodb --save  
		npm install monk --save  
```

+ 文件引入mongodb, 配置mongodb数据库链接地址，并查询  
```javascript
		var mongo = require("mongodb");  
		var monk = require("monk"); // 引入mongodb相关依赖  
		var db = monk("localhost:27017/clary") // 配置mongodb数据库链接地址  
		var collection = db.get("usercollection"); // 开始使用db查询  
		collection.find({},{}, function(err, data){  
		　　console.log(data); // 输出查询到的json数据  
		})  
```

+ 新增数据  
插入一条数据：用户名test1004, 邮箱test1004@qq.com
```javascript
    var collection = db.get("usercollection"); // 开始使用db查询    
    collection.insert({    
    username: "test1004",    
    　　　email: "test1004@qq.com"	    
    }, function(err, data){    
    　　　console.log(data); // 输出插入成功的那条json数据（含id）    
    })    
```

+ demo下载：[mongodb-test](https://github.com/unclary/mongodb-test "mongodb-test")
+ 感谢 [express+mongodb教程](http://www.toolmao.com/nodejs-express-ejs-mongodb-server)  
