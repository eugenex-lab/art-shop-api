const express = require("express");
const { postCreateController } = require("../../controllers/Post/PostController");
const { postController } = require("../../controllers/Post/PostController");
const { postsController } = require("../../controllers/Post/PostController");
const { postDelController } = require("../../controllers/Post/PostController");
const { postUpdateController } = require("../../controllers/Post/PostController");
const isLogin = require("../../middlewares/isLogin");


const postRouter = express.Router();

// register users /api/v1/post/register

postRouter.post("/", isLogin, postCreateController);

postRouter.get("/:id", postController);

// get users /api/v1/post

postRouter.get("/", postsController );

// del post

postRouter.delete("/:id", postDelController );

// update post

postRouter.put("/:id", postUpdateController);



module.exports = postRouter;