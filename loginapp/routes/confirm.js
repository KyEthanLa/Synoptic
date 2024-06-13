var express = require('express');
var router = express.Router();

const jobs = require('../model/jobs');

/* GET payment page. */
router.get('/', function(req, res, next) {
  let isAdmin = req.session.isAdmin;
  let user = req.session.username;
  let loggedIn = req.session.loggedIn;
  let jobOptions = jobs.getJobInformation();
  ;
  if(!loggedIn){
    res.redirect('/');
  }
  else{
    res.render("confirm", { 
      title: 'PMS-Confirm',
      isAdmin,
      user,
      loggedIn,
      jobs: jobOptions
    });
  }
});

module.exports = router;