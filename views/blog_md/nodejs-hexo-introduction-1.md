此文章基于nodejs而写，请先了解nodejs
##### 前言
最近想写些文章，但是没有自己的博客平台，以前尝试过workpress，但是后来又不了了之。
直到现在在学习nodejs，想到用它来搭建blog，发现一个平台hexo是不需要数据库的。
现在下面开始讲述如何搭建一个博客

##### 目录
+ 1.Hexo介绍
+ 2.Hexo安装
+ 3.Hexo使用
+ 4.Hexo部署


## 1. Hexo介绍
Hexo是一个快速、简单、强大、基于node的静态博客框架。它使用的是Markdown引擎来生成静态文件和主题。  
Hexo官网：[http://hexo.io/](http://hexo.io "Hexo官网")

## 2. Hexo安装
使用命令行模式安装Hexo，依赖：nodejs，npm，下面使用-g是安装到全局变量
```
	C:\code>npm install hexo -g
```
## 3. Hexo使用
在当前目录下初始化一个Hexo实例
	C:\code>hexo init hexo_blog
	[info] Copying data  
	[info] You are almost done! Don't forget to run `npm install` before you start blogging with Hexo!  

进入hexo_blog目录；npm install安装需要的依赖包；启动Hexo
```
C:\code>cd hexo_blog  
C:\code\hexo_blog>npm install  
hexo-renderer-ejs@0.1.0 node_modules\hexo-renderer-ejs  
├── ejs@1.0.0  
└── lodash@2.4.1  
hexo-renderer-marked@0.1.0 node_modules\hexo-renderer-marked  
├── marked@0.3.2  
└── lodash@2.4.1  
hexo-renderer-stylus@0.1.0 node_modules\hexo-renderer-stylus  
├── nib@1.0.4 (stylus@0.45.1)  
└── stylus@0.44.0 (css-parse@1.7.0, mkdirp@0.3.5, sax@0.5.8, debug@2.1.0, glob@3.2.11)  
C:\code\hexo_blog>hexo server  
[info] Hexo is running at http://localhost:4000/. Press Ctrl+C to stop.  
```
此时服务已正常启动，端口4000，浏览器中输入localhost:4000即可访问，如下
![blog demo](/common/img/2014/12/14/001.jpg "blog demo")

## 4. Hexo部署
hexo部署的文件是静态文件，所以必须先生成静态文件才能放到github上面  
静态文件的默认路径是应用根目录下的public  
静态文件放到你github的username.github.io库中，没有便自建此库，github.com:username/username.github.io.git  
上传成功后，打开你的github二级域名即可看到你的博客，http://58981298.github.io  
```
C:\code\hexo_blog>hexo generate  
[info] Files loaded in 0.090s  
[create] Generated: archives/index.html (53ms)  
[create] Generated: archives/2014/index.html (13ms)  
[create] Generated: archives/2014/12/index.html (8ms)  
[create] Generated: index.html (12ms)  
[create] Generated: 2014/12/14/hello-world/index.html (26ms)  
[create] Generated: js/script.js (3ms)  
[create] Generated: fancybox/blank.gif (2ms)  
[create] Generated: fancybox/fancybox_loading.gif (1ms)  
[create] Generated: fancybox/fancybox_loading@2x.gif (1ms)  
[create] Generated: fancybox/fancybox_overlay.png (1ms)  
[create] Generated: fancybox/fancybox_sprite.png (1ms)  
[create] Generated: fancybox/fancybox_sprite@2x.png (1ms)  
[create] Generated: fancybox/jquery.fancybox.css (1ms)  
[create] Generated: fancybox/jquery.fancybox.js (1ms)  
[create] Generated: fancybox/jquery.fancybox.pack.js (1ms)  
[create] Generated: fancybox/helpers/fancybox_buttons.png (2ms)  
[create] Generated: fancybox/helpers/jquery.fancybox-buttons.css (1ms)  
[create] Generated: fancybox/helpers/jquery.fancybox-buttons.js (1ms)  
[create] Generated: fancybox/helpers/jquery.fancybox-media.js (1ms)  
[create] Generated: fancybox/helpers/jquery.fancybox-thumbs.css (1ms)  
[create] Generated: fancybox/helpers/jquery.fancybox-thumbs.js (1ms)  
[create] Generated: css/style.css (608ms)  
[create] Generated: css/fonts/FontAwesome.otf (2ms)  
[create] Generated: css/fonts/fontawesome-webfont.eot (1ms)  
[create] Generated: css/fonts/fontawesome-webfont.svg (2ms)  
[create] Generated: css/fonts/fontawesome-webfont.ttf (2ms)  
[create] Generated: css/fonts/fontawesome-webfont.woff (2ms)  
[create] Generated: css/images/banner.jpg (3ms)  
[info] 28 files generated in 0.772s
```
![public](/common/img/2014/12/14/002.jpg)
