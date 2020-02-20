var mongoose = require('mongoose')
var models = require("./models/models")


mongoose.connect("mongodb://localhost:27017/linkdin",function(err){
  if(err) console.log(err)
  else {
      models.userModel.findOne({username:"test"}, function(err, result){
        if(err) console.log(err)
        else {
          console.log(typeof result._id)
          models.detailModel.findOne({userId:result._id}, function(err, ans){
            console.log(ans);
          })
        } 
      })
  }
})

