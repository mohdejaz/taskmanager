var express = require('express');
var router = express.Router();
var dbclient = require('../utils/conn');

let getHandler = async function (req, res, next) {
  console.log("req.session --" + JSON.stringify(req.session));
  if (req.session.user) {
    res.redirect("/tasks");
  } 
  else {
    res.render('index',{user:req.session.user});
  }
};

router.get('/', getHandler);

module.exports = router;
