const user = require('./db-services/user')
const seen = require('./db-services/seen')
const history = require('./db-services/history')
const detail = require('./db-services/detail')
const bcrypt = require('bcrypt')

exports.deleteUser = async(req, res) => {
  console.log(req.body)
  const doc = await user.getUser(req.body.username)
  await login(req.body.password, doc, res)
}

const login = async(password, doc, res) => {
  if(doc){
    console.log(password, doc.password)
    const result = await bcrypt.compare(password, doc.password)
    console.log(result)
    if(result){      
      console.log("started")
      await seen.deleteSeen(doc._id)
      await history.deleteHistory(doc._id)
      await detail.deleteUserDetails(doc._id)
      await user.deleteUser(doc.username)
      await res.json({status:"ok"})
    }
    else{
      res.json({status:'bad', msg:'invalid pass'})
    }
  }
  else {
    res.json({status:"bad", msg:"user not found"})
  }
}