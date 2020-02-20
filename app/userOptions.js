var mongoose = require('mongoose');
var constant = require('./constants')
var model = require('../models/models')

function History(req, res){
  if(req.decoded.userId){
    mongoose.connect(constant.databaseUrl, function(err){
      if(err) console.log(err)
      else{
        model.historyModel.findOne({userId:req.decoded.userId},function(err, result){
          if(err) console.log(err)
          else{
            res.json({status:"ok", loginhistory:result.loginHistory, logoutHistory:result.logoutHistory});
          }
        })
      }
    })
  }
  else{
    res.json({status:"bad", login:"false"})
  }
}

function find(req, res){
  if(req.decoded.userId){
    let mode = "normal"
    mongoose.connect(constant.databaseUrl, function(err){
      if(err) console.log(err)
      else{
        model.detailModel.findOne({username:req.params.id}, function(err, doc){
          if (err) console.log(err)
          if (doc===null) res.json({status:"bad", isfound:false})
          else{
            if(req.session.user.data.mode!=="ghost" && req.session.user.data.username!==doc.username){
              model.seenModel.updateOne({userId:doc.userId},{$push:{seen:{username:req.session.user.data.username, date:Date.now()}}},function(err){
                if (err) console.log(err)
              })
            }
            res.json({status:"ok",
            idfound:true, 
            id:doc.userId, 
            username:doc.username, 
            fname:doc.fname, 
            lname:doc.lname, 
            position:doc.position,
            worksAt:doc.worksAt, 
            mode: doc.mode})
          }
        })
      }
    })
  }
  else{
    res.json({status:"bad", isLogin:false})
  }
}

function search(req, res){
  console.log(req.session)
  if(req.session.user){
    mongoose.connect(constant.databaseUrl,function(err){
      if (err) console.log(err)
      else if(req.query.position!==undefined && req.query.worksAt!==undefined){
        model.detailModel.find({position:String(req.query.position), worksAt:String(req.query.worksAt)}, function(err, doc){
          res.json(doc);
        })
      }
      else if(req.query.position!==undefined){
        model.detailModel.find({position:String(req.query.position)}, function(err, doc){
          res.json(doc);
        })
      }
      else if(req.query.worksAt!==undefined){
        model.detailModel.find({worksAt:req.query.worksAt}, function(err, doc){
          if (err) console.log(err)
          else res.json(doc)
        })
      }
      else{
        model.detailModel.find(function(err, doc){
          if (err) console.log(err)
          else res.json(doc)
        })
      }
    })
  }
  else {
    res.json({status:"Bad", islogin:false})
  }
}


module.exports = {History, find, search}