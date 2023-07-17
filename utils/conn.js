const pg = require('pg');
const dbclient = new pg.Client({ user: 'sa', password: 'sa', host: '192.168.1.218', database: 'tasks', port: 5435 });

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