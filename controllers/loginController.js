const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const passport = require("passport");

function loginGet(req, res) {
    res.render("login");
}

// async function loginPost(req, res) {
//     // const { username, password } = req.body;
//     // const hashedPassword = await db.getHashedPassword(username);
//     // if (hashedPassword === null) {
//     //     return res.status(400).render("login", {
//     //         existingUsername: username,
//     //         existingPassword: password,
//     //         errorMsg: "Username not found"
//     //     })
//     // }
//     // const match = await bcrypt.compare(password, hashedPassword);
//     // if (!match) {
//     //     return res.status(400).render("login", {
//     //         existingUsername: username,
//     //         existingPassword: password,
//     //         errorMsg: "Password incorrect"
//     //     })
//     // }
//     // console.log("Success!");
//     // res.redirect("/");
//     passport.authenticate("local", {
//         successRedirect: "/",
//         failureRedriect: "/"
//     })
// }

function loginPost(req, res, next) {
  // execute authenticate middleware manually so we can control flow
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect("/login");           // failure path
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect("/");                        // success path
    });
  })(req, res, next); // <--- important: call the returned middleware with req,res,next
}

module.exports = {
    loginGet,
    loginPost
}