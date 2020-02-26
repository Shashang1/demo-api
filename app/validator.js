const {check ,validationResult} = require('express-validator')

exports.loginValidatorArray = [
  check("username").isLength({min:4}).withMessage("username must be greater than 3 character"),
  check("password").isLength({min:8}).withMessage("password must be long than 8")
]

exports.loginValidator=(req,res,next)=>{
  const err = validationResult(req)
  err.isEmpty()?next():res.json({status:'bad',msg:"username password are of invalid character"})
} 

exports.signupValidatorArray = [
  check("username").isLength({min:4}),
  check("password").isLength({min:8}),
  check('fname').not().isEmpty(),
  check('lname').not().isEmpty(),
  check('mode').not().equals("none"),
  check('position').not().equals("none"),
  check('worksAt').not().equals("none")
]

exports.signupvalidator = (req,res,next)=> {
  const err = validationResult(req)
  err.isEmpty()?next():res.json({status:"bad", msg:"Invalid Inputs"})
}
