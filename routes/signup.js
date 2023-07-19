var express = require('express');
var router = express.Router();
var dbclient = require('../utils/conn');

let getHandler = async function (req, res, next) {
  res.render('signup');
};

let postHandler = async function (req, res, next) {
  console.log("Inside post --" + JSON.stringify(req.body));
  let error;
  if (req.body.firstName && req.body.lastName && req.body.login && req.body.password) {
    console.log("Create user --");
    try {
      const res = await dbclient.query(
        "insert into Users (first_name, last_name, login, password) values ($1, $2, $3, $4)",
        [req.body.firstName, req.body.lastName, req.body.login, req.body.password]);
    } catch(err) {
      console.log(err);
      error = "Failed to create user, try different login id";
    }
  };
  if (error) {
    res.render('signup', {error: error});
  } else {
    res.redirect('/');
  }
}

/* GET home page. */
router.get('/signup', getHandler);
router.post('/signup', postHandler);

module.exports = router;
