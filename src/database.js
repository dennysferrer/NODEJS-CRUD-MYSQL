const { createPool } = require('mysql2/promise');
const { database } = require('./keys');

const pool = createPool(database);

if (pool){
    console.log('DB connected ...');
} else {
    console.log('DB Error ...');
}

module.exports = pool;