var mongoose = require('mongoose')
var models = require("./models/models")


mongoose.connect("mongodb://localhost:27017/linkdin",function(err){
  if(err) console.log(err)
  else {
      models.userModel.findOne({username:"Caption"}, function(err, res){
        if(err) console.log(err)
        else {
          var entry = new models.seenModel({userId:res._id, seen:[]})
          entry.save()
        } 
      })
  }
})



