const user = require('./controller/history')
var history = require('./db-services/history')
var historyModel = require('./models/historyModel')
var mongoose = require('mongoose')
var password = ""
mongoose.connect("mongodb://localhost:27017/linkdin").then(console.log("Connected"))
// user.getPassword("KhalDrogo").then(res=>console.log(res.password, res._id))

history.addUserLoginHistory("5e53acc1224f4b7b67f9f9e4", Date.now())
// historyModel.updateOne({userId:"5e53acc1224f4b7b67f9f9e4"},{$push:{loginHistory:Date.now()}})
// historyModel.updateOne({userId:userId},{$push:{loginHistory:history}})
const getHistory= async() =>{
  const res = await history.getUserHistory("5e53acc1224f4b7b67f9f9e4")
  console.log(res);
}

getHistory();





