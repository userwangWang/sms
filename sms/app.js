// 1. 加载 express 模块
const express = require("express");

const config = require("./config.js");
const path = require("path");
const bodyParser = require("body-parser");
const router = require("./router.js");

// 2. 创建app
const app = express();


// 3.1 配置模板引擎
// 设置模板文件的路径
app.set("views", path.join(__dirname, "views"));
// 创建一个模板引擎，以html为后缀
app.engine("html", require("ejs").renderFile);
// 设置使用的模板引擎
app.set("view engine", "html");

// 3.2 注册 body-parser 中间件
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json 
app.use(bodyParser.json())

// 3.3 注册路由
app.use(router);

// 4. 开启服务
app.listen(config.port, function () {
  console.log("http://localhost:" + config.port);
})
