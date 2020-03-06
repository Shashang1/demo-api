var detailModel = require('../models/detailModel')

exports.getUserDetail = (userId)=>{
  return detailModel.findOne({userId:userId})
}

exports.setUserDetail = (data) =>{
  const entry = new detailModel({...data})
  return entry.save()
}

exports.setUserImage = (userId, imgUrl) =>{
  return detailModel.updateOne({userId:userId}, {image:imgUrl})
}

exports.getFilteredUser = (data=null) =>{
  return detailModel.find(data);
}

exports.deleteUserDetails = (userId) =>{
  return detailModel.deleteOne({userId:userId});
}

