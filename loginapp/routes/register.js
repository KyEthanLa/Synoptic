var express = require('express');
var router = express.Router();
const usermodel = require('../model/users');

router.get('/', function(req, res, next) {

  if(req.session.loggedIn){
    res.redirect('/home');
  }
  else{
    res.render("register", { title:'PMS-Register'});
  }
});

router.post('/', (req, res, next)=>{
  const username = req.body.username;
  const phonenum = req.body.number;
  const email = req.body.email;
  const password = req.body.password;

  // var sql = "INSERT INTO users (Username, PhoneNumber, Email, UserPassword) VALUES ('" + username + "', '" + phonenum + "', '" + email + "', '" + password +"');";
  // connection.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("1 record inserted");
  // });
  let emailExist = usermodel.emailAlreadyExist(email);
  if(!emailExist){
    usermodel.createAccount(email, username, phonenum, password);
    res.render("register", { creationSuccess: true });
  }
  else{
    res.render("register", {emailError: true});
  }
});

module.exports = router;
