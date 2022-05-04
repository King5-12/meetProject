const Koa = require('koa');
const koaStatic = require('koa-static');
const views = require('koa-views');
const Router = require('koa-router');
const path = require('path');

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 8080;
const distPath = path.join(__dirname, '/dist');

//请求的controller
const pageController = require('./app/controller/page');

//设置模板引擎ejs
app.use(
    views(distPath, {
        map: {
            html: 'ejs',
        },
    }),
);

//设置静态资源目录
app.use(
    koaStatic(distPath, {
        index: false,
        maxage: 60 * 60 * 24 * 365,
    }),
);

//页面显示的路由
router.get('/*', pageController);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
    console.log(`web静态服务已启动:${port}`);
});
