const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", indexController.indexGet);

indexRouter.get("/logout", (req, res, next) => {
    req.logout((err => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    }))
})



module.exports = indexRouter;