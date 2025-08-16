const db = require("../db/queries");

function cleanMessages(messages) {
    for (let i=0; i<messages.length; i++) {
        messages[i].date = messages[i].date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
    }
}

async function indexGet(req, res) {
    const messages = await db.getAllMessages();
    cleanMessages(messages);
    console.log(messages);
    res.render("index", {messages});
}

module.exports = {
    indexGet
}