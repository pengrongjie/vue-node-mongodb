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
vue-node-mongodb/server/app.js 中 **app.use(express.static(path.join(__dirname, 'public')))** 后面加上，以下代码
```
app.use(express.static(path.join(__dirname,'dist')));
```
```
# serve with hot reload at localhost:80
npm start
```
For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
