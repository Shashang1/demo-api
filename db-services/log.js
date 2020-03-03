const logModel = require('../models/logModel')

exports.getLogs = () =>{
  return logModel.find()
}

exports.addLog = (Log) =>{
  return logModel.update({},{$push:{log:{$each:[Log], $position:0}}})
}