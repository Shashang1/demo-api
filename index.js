var express = require('express')
var app = express()
var route = require('./routes/routes')

const MONGOURL = process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
"mongodb+srv://khal:sashang@123@cluster0-4gte8.mongodb.net/linkdin?retryWrites=true&w=majority";
var mongoose = require('mongoose')
mongoose.set('useNewUrlParser',true)
mongoose.set('useFindAndModify',false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(MONGOURL).catch(err => err?console.log(err):console.log("connected"))

const port = process.env.PORT || 5000;

app.use('/image', express.static(__dirname +'/res')); 
app.get("/", function(req, res){
  res.json({status:"connected"})
})

route.declare(app);

app.listen(port, function(){
  console.debug("app is listening at port "+ port)
})  



