const pg = require('pg');
// 8435 - dev
// 5435 - prod
const dbclient = new pg.Client({ user: 'sa', password: 'sa', host: 'localhost', database: 'tasks', port: 8435 });

console.log("Connecting to db --");

dbclient.connect()
    .then(function () {
        console.log("Connected --");
    })
    .catch(function () {
        console.log("Failed --");
        process.exit(1);
    });

module.exports = dbclient;