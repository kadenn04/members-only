const pool = require("./pool");

async function insertUser(firstname, lastname, username, password, isadmin) {
    const SQL = `INSERT INTO members 
        (firstname, lastname, username, password, isadmin)
        VALUES ($1, $2, $3, $4, $5)`
    const values = [firstname, lastname, username, password, isadmin]
    await pool.query(SQL, values);
}

async function getHashedPassword(username) {
    const SQL = `SELECT * FROM members WHERE username = ($1)`
    const values = [username]
    const { rows } = await pool.query(SQL, values);
    if (rows.length !== 0) {
        return rows[0].password;
    } else {
        return null;
    }
}

async function getUserFromUsername(username) {
    const SQL = `SELECT * FROM members WHERE username = ($1)`
    const values = [username]
    const { rows } = await pool.query(SQL, values);
    return rows[0];
}

async function getUserFromId(id) {
    const SQL = `SELECT * FROM members WHERE id = ($1)`
    const values = [id]
    const { rows } = await pool.query(SQL, values);
    return rows[0];
}

async function postMessage(memberid, header, body) {
    const SQL = `INSERT INTO messages (memberid, header, body, date) VALUES ($1, $2, $3, $4)`;
    const values = [memberid, header, body, "now"];
    await pool.query(SQL, values);
}

async function getAllMessages() {
    const SQL = `SELECT 
    members.firstname, 
    members.lastname, 
    members.username, 
    messages.id,
    messages.header, 
    messages.body, 
    messages.date 
    FROM messages
    JOIN members
    ON members.id = messages.memberid`
    const values = [];
    const { rows } = await pool.query(SQL, values);
    return rows;
}

async function deleteMessageById(messageid) {
    const SQL = `
    DELETE FROM messages WHERE id = ($1)
    ` 
    const values = [messageid]
    const { rows } = await pool.query(SQL, values);
}

module.exports = {
    insertUser,
    getHashedPassword,
    getUserFromUsername,
    getUserFromId,
    postMessage,
    getAllMessages,
    deleteMessageById
}