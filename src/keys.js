require('dotenv').config()

module.exports = {
    database: {
        host: 'localhost',
        user:'root',
        password: process.env.PASSWORD_KEY,
        port: 3306,
        database: 'database_links'
    }
}