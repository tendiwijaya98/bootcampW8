const {Pool} = require("pg")

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "dvdrental",
    password: "Bintang2*",
    port: 5432
})

module.exports = pool;