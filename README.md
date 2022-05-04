# meetProject

用于面试

基于[umi](https://umijs.org/zh-CN/docs) + typescript的对内单页面应用

## 命令

- `npm run dev`启动开发模式
- `npm run build`打包代码

### 编辑器配置

- 开启nodejs自带核心模块提示
- 开启eslint提示，`Automatic Eslint Configuration`按项目配置(Webstorm)

### 开发前一些事项

- 项目默认采用了[约定式路由](https://umijs.org/zh-CN/docs/convention-routing)
- 开发时需自行修改`src/config/index.ts`文件内的后端网关前缀`apiPrefix`，此样板代码为`audit`的api前缀
- 若启用了`UAC登录逻辑`，会自动引入`dva`相关，用于存储全局状态，比如当前用户信息
- 若启用了`侧边栏和头部`，需在`src/config/menu.ts`文件中配置菜单，`iconfont`自行引入和配置即可显示侧边栏菜单icon

### 预设hooks

- `useRequest`，大部分获取数据场景使用
- `useTableRequest`，基于`useRequest`改造的专为Table组件获取数据使用，主要集成了页码`pagination`的逻辑，[例子](https://git.tap4fun.com/bi-web/audit/audit-fe/-/blob/dev/src/pages/todo/index.tsx#L40)
- `usePageMenuInfo`，获取页面路由层级信息，基于此可实现`面包屑`或`路由重定向组件`等
