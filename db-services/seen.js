const seenModel = require("../models/seenModel")


exports.getSeen = (userId)=> {
  return seenModel.findOne({userId:userId})
}

exports.setSeen = (userId, seenUser)=>{
  console.log(userId, seenUser)
  return seenModel.updateOne({userId:userId},
    {$push:{seen:{username:seenUser.username, userId:seenUser.userId, date:Date.now()}}})
}
