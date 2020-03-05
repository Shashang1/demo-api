var express = require('express')
var app = express()
var session = require('express-session')
var route = require('./routes/routes')
var mongoose = require('mongoose')
mongoose.set('useNewUrlParser',true)
mongoose.set('useFindAndModify',false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect("mongodb://localhost:27017/linkdin").then(console.log("Connected"))


app.use('/image', express.static(__dirname +'/res'));
app.get("/", function(req, res){
  res.json({status:"connected"})
})

route.declare(app);

app.listen(5000, function(){
  console.debug("app is listening at port 5000")
})  



