var historyModel = require('../models/historyModel')

exports.getUserHistory = (userId) => {
  return historyModel.findOne({userId:userId})
}

exports.addUserLoginHistory = async(userId)=> {
  await historyModel.updateOne({userId:userId},{loginHistory:Date.now()})
}

exports.addUserLogoutHistory = async(userId)=> {
  await historyModel.updateOne({userId:userId},{logoutHistory:Date.now()})
}

exports.createHistory = async(userId)=>{
  const entry = new historyModel({userId:userId, loginHistory:"", logoutHistory:""})
  entry.save()
}

