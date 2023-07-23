var express = require('express');
var router = express.Router();
var dbclient = require('../utils/conn');
var dateUtil = require('date-format-utils');

let getHandler = async function (req, res, next) {
  console.log("id: " + req.params.id + " --");
  if (req.params.id) {
    console.log("Inside edit GET --");

    let groups = [];
    const result2 = await dbclient.query("select * from GROUPS");
    result2.rows.forEach((row) => {
      groups.push({ id: row.id, title: row.name });
    });

    let tasks = [];
    const result = await dbclient.query(
      "select t.id, t.name, t.state, u.login, g.name bucket from TASKS t"
      + " join Users u on u.id = t.user_id"
      + " join Groups g on g.id = t.grp_id"
      + " where t.id = $1",[req.params.id]);
    result.rows.forEach((row) => {
        tasks.push({ id: row.id, title: row.name, state: row.state, user: row.login, group: row.bucket, groups: groups });
    });

    console.log(tasks);

    res.render('edit', { tasks: tasks, id: req.params.id, user:req.session.user });
  } else {
    res.redirect("/");
  }
};

let postHandler = async function (req, res, next) {
  console.log("id: " + req.params.id + " --");
  console.log("body: " + JSON.stringify(req.body) + " --");
  let error;
  try {
    await dbclient.query("merge INTO GROUPS(name) KEY (name) values($1)", [req.body.group]);
    const res = await dbclient.query("select id from GROUPS where name=$1", [req.body.group]);
    if (res.rows) {
      console.log(JSON.stringify(res.rows));
      await dbclient.query("update TASKS set name=$1, grp_id=$2 where id=$3", [req.body.title, res.rows[0].id, req.params.id]);
    }
  } catch(err) {
    console.log(err);
    error = "Failed to create user, try different login id";
  }
  if (error) {
    res.render('error', {error: error});
  } else {
    res.redirect("/tasks");
  }
};

/* GET home page. */
router.get('/edit/:id', getHandler);
router.post('/edit/:id', postHandler);

module.exports = router;
