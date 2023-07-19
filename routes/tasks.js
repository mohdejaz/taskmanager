var express = require('express');
var router = express.Router();
var dbclient = require('../utils/conn');
var dateUtil = require('date-format-utils');

let getHandler = async function (req, res, next) {
  let tasks = [];
  // let dateFmt = dateUtil.formatDate(new Date(),'yyyy-MM-dd');
  console.log('Calling query --');
  const result = await dbclient.query(
    "select t.id, t.name, t.state, u.login, g.name bucket from TASKS t"
    + " join Users u on u.id = t.user_id"
    + " join Groups g on g.id = t.grp_id"
    + " where state = 'R' and u.login = $1",[req.session.user]);
  result.rows.forEach((row) => {
    // console.log(JSON.stringify(row));  
    // let run_date = dateUtil.formatDate(new Date(row.run_date), 'dd MMM');
    tasks.push({ id: row.id, title: row.name, state: row.state, user: row.login, group: row.bucket });
  });
  // console.log(tasks);
  res.render('tasks', { tasks: tasks, user:req.session.user });
};

let postHandler = async function (req, res, next) {
  if (req.body.task) {
    const res = await dbclient.query("insert into TASKS(name, user_id) values ($1, $2)", [req.body.task, req.session.userid]);
  }
  else if (req.body.delete) {
    if (req.body.selected) {
      if (req.body.selected.constructor === Array) {
        for (const task_id of req.body.selected) {
          const res = await dbclient.query("delete from TASKS where id = $1", [task_id]);
        }
      } else {
        const res = await dbclient.query("delete from TASKS where id = $1", [req.body.selected]);
      }
    }
  }
  else if (req.body.abort) {
    if (req.body.selected) {
      if (req.body.selected.constructor === Array) {
        for (const task_id of req.body.selected) {
          const res = await dbclient.query(
            "update TASKS set state = 'A', update_ts = current_timestamp() where id = $1",
            [task_id]);
        }
      } else {
        const res = await dbclient.query(
          "update TASKS set state = 'A', update_ts = current_timestamp() where id = $1",
          [req.body.selected]);
      }
    }
  }
  else if (req.body.done) {
    if (req.body.selected) {
      if (req.body.selected.constructor === Array) {
        for (const task_id of req.body.selected) {
          const res = await dbclient.query(
            "update TASKS set state = 'D', update_ts = current_timestamp() where id = $1",
            [task_id]);
        }
      } else {
        const res = await dbclient.query(
          "update TASKS set state = 'D', update_ts = current_timestamp() where id = $1",
          [req.body.selected]);
      }
    }
  }

  res.redirect("/tasks");
};

/* GET home page. */
router.get('/tasks', getHandler);
router.post('/tasks', postHandler);

module.exports = router;
