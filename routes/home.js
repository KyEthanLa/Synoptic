// var express = require('express');
// var router = express.Router();
// const fs = require('fs');

// const jobs = require('./job');


// /* GET home page. */
// router.get('/', function(req, res, next) {
//   let isAdmin = req.session.isAdmin;
//   let user = req.session.username;
//   let loggedIn = req.session.loggedIn;
//   let jobOptions = jobs.getJobListings();
//   if(!loggedIn){
//     res.redirect('/');
//   }
//   else{
//     res.render("home", { 
//       title: 'PMS-Home',
//       isAdmin,
//       user,
//       loggedIn,
//       jobs: jobOptions
//     });
//   }
// });

// router.post('/', (req, res, next)=>{
//   const email = req.body.email;
//   const password = req.body.password;
//   let userID = usermodel.getID(email, password);
//   if(userID > -1){
//     req.session.loggedIn = true;
//     req.session.username = usermodel.getUsername(userID);
//     req.session.isAdmin = usermodel.getAdminStatus(userID);
//     req.session.userID = userID;
//     console.log("Success");
//   }
//   else{
//     res.render('/', {error: true});
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const fs = require('fs');
const jobs = require('./job');

/* GET home page. */
router.get('/', (req, res, next) => {
  const { isAdmin, username: user, loggedIn } = req.session;
  const jobOptions = jobs.getJobListings();

  if (!loggedIn) {
    res.redirect('/');
  } else {
    res.render('home', { 
      title: 'PMS-Home',
      isAdmin,
      user,
      loggedIn,
      jobs: jobOptions
    });
  }
});

/* POST login route */
router.post('/', (req, res, next) => {
  const { email, password } = req.body;
  const userID = usermodel.getID(email, password);

  if (userID > -1) {
    req.session.loggedIn = true;
    req.session.username = usermodel.getUsername(userID);
    req.session.isAdmin = usermodel.getAdminStatus(userID);
    req.session.userID = userID;
    console.log('Success');
    res.redirect('/home');
  } else {
    res.render('index', { error: true });
  }
});

module.exports = router;
