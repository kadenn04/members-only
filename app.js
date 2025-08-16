const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require("./authenticators/loginAuthenticator");


const indexRouter = require("./routes/indexRouter");
const loginRouter = require("./routes/loginRouter");
const signupRouter = require("./routes/signupRouter");
const postRouter = require("./routes/postRouter");

const app = express(); 

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/post", postRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));