## 前言
+ 前言必先水上一水，话说自从接触nodejs，就根本停不下来。
+ 一个前端就能使用的后台语言nodejs，对于前端攻城屎来说真是一大利器
+ 于是便萌发自己建站的想法，东溜溜西扒扒最终找了hexo，一个基于nodejs的静态blog框架
+ 可惜好景不长，hexo不合心意，无奈转投自己开发blog框架
+ 新的一年2015到了，开战
+ 下面将说明这个自建网站的框架。（请先了解nodejs和express再来浏览下面，不好吃~）
+ 相关技术：Nodejs,Express,Markdown
+ 以下是框架根目录及根目录文件  
```
 root  
D  |- common 				公共文件库  
D  |- config 				应用配置文件  
D  |- doc 					服务器相关文档  
D  |- lib 					库  
D  |- node_modules 			存放所有的项目依赖库  
D  |- routes 				路由文件(MVC中的C,controller)  
D  |- views					模板文件  
F  |- index.js 				程序启动文件  
F  |- package.json 			项目依赖配置及开发者信息  
F  |- Procfile 				heroku默认启动程序文件  
F  |- README.MD 			程序说明  
```

### common
+ img 用于存放站点基本图片
+ css 站点样式
	+ editor.css 编辑器样式
	+ markdown.css 站点markdown样式
	+ markdown_artical.css 文章markdown样式
	+ style.css 站点基本样式
+ js 脚本目录
	+ jquery.min.js

### config
+ 暂无

### doc
+ framework.md 站点框架文档

### lib
+ 暂时为空

### node_modules
+ 各种包依赖库目录，详细见package.json配置文件

### routes
+ index.js 站点路由入口
+ admin.js 管理路由入口
+ base.js 站点基础框架路由
+ blog.js 文章路由
+ db.js db操作集合
+ error.js 异常及错误路由
+ homepage.js 首页路由
+ user.js 用户系统路由

### views
+ admin 暂无介绍
+ block
	+ head\_start.ejs head头部模板，主要用来控制meta
	+ head\_end.ejs head尾部模板，主要用来加载css、js
	+ body\_banner.ejs banner模板
	+ body\_header.ejs 头部模板
	+ body\_footer.ejs 尾部模板
	+ body\_list.ejs 文章列表模板（暂不使用）
	+ aside.ejs 右边栏模板
	+ template\_1.ejs 静态页模板之一，暂用于“关于我”页面
	+ template\_2.ejs 静态页模之二，用于未知
+ blog 文章实际列表目录
+ blog_block 文章静态页模板
+ blog_md 文章文档列表目录
+ about.ejs 关于我静态页
+ index.ejs 首页，暂为文章列表页
+ login.ejs 用户登录测试页

### 根目录文件
+ index.js 启动文件
+ package.json 包依赖库配置文件
+ Profile heroku启动文件
+ README.md 站点信息