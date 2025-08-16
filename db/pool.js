const { Pool } = require("pg");

module.exports = new Pool({
    host: "localhost",
    user: "knguy167",
    database: "members_only",
    password: "Cooper101!",
    port: 5432
})