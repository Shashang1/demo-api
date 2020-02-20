var mongoose = require('mongoose')
var db = mongoose.connection;
var constant = require('./constants')
var models = require('../models/models')
var userModel = models.userModel;
function login(req, res){
  var sessionData = req.session;
  mongoose.connect(constant.databaseUrl, function(err){
    if (err) console.log(err)
    else {
      console.log("connected")
      userModel.findOne({username:req.body.username}, function(err,result){
        if(err) console.log(err)
        else if(result !== null && req.body.password===result.password){
          models.detailModel.findOne({userId:result._id}, function(err, ans){
            if (err) console.log(err)
            else {
              models.historyModel.update({userId:result._id},{$push: {loginHistory:Date.now()}},function(err){
                if(err) console.log(err)
              })
              sessionData.user = {username:req.body.username, data:ans}
              res.json({status:"ok", ...sessionData.user})
            }
          })
        }
        else {
          res.json({status:"wrong", data:null})
        }
      })
    }
  })
}

function logout(req, res){
  var sessionData = req.session;
  if(sessionData.user){
    mongoose.connect(constant.databaseUrl, function(err){
      if(err) console.log(err)
      else {
        models.historyModel.update({userId:sessionData.user.data.userId}, {$push:{logoutHistory:Date.now()}},function(err){
          if(err) console.log(err)
        })
      }
    })
  }
  sessionData.destroy(function(err){
    if (err) console.log(err)
    else res.json({status:"ok"})
  })
}


module.exports = {login, logout};