var express = require('express');
var router = express.Router();
const usermodel = require('../model/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.loggedIn){
    res.redirect('/home');
  }
  else{
    res.render("index", { title:'PMS-Login'});
  }
});

router.post('/', (req, res, next)=>{
  console.log(req.body);
  const email = req.body.email;
  let password = req.body.password;
  let userID = usermodel.getID(email, password);
  if(userID > -1){
    req.session.loggedIn = true;
    req.session.username = usermodel.getUsername(userID);
    req.session.isAdmin = usermodel.getAdminStatus(userID);
    req.session.userID = userID;
    res.redirect('/home');
    console.log("Success");
  }
  else{
    res.render('', {error: true});
  }
});

module.exports = router;
