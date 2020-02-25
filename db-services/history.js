var historyModel = require('../models/historyModel')
var mongoose = require('mongoose')

exports.getUserHistory = (userId) => {
  return historyModel.findOne({userId:userId})
}

exports.addUserLoginHistory = async(userId)=> {
  await historyModel.updateOne({userId:userId},{$push:{loginHistory:Date.now()}})
}

exports.addUserLogoutHistory = async(userId)=> {
  await historyModel.updateOne({userId:userId},{$push:{logoutHistory:Date.now()}})
}

