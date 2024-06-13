var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let isAdmin = req.session.isAdmin;
  let user = req.session.username;
  let loggedIn = req.session.loggedIn;
  if(!loggedIn){
    res.redirect('/');
  }
  else{
    res.render("accountSettings", { 
      title: 'PMS-Settings',
      isAdmin,
      user,
      loggedIn
    });
  }
});

module.exports = router;
