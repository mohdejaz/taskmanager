var express = require('express');
var router = express.Router();
var dbclient = require('../utils/conn');
var dateUtil = require('date-format-utils');

let getHandler = async function (req, res, next) {
  let tasks = [];
  const result = await dbclient.query("select * from TASKS where state = 'B'");
  result.rows.forEach((row) => {
    console.log(JSON.stringify(row));  
    let run_date = dateUtil.formatDate(new Date(row.run_date),'dd MMM');
    tasks.push({ id: row.id, title: row.name, run_date:run_date, state:row.state });
  });
  // console.log(tasks);
  res.render('backlog', { tasks: tasks });
};

let postHandler = async function (req, res, next) {
  console.log(req.body);
  if (req.body.run) {
    if (req.body.selected) {
      if (req.body.selected.constructor === Array) {
        for (const task_id of req.body.selected) {
          const res = await dbclient.query("update TASKS set state = 'R' where id = $1", [task_id]);
        }
      } else {
        const res = await dbclient.query("update TASKS set state = 'R' where id = $1", [req.body.selected]);
      }
    }
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
          const res = await dbclient.query("update TASKS set state = 'A' where id = $1", [task_id]);
        }
      } else {
        const res = await dbclient.query("update TASKS set state = 'A' where id = $1", [req.body.selected]);
      }
    }
  }
  else if (req.body.done) {
    if (req.body.selected) {
      if (req.body.selected.constructor === Array) {
        for (const task_id of req.body.selected) {
          const res = await dbclient.query("update TASKS set state = 'A' where id = $1", [task_id]);
        }
      } else {
        const res = await dbclient.query("update TASKS set state = 'A' where id = $1", [req.body.selected]);
      }
    }
  }
  else if (req.body.move) {
    if (req.body.selected && req.body.cfdate) {
      if (req.body.selected.constructor === Array) {
        for (const task_id of req.body.selected) {
          const res = await dbclient.query("update TASKS set run_date = $1 where id = $2", [req.body.cfdate, task_id]);
        }
      } else {
        const res = await dbclient.query("update TASKS set run_date = $1 where id = $2", [req.body.cfdate, req.body.selected]);
      }
    }
  }

  getHandler(req, res, next);
};

/* GET home page. */
router.get('/backlog', getHandler);
router.post('/backlog', postHandler);

module.exports = router;
