var mongoose = require('mongoose');
var constant = require('./constants')
var model = require('../models/models')

function History(req, res){

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

function find(req, res){  
  mongoose.connect(constant.databaseUrl, function(err){
    if(err) console.log(err)
    else{
      model.detailModel.findOne({userId:req.params.id}, function(err, doc){
        if (err) console.log(err)
        else if (doc===null) res.json({status:"bad", isfound:false})
        else{ 
          if(doc.mode==="ghost" && doc.userId!==req.decoded.userId){
            model.seenModel.updateOne({userId:req.params.id},
              {$push:{seen:{username:req.decoded.username,userId:req.decoded.userId,date:Date.now()}}},
              function(err){
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

function search(req, res){
  mongoose.connect(constant.databaseUrl,function(err){
    if (err) console.log(err)
    else if(req.query.position!=="All" && req.query.worksAt!=="All"){
      model.detailModel.find({position:String(req.query.position), worksAt:String(req.query.worksAt)}, function(err, doc){
        res.json(doc);
      })
    }
    else if(req.query.position!=="All"){
      model.detailModel.find({position:String(req.query.position)}, function(err, doc){
        res.json(doc);
      })
    }
    else if(req.query.worksAt!=="All"){
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

function seen (req,res){
  mongoose.connect(constant.databaseUrl, function(err){
    if (err) console.log(err)
    else {
      model.seenModel.findOne({userId:req.decoded.userId}, function(err, doc){
        if (err) console.log(err)
        else res.json(doc.seen)
      })
    }
  })
}


module.exports = {History, find, search, seen}