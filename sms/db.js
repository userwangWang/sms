// 数据库操作模块

// 1. 加载 mongodb 模块
const mongodb = require("mongodb");

const config = require("./config.js");

// 2. 封装连接数据库的函数
function connectDB(callback) {
  // 创建mongoClient
  mongodb.MongoClient.connect(config.connStr, function (err, db) {
    if (err) {
      throw err;
    }
    callback(db);
  })
}

// 3. 各种数据库操作

// 3.1 封装查询所有数据的函数
module.exports.findAll = function (collectionName, callback) {
  connectDB(function (db) {
    db.collection(collectionName).find().toArray(function (err, docs) {
      // 关闭数据库连接
      db.close();
      callback(err, docs);
    })
  })
}

// 3.2 封装插入一条数据的函数
module.exports.insertOne = function (collectionName, data, callback) {
  // 1. 连接数据库
  connectDB(function (db) {
    // 2. 插入数据
    db.collection(collectionName).insertOne(data, function (err, result) {
      // 关闭数据库连接
      db.close();
      callback(err, result);
    })
  })
}

// 3.3 封装转化 _id 的函数
module.exports.getObjectID = function (id) {
  return new mongodb.ObjectID(id);
}

// 3.4 封装查询一条数据的函数
module.exports.findOne = function (collectionName, filter, callback) {
  connectDB(function (db) {
    db.collection(collectionName).findOne(filter, function (err, doc) {
      db.close();
      callback(err, doc);
    })
  })
}

// 3.5 封装更新数据的函数
module.exports.updateOne = function (collectionName, filter, data, callback) {
  // 1. 连接数据库
  connectDB(function (db) {
    // 2. 执行更新操作
    db.collection(collectionName).updateOne(filter, data, function (err, item) {
      db.close();
      callback(err, item);
    })
  })
}

// 3.6 封装删除一条数据的函数
module.exports.deleteOne = function (collectionName, filter, callback) {
  // 1. 连接数据库
  connectDB(function (db) {
    // 2. 执行删除操作
    db.collection(collectionName).deleteOne(filter, function (err, result) {
      db.close();
      callback(err, result);
    })
  })

}