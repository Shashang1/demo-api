var bodyParser = require('body-parser')
var auth = require('../app/auth')
var userOptions = require('../app/userOptions')
var urlencodedParser = bodyParser.urlencoded({extended:false})
// var newmember = require('../app/newmember')
var cors = require('cors')
var express = require('express')
var checkToken = require('../app/checkToken')

exports.declare = (app) =>{
  app.use(cors())
  app.options('*', cors());
  app.use(express.json())
  app.post('/login', urlencodedParser, auth.login)
  app.get('/logout', checkToken.validate, auth.logout)
  app.get('/history', checkToken.validate, userOptions.History)
  app.get('/user/:id', checkToken.validate, userOptions.find)
  app.get('/search', checkToken.validate, userOptions.search)
  app.get('/seen', checkToken.validate, userOptions.profileSeen) 
  // app.post('/signup',urlencodedParser, newmember.createUser, newmember.addDetail)
  // app.post('/signup/addImage',[checkToken.validate, urlencodedParser, newmember.addImage])
}

