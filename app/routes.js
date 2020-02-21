var bodyParser = require('body-parser')
var auth = require('./auth')
var userOptions = require('./userOptions')
var urlencodedParser = bodyParser.urlencoded({extended:false})
var newmember = require('./newmember')
var cors = require('cors')
var express = require('express')
var checkToken = require('./checkToken')

exports.declare = (app) =>{
  app.use(cors())
  app.options('*', cors());
  app.use(express.json())
  app.post('/login', urlencodedParser, auth.login)
  app.get('/logout', checkToken.validate, auth.logout)
  app.get('/history', checkToken.validate, userOptions.History)
  app.get('/user/:id', checkToken.validate, userOptions.find)
  app.get('/search', checkToken.validate, userOptions.search)
  app.get('/seen', checkToken.validate, userOptions.seen) 
  app.post('/signup',urlencodedParser, newmember.createUser, newmember.addDetail)
  app.post('/signup/addImage', urlencodedParser, newmember.addImage)
}

