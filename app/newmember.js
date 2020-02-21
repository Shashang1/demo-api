var mongoose = require('mongoose')
var constant = require('./constants')
var model = require('../models/models')
var formidable = require('formidable');
var fs = require('fs');
var express = require('express')

function createUser(req, res, next){
  console.log(req.body)
  mongoose.connect(constant.databaseUrl, function(err){
    if (err) console.log(err)
    else{
      let entry = new model.userModel({username:req.body.username, password:req.body.password})
      entry.save(function(err){
        if (err) console.log(err)
        else next()
      })
    }
  })
}

function addDetail(req, res){
  model.userModel.findOne({username:req.body.username}, function(err, doc){
    if (err) console.log(err)
    else {
      let entryDetail = new model.detailModel({userId:doc._id,
      fname:req.body.fname,
      lname:req.body.lname,
      username:doc.username,
      position:req.body.position,
      worksAt:req.body.worksAt,
      mode:req.body.mode
      })
      entryDetail.save()
      let entryHistory = new model.historyModel({userId:doc._id, loginHistory:[], logoutHistory:[]})
      entryHistory.save()
      if (req.body.mode ==="ghost"){
        let entrySeen = new model.seenModel({userId:doc._id, seen:[]})
        entrySeen.save()
      }
      res.json({signuped:true})
    }
  })
}

function addImage(req, res){
  if(req.session.user){
    console.log("started")
    var form = new formidable.IncomingForm()
    form.parse(req, function(err, fields, files){
      var name = Date.now()
      var oldPath = files.file.path;
      var newPath = "./res/"+req.session.user.data.username+"-"+Date.now()+files.file.name;
      fs.rename(oldPath, newPath,function(err){
        if (err) res.json({status:err})
        else {
          mongoose.connect(constant.databaseUrl, function(err){
            model.userModel.findOne({username:req.session.user.username}, function(err, doc){
              if (err) console.log(err)
              else {
                console.log(req.session.user.data.userId)
                model.imageModel.updateOne({userId:req.session.user.data.userId}, {image:newPath},function(err){
                  if(err) console.log(err)
                  else res.json({status:"ok"})
                })
              }
            })
          })
        }
      })
    })
  }
  else{
    res.json({status:"bad", isLogin:false})
  }
}


module.exports = {createUser, addImage, addDetail};