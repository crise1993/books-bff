# test src
1、npm start

# test dist
1、npm run client:dev

2、npm run start:test

# bff架构
package.json

nodemon --->  开发环境下守护进程
scripty ---> scripts文件夹配 .sh 文件
pre阶段：运行 npm run client:dev命令，preclient:dev会先执行，所以可以在这个hook里面做些类似rm -rf ./dist删除文件夹的事
npm-run-all     --->   并行（parallel）运行多个script命令
babel-node      --->    运行node端es6代码

打包过程

server：
gulp --->  打包server服务，
gulp-watch  --->  实时更新代码
gulp-babel  --->  server代码识别es6语法
@babel/plugin-transform-modules-commonjs    --->  es6转commonjs
gulp-rollup --->  使用rollup的tree-shaking功能，去除dead code
@rollup/plugin-replace  --->  在bundling的时候，用定义的环境变量替换file中的字符串，判断是否是dead code

client：
webpack webpack-cli --->    使用webpack进行依赖树构建打包
babel-loader    --->        沟通webpack和babel的一座桥梁，帮助webpack和babel做了打通
@babel/core     --->        babel核心库，贯穿整个babel工作流。能够让babel识别es6语法（里面包括了@babel/parser、transformer[s]、以及@babel/generator）
@babel/preset-env   --->    包括了所有es6转es5的翻译规则，帮助你将es6语法翻译转化成es5语法
AfterHtmlPlugin     --->    自定义的在生成的html文件中在某段指定的文本处插入js、css标签资源

clean-webpack-plugin    --->    自动清理文件夹（比如在打包代码生成前，自动删除dist文件夹）
css-loader      --->        帮助webpack识别正确打包css代码，，并根据css文件之间的依赖关系，合并成一段css 
style-loader    --->        得到css内容（css-loader生成）后，将css挂载到header部分 
copy-webpack-plugin     --->    将文件/文件夹copy到指定目录（可配置进行压缩）
html-webpack-plugin     --->    打包生成html文件，并把生成的js、css静态资源文件插入到指定的html文件中
mini-css-extract-plugin     --->    将css文件从js中分离出来
html-minifier       --->    压缩html、css、js文件
optimize-css-assets-plugin  --->    压缩css
webpack-merge       --->    merge多个webpack config文件
yargs           --->        将process变成对象形式，解构化命令属性
glob            --->        用./**/*.js形式批量匹配文件
webapck-notifier    --->    打包成功/失败，给个notify提示
webpack-bundle-analyzer     --->    包分析工具
prepack         --->        更激进的打包工具

----------------------------------------------------------------

项目过程

server：

koa     --->    使用koa作为服务端框架
koa-router      ---> 使用koa-router托管路由
koa-static ---> 使用koa-static托管静态资源
koa-bodyparser  ---> 使用bodyparser解析body中对象参数
koa-swig        ---> 使用swig作为前端输出模板
koa2-connect-history-api-fallback   --->    使项目能够走前端history路由，白名单里的走server路由
log4js      --->    输出日志库
axios       --->    使用axios请求api接口
