const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const bcrypt = require("bcryptjs");

function signupGet(req, res) {
    res.render("signup");
}

const validateUser = [
    body("firstname").trim()
    .notEmpty()
    .withMessage("First name can not be empty.")
    .isAlpha()
    .withMessage("First name must only contain alphabet letters."),
    body("lastname").trim()
    .notEmpty()
    .withMessage("Last name can not be empty.")
    .isAlpha()
    .withMessage("Last name must only contain alphabet letters."),
    body("username").trim()
    .notEmpty()
    .withMessage("Username can not be empty.")
    .isEmail()
    .withMessage("Username must be an email."),
    body("password").trim()
    .notEmpty()
    .withMessage("Password can not be empty"),
    body("confirmPassword")
    .custom((value, { req }) => {
        return value === req.body.password;
    }).withMessage("Passwords must match.")
]



async function addUserPost(req, res, next) {
    const errors = validationResult(req);
    const { firstname, lastname, username, password, confirmPassword, isadmin} = req.body;
    let admin;
    if (isadmin) {
            admin = true;
        } else {
            admin = false;
        }

    if (!errors.isEmpty()) {
        console.log("error found!");
        return res.status(400).render("signup", {
            existingFirstname: firstname,
            existingLastname: lastname,
            existingUsername: username,
            existingPassword: password,
            existingConfirmPassword: confirmPassword,
            errors: errors.array()
        })
    }
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.insertUser(firstname, lastname, username, hashedPassword, admin);
    } catch(err) {
        return next(err)
    }
    res.redirect("/");
}

const signupPost = [validateUser, addUserPost];

module.exports = {
    signupGet,
    signupPost
}