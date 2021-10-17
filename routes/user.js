const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const router = express.Router();

const User = require('../models/user');

const session = require('express-session')
router.use(session({secret: 'notagoodsecret'}))


router.get("/me", auth, async (rec, res) => {
  try {
    // request.user est recuperer du Middleware apres la token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({message: "Error In Fetching user"});
  }
});



module.exports = router;