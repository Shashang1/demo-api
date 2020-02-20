var mongoose = require('mongoose')
var constant = require('./constants')
var model = require('../models/models')
var formidable = require('formidable');
var fs = require('fs');

function siginup(req, res){
  mongoose.connect(constant.databaseUrl, function(err){
    if (err) console.log(err)
    else{
      let entry = new model.userModel({username:req.body.username})
      entry.save()

      model.userModel.findOne({username:req.body.username}, function(err, doc){
        if (err) console.log(err)
        else {
          let entry = new detailModel({userId:doc._id,
          fname:req.body.fname,
          lname:req.body.lname,
          username:doc.username,
          position:req.body.position,
          worksAt:req.body.worksAt,
          mode:"normal"
          })
          entry.save()
        }
      })
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
      var newPath = "/home/rails/node-tranning/Demo/api/res/"+req.session.user.data.username+"-"+files.file.name;
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


module.exports = {siginup, addImage};