# 全栈第一步

> vue(全家桶)+node(express)+mongodb(mongoose)+阿里云(cenOS)部署+域名上线，前后端分离博客

> [线上访问](http://pengrongjie.com/)
## 分开2个终端运行
```
git clone https://github.com/pengrongjie/vue-node-mongodb.git
```
#### Vue
``` bash
# install dependencies
cd vue-node-mongodb
cnpm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
打包后生成**dist**文件夹
#### Node
``` bash
# install dependencies
cd vue-node-mongodb/server
cnpm install

# serve with hot reload at localhost:80
npm start
```
此时，只要打开2个终端运行，就可以正常访问了

## 打包一个终端运行
把打包后生成的**dist**文件夹,复制到
```
vue-node-mongodb/server
```
cd vue-node-mongodb/server/app.js 
```
找到 app.use(express.static(path.join(__dirname, 'public'))) 在后面加上，以下代码
```
```
app.use(express.static(path.join(__dirname,'dist')));
```
```
# serve with hot reload at localhost:80
npm start
```
## 提醒
数据库名字更改
``` bash
# cd vue-node-mongodb/server/data/module.js

找到 mongoose.connect('mongodb://localhost:27017/test93');
把**test93** 修改成你自己喜欢的数据库名字
```
## 项目大概
#### 前台首页
![](/book/images/1508291808(1).png)
#### 文章详情
![](/book/images/1508291844(1).png)
#### 后台首页
![](/book/images/1508291870(1).png)
#### 文章管理
![](/book/images/1508291881(1).png)
#### 文章添加
![](/book/images/1508291889(1).png)
#### 文章修改
![](/book/images/1508291905(1).png)
#### 文章删除
![](/book/images/1508291933(1).png)

## 阿里云部署
#### 帮助工具
winSCP shell
#### 参考文献
[部署Node.js项目（CentOS)](https://help.aliyun.com/document_detail/50775.html)

[把nodejs项目部署到阿里云](http://blog.csdn.net/chenlinIT/article/details/73343793)

#### 阿里云ECS(cenOS),默认端口为80
通过ECS实例-->安全组-->入口方向添加常见的**8080,3000**端口
![](/book/images/bVWsa1.png)

#### shell操作已经部署在阿里云上的mongodb
winSCP,找到**mongodb**的安装目录

![](/book/images/bVWLtj.png)

shell操作**mongodb**,与windows相比，只是启动的方式由**mongo**变成 ./mongo
```
cd 目录
./mongo
```
![](/book/images/bVWLtE.png)
![](/book/images/bVWLxa.png)
#### pm2
相比 npm start 或者 node app.js,pm2在关闭远程链接，还能永远运行
```
# 常用操作
pm2 list //列出所有
pm2 start ./bin/www  运行
pm2 start 1  运行(序号)
pm2 stop ./bin/www 停止
pm2 stop 1 停止(序号)
```
![](/book/images/2153441650-59ded703b226d_articlex.png)

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
