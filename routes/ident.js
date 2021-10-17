const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require('../models/user');

const session = require('express-session')
router.use(session({secret: 'notagoodsecret'}))

const login  = require('../middleware/login');
const signup = require('../middleware/signup');
const logout = require('../middleware/logout');

// Get : identifaction 
router.get('/', (req, res) => {
  res.render('identification',{name:"identification"})
})  
// POST : Enregistrement
router.post('/signup',
  [
    check("firstname", "Please Enter a Valid First Name")
      .not()
      .isEmpty(),
    check("lastname", "Please Enter a Valid Last Name")
      .not()
      .isEmpty(),
    check("username", "Please Enter a Valid Username")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ], 
  signup
);

// POST : se connecter
router.post(
  '/login',
  [
    check("username", "Please Enter a Valid Username")
      .not()
      .isEmpty(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  login
);

// GET : Se deconnecter
router.get("/logout", logout);





module.exports = router;