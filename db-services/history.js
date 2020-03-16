var historyModel = require('../models/historyModel')
var mongoose = require('mongoose')

exports.getUserHistoryNoDate = (userId) => {
  return historyModel.findOne({userId:userId})
}

exports.getUserHistory = async(userId, date) =>{
  var ndate = new Date(date).setDate(new Date(date).getDate()+1)
  ndate = new Date(ndate).toISOString()
  return await historyModel.aggregate(
    [{$match:{userId : mongoose.Types.ObjectId(userId)}},
      {$project: 
      {
        login:{$filter: {input: "$loginHistory", as: "lh", cond: {$and:[  
          { $gt: [ "$$lh", date ]},
          { $lt: [ "$$lh", ndate]}
        ]}}},
        userId:"$userId",
        logout:{$filter: {input:"$logoutHistory", as: "lh", cond: {$and:[
          { $gt: ["$$lh", date]},
          { $lt: ["$$lh", ndate]}
        ]}}}
      }
    }
    ]
  )
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

