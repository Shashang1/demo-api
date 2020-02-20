var express = require('express')
var app = express()
var session = require('express-session')
var route = require('./app/routes')

app.use(session({resave: true, saveUninitialized: true, secret: 'XCR3rsasa%RDHHH', cookie: { maxAge: 60000 }}))

app.get("/", function(req, res){
  res.json({status:"connected"})
})

route.declare(app);


app.listen(5000)



