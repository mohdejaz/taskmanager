var express = require('express');
var router = express.Router();

let getHandler = async function (req, res, next) {
  req.session.destroy(function(){
    console.log("User logged out");
  });
  res.redirect("/login")
};

/* GET home page. */
router.get('/logout', getHandler);

module.exports = router;
