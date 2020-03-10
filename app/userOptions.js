var history = require('../db-services/history')
var detail = require('../db-services/detail')
var seen = require('../db-services/seen')

const History = async(req, res)=>{
  const result = await history.getUserHistory(req.decoded.userId, req.query.date)
  await res.json({status:'ok', loginhistory:result[0].login, logoutHistory:result[0].logout});
}

const find=async(req, res)=>{  
  const findDetail = await detail.getUserDetail(req.params.id)
  findDetail.mode==="ghost"?await seen.setSeen(findDetail.userId, req.decoded):null
  res.json({status:"ok", id:findDetail.userId, username:findDetail.username,fname:findDetail.fname,
    lname:findDetail.lname, position:findDetail.position, worksAt:findDetail.worksAt, 
    image:findDetail.image, mode:findDetail.mode
  })
}

const search= async(req, res)=>{
  if(req.query.position!=="All" && req.query.worksAt!=="All"){
    const result = await detail.getFilteredUser({position:req.query.position, worksAt:req.query.worksAt})
    res.json(result)
  }
  else if(req.query.position!=="All"){
    const result = await detail.getFilteredUser({position:req.query.position})
    res.json(result)
  }
  else if(req.query.worksAt!=="All"){
    const result = await detail.getFilteredUser({worksAt:req.query.worksAt})
    res.json(result)
  }
  else {
    const result = await detail.getFilteredUser();
    res.json(result)
  }
}

const profileSeen = async(req,res)=>{
  const result = await seen.getSeen(req.decoded.userId)
  res.json(result.seen)
}


module.exports = {History,find, search, profileSeen}