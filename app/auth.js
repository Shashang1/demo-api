var bcrypt = require('bcrypt')
var config = require('../config')
var jwt = require('jsonwebtoken')
var user = require('../db-services/user')
var history = require('../db-services/history')
var detail = require('../db-services/detail')


const login = async(req, res)=>{
  const userData = await user.getUser(req.body.username)
  const userDetail = userData?await detail.getUserDetail(userData._id):null
  userData?bcrypt.compare(req.body.password, userData.password, function(err,result){
    if(result){
      history.addUserLoginHistory(userData._id)
      let token = jwt.sign({userId:userDetail.userId, username:userDetail.username}, config.secret,{expiresIn:'1h'})
      res.json({status:"ok", token:token, data:userDetail})
    }
    else {
      res.json({status:"bad"})
    }
  }):res.json({status:"bad"})
}

const logout = async(req,res)=>{
  history.addUserLogoutHistory(req.decoded.userId)
  res.json({status:"ok"})
}


module.exports = {login, logout};