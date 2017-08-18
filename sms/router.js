// 路由模块

// 1. 加载express模块
const express = require("express");

const handler = require("./handler.js");

// 2. 创建router对象
const router = express.Router();

// 3. 为路由对象挂载（注册）各种路由
router.get("/", handler.doIndex);
router.get("/index", handler.doIndex);
router.get("/students", handler.doStudents);
router.get("/add", handler.doAddGet);
router.post("/add", handler.doAddPost);
router.get("/info", handler.doInfo);
router.get("/edit", handler.doEditGet);
router.post("/edit", handler.doEditPost);
router.get("/delete", handler.doDelete);

// 4. 返回路由对象
module.exports = router;
