// const Koa = require("koa");
import Koa from 'koa';
import render from 'koa-swig';
import co from 'co';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import { historyApiFallback } from 'koa2-connect-history-api-fallback';
import log4js from 'log4js';
import path from 'path';

import config from './config';
import initController from './controller';
import ErrorHandler from './middlewares/errorHandler';

const app = new Koa();

// log4js日志库初始化
log4js.configure({
  appenders: { globalError: { type: "file", filename: path.join(__dirname, "./logs/error.log") } },
  categories: { default: { appenders: ["globalError"], level: "error" } }
});
const logger = log4js.getLogger("globalError");
// 自定义错误处理中间件
ErrorHandler.error(app,logger);

// koa-swig模板引擎初始化
app.context.render = co.wrap(
    render({
        root: config.viewDir,
        cache: config.cache,
        varControls:['[[',']]'],
        // ext: 'html',
    })
);
// 初始化中间件
// 除了/api的路由，其他路由都会打到/这个路由上去
//   /about  -> 后端/about -> 404 -> fallback中间件 -> 转到后端/ -> vue页面 -> 页面路由为/about -> vue-router -> /about页面
app.use(historyApiFallback({ index: "/", whiteList: ['/api','/book'] }));
app.use(serve(config.assetsDir));
// 初始化bodyParser配置中间件
app.use(bodyParser());

// 初始化路由层和业务逻辑层
initController(app);

app.listen(config.port, () => {
  console.log(`server is running at http://localhost:${config.port}`);
});
