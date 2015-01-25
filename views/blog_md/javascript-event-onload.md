
根据w3school所介绍的[onload](http://www.w3school.com.cn/jsref/event_onload.asp "w3school onload")

只能支持的标签：
```
<body>, <frame>, <frameset>, <iframe>, <img>, <link>, <script>
```
只能支持的Javascript对象：
```
image, layer, window
```
接下来先说说，页面加载顺序：

+ 解析HTML结构。
+ 加载外部脚本和样式表文件。
+ 解析并执行脚本代码。
+ 构造HTML DOM模型。
+ 加载图片等外部文件。
+ 页面加载完毕。

也就是：  
html → head → title → #text(网页标题) → style → 加载样式 → 解析样式 → link → 加载外部样式表文件 → 解析外部样式表 → script → 加载外部脚本文件 → 解析外部脚本文件 → 执行外部脚本 → body → div → script → 加载脚本 → 解析脚本 → 执行脚本 → img → script → 加载脚本 → 解析脚本 → 执行脚本 → 加载外部图像文件 → 页面初始化完毕。
JS 的初始化装载。

+ 写这篇文章的初衷是因为有个项目需要加载完全部图片才能执行，
+ 而window.onload明文规定当页面css、js、img等加载完便可执行，但不知外链css里面的img即背景音乐算不算进去；  
+ 于是对于此问题进行一次测试，结果是外链css里面的img也是支持window.onload事件。  
+ 项目终于能够使用window.onload来处理图片后在执行自定义事件。


注：曾见过一篇文章问为什么windown.onload为什么无效，依然一进去页面就立即执行，代码大概如下  
```
window.onload = test();  
function test(){  
　　alert("window onload");  
}  
<body onload="alert("body load");"></body>  
```
结果很明显，window.onload的事件被覆盖，window.onload结果为test函数的返回值；
正确写法之一应该是
```
window.onload = function(){  
　　alert("window load");  
}  
```
至于window.onload和body.onload的孰快孰慢自己测试


最后感谢 [http://www.xiamiz.com/a/jiaocheng/20120723/108264.html](http://www.xiamiz.com/a/jiaocheng/20120723/108264.html)