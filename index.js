var express = require('express')
var app = express()
var route = require('./routes/routes')


console.log(process.env)
const MONGOURL = process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
"mongodb://localhost:27017/linkdin";
var mongoose = require('mongoose')
mongoose.set('useNewUrlParser',true)
mongoose.set('useFindAndModify',false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(MONGOURL).then(err =>console.log(err))

const port = process.env.PORT || 5000;

app.use('/image', express.static(__dirname +'/res')); 
app.get("/", function(req, res){
  res.json({status:"connected"})
})

route.declare(app);

app.listen(port, function(){
  console.debug("app is listening at port "+ port)
})  



