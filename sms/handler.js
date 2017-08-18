// 业务处理模块

const db = require("./db.js");

module.exports = {
  // 处理 / 和 /index 请求
  doIndex: function (req, res) {
    // 1. 读取 index.html 文件，渲染页面
    res.render("index");
  },
  // 处理 /students 请求
  doStudents: function (req, res) {
    // 1. 读取数据
    db.findAll("students", function (err, docs) {
      if (err) {
        throw err;
      }
      // 2. 读取 students.html 页面，并用数据渲染页面
      res.render("students", { list: docs });
    })

  },
  // 处理 /add 的 get 请求
  doAddGet: function (req, res) {
    // 1. 读取所有的 籍贯 和 专业 数据
    db.findAll("cities", function (err, docs_cities) {
      if (err) {
        throw err;
      }
      db.findAll("majors", function (err, docs_majors) {
        if (err) {
          throw err;
        }
        // 2. 读取 add.html ，渲染页面
        res.render("add", { cities: docs_cities, majors: docs_majors });
      })
    })

  },
  // 处理 /add 的 post 请求
  doAddPost: function (req, res) {
    // 1. 获取用户提交的信息
    var stuObj = {
      "sno": req.body.sno,
      "sname": req.body.sname,
      "sgender": req.body.sgender == "M" ? "男" : "女",
      "sbirthday": req.body.sbirthday,
      "sphone": req.body.sphone,
      "saddr": req.body.saddr,
      "smajor": req.body.smajor
    }
    // 2. 写入数据库
    db.insertOne("students", stuObj, function (err, result) {
      if (err) {
        throw err;
      }
      // 3. 重定向到students页面
      res.redirect("/students");
    })

  },
  // 处理 /info 的请求
  doInfo: function (req, res) {
    // 1. 获取用户请求中的_id
    // 2. 根据_id向数据库中查找对应的数据
    db.findOne("students", { _id: db.getObjectID(req.query._id) }, function (err, doc) {
      // 3. 读取 info.html ，渲染页面
      res.render("info", { item: doc });
    })





  },
  // 处理 /edit 的 get 请求
  doEditGet: function (req, res) {
    // 1. 读取所有的cities和majors
    db.findAll("cities", function (err, docs_cities) {
      if (err) {
        throw err;
      }
      db.findAll("majors", function (err, docs_majors) {
        if (err) {
          throw err;
        }
        // 2. 获取用户请求中的_id，根据 _id 向数据库中读取相应的数据
        db.findOne("students", { _id: db.getObjectID(req.query._id) }, function (err, doc) {
          if (err) {
            throw err;
          }
          // 3. 读取edit.html页面，渲染页面
          res.render("edit", { item: doc, majors: docs_majors, cities: docs_cities });
        })
      })
    })

  },
  // 处理 /edit 的 post 请求
  doEditPost: function (req, res) {
    // 1. 获取_id
    var _id = req.body._id;
    // 2. 获取用户提交的除_id以外的数据
    var stuObj = {
      "sno": req.body.sno,
      "sname": req.body.sname,
      "sgender": req.body.sgender == "M" ? "男" : "女",
      "sbirthday": req.body.sbirthday,
      "sphone": req.body.sphone,
      "saddr": req.body.saddr,
      "smajor": req.body.smajor
    }
    // 3. 根据_id更新数据库中的数据
    db.updateOne("students", { _id: db.getObjectID(_id) }, stuObj, function (err, item) {
      if (err) {
        throw err;
      }
      // 4. 重定向到students页面
      res.redirect("/students");
    })

  },
  // 处理 /delete 的请求
  doDelete: function (req, res) {
    // 1. 获取_id
    var _id = req.query._id;
    // 2. 根据 _id 删除数据库中相应的数据
    db.deleteOne("students", { _id: db.getObjectID(_id) }, function (err, result) {
      if (err) {
        throw err;
      }
      // 3. 重定向到students页面
      res.redirect("/students");
    })

  }
}