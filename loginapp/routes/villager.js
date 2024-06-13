const express = require('express')
const router = express.Router()

const villagermodel = require('../model/villager');

router.get('/', function(req, res, next) {
    let isAdmin = req.session.isAdmin;
    let user = req.session.username;
    let loggedIn = req.session.loggedIn;
    let villagers = villagermodel.getVillagers();
    if(!loggedIn){
      res.redirect('/');
    }
    else{
      res.render("villager", { 
        title: 'PMS-Admin Users',
        isAdmin,
        user,
        loggedIn,
        villagerList: villagers
      });
    }
  });

module.exports = router