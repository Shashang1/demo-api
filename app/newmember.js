var mongoose = require('mongoose')
var constant = require('./constants')
var model = require('../models/models')
var formidable = require('formidable');
var fs = require('fs');
var express = require('express')
var bcrypt = require('bcrypt')

function createUser(req, res, next){
  bcrypt.hash(req.body.password, 10, function(err, hash){
    mongoose.connect(constant.databaseUrl, function(err){
    if (err) console.log(err)
    else{
      let entry = new model.userModel({username:req.body.username, password:hash})
      entry.save(function(err){
        if (err) console.log(err)
        else next()
      })
    }
  })
})
  
  
  
  
  
  
  // mongoose.connect(constant.databaseUrl, function(err){
  //   if (err) console.log(err)
  //   else{
  //     let entry = new model.userModel({username:req.body.username, password:req.body.password})
  //     entry.save(function(err){
  //       if (err) console.log(err)
  //       else next()
  //     })
  //   }
  // })
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
    var form = new formidable.IncomingForm()
    form.parse(req, function(err, fields, files){
      if(err) console.log(err)
      var name = Date.now()
      var oldPath = files.file.path;
      dbImageLink = 'http://localhost:5000/image/'+req.decoded.userId+".jpg";
      var newPath = "./res/"+req.decoded.userId+".jpg";
      fs.rename(oldPath, newPath,function(err){
        if (err) res.json({status:err})
        else {
          mongoose.connect(constant.databaseUrl, function(err){
            model.detailModel.updateOne({userId:req.decoded.userId}, {image:dbImageLink}, function(err, doc){
              if (err) console.log(err)
              else {
                res.status(200).json({Uploaded:"ok"})
              }
            })
          })
        }
      })
    })
}


module.exports = {createUser, addImage, addDetail};