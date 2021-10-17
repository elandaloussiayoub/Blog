const express = require("express");
const session = require('express-session')
const router = express.Router();
router.use(session({secret: 'notagoodsecret'}))

const logout = (req, res) => {
  // req.session.user_id = null ;
  req.session.destroy();
  res.redirect('../home');
}

module.exports = logout;