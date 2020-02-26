const formidable = require('formidable');
const fs = require('fs');
const bcrypt = require('bcrypt')
const seen = require('../db-services/seen')
const history = require('../db-services/history')
const user = require('../db-services/user')
const detail = require('../db-services/detail')

const  createUser = async(req, res, next)=>{
  const hsh= await bcrypt.hash(req.body.password, 10)
  const data = await user.setUser({username:req.body.username, password:hsh} )
  .then(res => res)
  .catch(err => console.log(err))
  data?next():res.json({status:'bad', username:"invalid"})
}

const addDetail = async(req, res)=>{
  const doc = await user.getUser(req.body.username)
  const detailRes = await detail.setUserDetail({userId:doc._id, ...req.body})
  if(detailRes){
    await history.createHistory(doc._id);
    await seen.createSeen(doc._id)
    res.json({status:"ok"})
  }
  else{
    res.json({status:"bad"})
  }
}

function addImage(req, res){
  var form = new formidable.IncomingForm()
  form.parse(req, function(err, fields, files){
    if(err) console.log(err)
    var oldPath = files.file.path;
    dbImageLink = 'http://localhost:5000/image/'+req.decoded.userId+".jpg";
    var newPath = "./res/"+req.decoded.userId+".jpg";
    fs.rename(oldPath, newPath,function(err){
      err?res.json({status:"bad"}):res.json({Uploaded:"ok"})
    })
  })
}

module.exports = {createUser, addImage, addDetail};