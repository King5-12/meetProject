# 聊天系统

项目地址：
[前端](https://github.com/King5-12/meetProject)
[后端](https://github.com/King5-12/meetprojectback)
[自动构建项目](https://github.com/King5-12/meetbuild)

### 技术方案

__前端__
- 由于没有seo等其他首屏需求，采用简单的spa页面进行开发。
- 利用 __umi__ 框架，快速搭建项目，并管理前端路由。
- 利用 __ESLint__ + __Prettier__ 进行代码格式规范以及格式检测。
- 利用  __commitlint__ 进行代码提交信息的规范。
- 利用 __githook__ 进行上述两项的校验。
- 利用 __TypeScript__ 保证代码可靠性、易读性、可维护、可重构。
- 利用 __Antd__ 快速实现ui。

__后端__ 
- 采用 __koa__ 框架，轻量，简单，可扩展性强。
- 采用 __websocket__ 全双工通信，保证聊天室的信息同步。

__数据库__ 
- 采用 __sqlite__，操作简单，轻量，且不需要服务，只需要相应的驱动。
- 只进行用户名和密码的存取。

__自动构建项目__ （实现自动化构建和部署）
- 采用 __execa__ 调用服务器的shell，支持多操作系统。
- 采用 __ora__ 进行日志的打印，界面优美。
- 采用 __string-random__ 进行dockerName的生成，保证docker构建以及停止命令的执行。

### 功能模块
注册、登录、群体聊天室、脏词过滤、github push监听，自动打包发布流程

### 关键算法
DFA算法 实现脏词过滤的判断。

### 使用说明
1. 进行账户注册。
2. 注册成功后会回到登陆页面，在进行登录。
3. 登录成功后会直接进入到聊天室，可以进行聊天。

### 部署说明
__前端__：
- __nginx__ 进行单页项目的托管，并利用 __try_files__ 保证页面刷新后依然能够访问
- __github__ 配置 __webhook__ ，通知到远程服务器中的自动构建服务。

__后端__：
- 利用 __docker__ 进行后端服务的镜像构建以及发布。
- __github__ 配置 __webhook__ ，通知到远程服务器中的自动构建服务。

__自动构建项目__
- 利用__pm2__ 进行服务的启动。
- 服务中监听 __github__ 中的 __webhook__ 请求，进行对应服务代码个更新以及服务重启。

### 性能指标和扩展
1. 后端服务器暂时都没有进行压测，具体性能不清楚。

2. 前端页面后续可在部署上进行浏览器缓存以及cdn静态资源的缓存设置在网络上进行优化。运行时的内存由于本身功能不多，并没有做针对性处理。

3. 后续可以在产品上增加单对单以及多个群聊组织的功能，现在只有一个统一的聊天室。

4. 自动构建服务后续以脚本的形式驱动构建和打包，保证服务的稳定性。（这一条做的时候忘记了，写文档的时候才意识到服务中去管理增大了服务的压力。）


### 遇到的问题
1. 无法采用githubpage的页面，因为个人服务器没有域名，无法申请免费的ssl，现在去申请域名也来不及了，最终放弃利用githubpage，全部都部署在个人服务器中。
### 项目地址

[聊天室-前端](http://121.89.204.99:8000/)
