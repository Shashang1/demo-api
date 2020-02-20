var mongoose = require('mongoose')
var constant = require('./app/constants')
var model = require('./models/models')
mongoose.connect(constant.databaseUrl, function(err){
  if (err) console.log(err)
  else{
    model.detailModel.find({position:"software traniee", worksAt:"Bestpeers"}, function(err, doc){
      console.log(doc);
    })
  }
})