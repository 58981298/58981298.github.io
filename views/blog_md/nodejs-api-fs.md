
### 前言
fs是nodejs的文件操作模块，所有基于fs操作都必须引入fs模块，常用以下代码引入
```
var fs = require('fs');
```
下面将介绍其基本操作。  
官方FS的操作文档 [http://nodejs.cn/api/fs/](http://nodejs.cn/api/fs/ "fs操作文档")  
首先说明下，常规事件都是异步的，同时也存在同步sync事件，  
异步是存在err对象，而sync的不存在，所以可以考虑利用try-catch来捕捉异常  

## 常用的操作文档
+ fs.readFile 读取文件，三个参数，第二个参数可省略
```
fs.readFile("c:/code/demo/c.txt", "utf-8", function(err, data){  
　　if(err) throw err;  
　　console.log(data);  
});  
```
+ fs.readFileSync readFile的同步版本
```
var data = fs.readFileSync("c:/code/demo/c.txt", "utf-8");  
console.log(data);
```
+ fs.writeFile 写入文件，三个参数，第二个参数可省略
```
fs.writeFile("c:/code/demo/c.txt", "utf-8", function(err){  
　　if(err) throw err;  
　　// doing  
});  
```
+ fs.writeFileSync readFile的同步版本
```
fs.writeFileSync("c:/code/demo/c.txt", "utf-8");  
```