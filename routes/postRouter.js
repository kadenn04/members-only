const { Router } = require("express");
const postController = require("../controllers/postController");
const postRouter = Router();

postRouter.get("/", postController.postGet);
postRouter.post("/", postController.postPost);
postRouter.get("/delete/:messageId", postController.deletePostGet)

module.exports = postRouter;