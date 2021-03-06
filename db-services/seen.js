const seenModel = require("../models/seenModel")


exports.getSeen = (userId)=> {
  return seenModel.findOne({userId:userId})
}

exports.setSeen = (userId, seenUser)=>{
  return seenModel.updateOne({userId:userId},
    {$push:{seen:{$each:[{username:seenUser.username, userId:seenUser.userId, date:Date.now()}], $position:0}}})
}

exports.createSeen = (userId) =>{
  const entry = new seenModel({userId:userId, seen:[]})
  entry.save()
}
