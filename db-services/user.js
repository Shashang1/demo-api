var userModel = require('../models/userModel')


exports.getUser = (username) =>{
  return userModel.findOne({username:username},function(err){if (err) console.log(err)})
}

exports.setUser = (data)=>{
  const entry = new userModel({username: data.username, password:data.password})
  return entry.save()
}


