const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const db = require("../db/queries");
const bcrypt = require("bcryptjs");

passport.use(
    new LocalStrategy( async (username, password, done) => {
        try {
            console.log("here?");
            const user = await db.getUserFromUsername(username)
        
        if (!user) {
            console.log("Incorrect username!");
            return done(null, false, { message: "Incorrect username"});
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            console.log("Incorrect password!");
            return done(null, false, {message: "Incorrect password"});
        }

        console.log("Success!");
        return done(null, user);
        
    } catch(err) {
        return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async(id, done) => {
    try {
        const user = await db.getUserFromId(id);
        done(null, user);
    } catch(err) {
        done(err);
    }
})

module.exports = passport;