var mongoose = require('mongoose')
var constant = require('./constants')
var models = require('../models/models')
var userModel = models.userModel;
var bcrypt = require('bcrypt')
var config = require('../config')
var jwt = require('jsonwebtoken')

function login(req, res){
  mongoose.connect(constant.databaseUrl, function(err){
    if (err) console.log(err)
    else {
      userModel.findOne({username:req.body.username}, function(err,doc){
        if(err) console.log(err)
        else if(doc!==null){
          bcrypt.compare(req.body.password, doc.password, function(err, result){
            if(result){
              models.detailModel.findOne({userId:doc._id}, function(err, ans){
                if (err) console.log(err)
                else {
                  models.historyModel.update({userId:doc._id},{$push: {loginHistory:Date.now()}},function(err){
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
        else res.json({status:"wrong", data:null})
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