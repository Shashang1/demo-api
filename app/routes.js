var bodyParser = require('body-parser')
var auth = require('./auth')
var userOptions = require('./userOptions')
var urlencodedParser = bodyParser.urlencoded({extended:false})
var newmember = require('./newmember')
var cors = require('cors')
var express = require('express')

exports.declare = (app) =>{
  app.use(cors())
  app.use(express.json())
  app.post('/login', urlencodedParser, auth.login)
  app.get('/logout', auth.logout)
  app.get('/history', userOptions.History)
  app.get('/user/:id', userOptions.find)
  app.get('/search', userOptions.search)
  app.post('/signup',urlencodedParser, newmember.siginup)
  app.post('/signup/addImage', urlencodedParser, newmember.addImage)
}

