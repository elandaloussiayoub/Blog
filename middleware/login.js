const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require('../models/user');

const session = require('express-session')
router.use(session({secret: 'notagoodsecret'}))



const login = async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const { username, password } = req.body;
  try {
    let user = await User.findOne({
      username
    });
    if (!user) {
      return res.status(400).json({
        message: "User Doesn't Exist"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Username Or Password Incorrect  !"
      });
    }

    req.session.user_id = user._id;
    res.redirect('../dash');
  
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = login;