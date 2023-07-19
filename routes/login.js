var express = require('express');
var router = express.Router();
var dbclient = require('../utils/conn');

let getHandler = async function (req, res, next) {
  res.render('login');
};

let postHandler = async function (req, res, next) {
  console.log("Inside post --" + JSON.stringify(req.body));
  let flag = false;
  if (req.body.login && req.body.password) {
    console.log("Authenticate user --");
    const res = await dbclient.query(
      "select id,password from Users where login = $1", [req.body.login]);
    console.log("rowCount: " + JSON.stringify(res.rows) + " --");
    if (res.rows.length > 0) {
      console.log("Found user --");
      if (res.rows[0].password === req.body.password) {
        console.log("Matched user --");
        req.session.user = req.body.login;
        req.session.userid = res.rows[0].id;
        flag = true;
      }
    }
  };
  if (!flag) res.redirect("/login");
  else res.redirect('/');
}

/* GET home page. */
router.get('/login', getHandler);
router.post('/login', postHandler);

module.exports = router;
