const jwt = require("jsonwebtoken");
const session = require('express-session')


const requireLogin = (req, res, next) => {
  const loggedin = req.session.user_id;
  
  if (!loggedin) {
    return res.status(401).redirect('/ident');
  }    
  next();
}

module.exports = requireLogin;