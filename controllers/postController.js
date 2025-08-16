const db = require("../db/queries");

function postGet (req, res) {
    if (res.locals.currentUser) {
        res.render("post");
    } else {
        res.redirect("/");
    }
    
}

async function postPost(req, res) {
    const { header, body } = req.body;
    const memberid = res.locals.currentUser.id;
    
    await db.postMessage(memberid, header, body);
    res.redirect("/");
}

async function deletePostGet(req, res) {
    const { messageId }= req.params;

    if (res.locals.currentUser) {
        if (res.locals.currentUser.isadmin) {
            db.deleteMessageById(messageId);
        }
    }
    
    res.redirect("/");
}

module.exports = {
    postGet,
    postPost,
    deletePostGet,

}