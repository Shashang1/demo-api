var mongoose = require('mongoose')
var db = mongoose.connection;
var constant = require('./constants')
var models = require('../models/models')
var userModel = models.userModel;
var config = require('../config')
var jwt = require('jsonwebtoken')

function login(req, res){
  mongoose.connect(constant.databaseUrl, function(err){
    if (err) console.log(err)
    else {
      userModel.findOne({username:req.body.username}, function(err,result){
        if(err) console.log(err)
        else if(result !== null && req.body.password===result.password){
          models.detailModel.findOne({userId:result._id}, function(err, ans){
            if (err) console.log(err)
            else {
              models.historyModel.update({userId:result._id},{$push: {loginHistory:Date.now()}},function(err){
                if(err) console.log(err)
              })
              let response = {username:req.body.username, data:ans}
              let token = jwt.sign({userId:ans.userId, username:ans.username}, config.secret,{expiresIn:'1h'})
              res.json({status:"ok", token:token, username:req.body.username, ...response})
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
  mongoose.connect(constant.databaseUrl, function(err){
    if(err) console.log(err)
    else {
      models.historyModel.update({userId:req.decoded.userId}, {$push:{logoutHistory:Date.now()}},function(err){
        if(err) console.log(err)
        else{
          res.json({status:"ok"})
        }
      })
    }
  })
}

module.exports = {login, logout};