const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require('../models/user');

const session = require('express-session')
router.use(session({secret: 'notagoodsecret'}))


const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const {
    firstname,
    lastname,
    username,
    email,
    password
  } = req.body;
  try {
    let user = await User.findOne({
      email
    });
    if (user) {
      return res.status(400).json({
        msg: "User Already Exists"
      });
    }

    user = new User({
      username,
      password,
      firstname,
      lastname,
      email
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      "randomString", {
        expiresIn: 10000
      },
      (err, token) => {
        if (err) throw err;
        req.session.user_id = user._id;
        res.redirect('../dash');
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }
}


module.exports = signup;


