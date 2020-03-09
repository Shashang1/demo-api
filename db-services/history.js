var historyModel = require('../models/historyModel')

exports.getUserHistory = (userId) => {
  return historyModel.findOne({userId:userId})
}

exports.addUserLoginHistory = async(userId)=> {
  const now = new Date;
  await historyModel.updateOne({userId:userId},{$push:{loginHistory:now.toISOString()}})
}

exports.addUserLogoutHistory = async(userId)=> {
  const now = new Date;
  await historyModel.updateOne({userId:userId},{$push:{logoutHistory:now.toISOString()}})
}

exports.createHistory = async(userId)=>{
  const entry = new historyModel({userId:userId, loginHistory:[], logoutHistory:[]})
  entry.save()
}

exports.deleteHistory = async(userId)=>{
  await historyModel.deleteOne({userId:userId})
}

