#### Q1. 模板未解析
```
<%- partial('_partial/head') % >  
<%- partial('_partial/header', null, {cache: !config.relative_link}) % >  
<%- body % >  
<% if (theme.sidebar && theme.sidebar !== 'bottom'){ % >  
<%- partial('_partial/sidebar', null, {cache: !config.relative_link}) % > <% } % >  
<%- partial('_partial/footer', null, {cache: !config.relative_link}) % >  
<%- partial('_partial/mobile-nav', null, {cache: !config.relative_link}) % >  
<%- partial('_partial/after-footer') % >
```
##### A1. hexo默认没有依赖，命令行使用npm install安装默认依赖，依赖配置文件是package.json