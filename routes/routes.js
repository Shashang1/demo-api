const bodyParser = require('body-parser')
const auth = require('../app/auth')
const userOptions = require('../app/userOptions')
const urlencodedParser = bodyParser.urlencoded({extended:false})
const cors = require('cors')
const validator = require('../app/validator')
const newmember = require('../app/newmember')
const express = require('express')
const checkToken = require('../app/checkToken')
const {deleteUser} = require('../deleteUser')

exports.declare = (app) =>{
  app.use(cors())
  app.options('*', cors());
  app.use(express.json())
  app.post('/login',urlencodedParser,validator.loginValidatorArray, validator.loginValidator, auth.login)
  app.get('/logout', checkToken.validate, auth.logout)
  app.get('/history', checkToken.validate, userOptions.History)
  app.get('/user/:id', checkToken.validate, userOptions.find)
  app.get('/search', checkToken.validate, userOptions.search)
  app.get('/seen', checkToken.validate, userOptions.profileSeen) 
  app.post('/signup', urlencodedParser, validator.signupValidatorArray, validator.signupvalidator, newmember.createUser, newmember.addDetail)
  app.post('/signup/addImage',[checkToken.validate, urlencodedParser, newmember.addImage])
  app.delete('/deleteuser',urlencodedParser,deleteUser)
}

