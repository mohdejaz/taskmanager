const pg = require('pg');

const dbhost    = process.env.DBHOST || "localhost";
const dbname    = process.env.DBNAME || "tasks";
const dbport    = process.env.DBPORT || 5435;
const dbuser    = process.env.DBUSER || "sa";
const dbpass    = process.env.DBPASS || "sa";
const dbclient  = new pg.Client({ user: dbuser, password: dbpass, host: dbhost, database: dbname, port: dbport });

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