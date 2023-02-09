const express = require("express");
const { commentCreateController } = require("../../controllers/Comment/CommentController");
const { commentController } = require("../../controllers/Comment/CommentController");
const { commentsController } = require("../../controllers/Comment/CommentController");
const { commentDelController } = require("../../controllers/Comment/CommentController");
const { commentUpdateController } = require("../../controllers/Comment/CommentController");

const commentRouter = express.Router();

// register comment /api/v1/comment/register

commentRouter.post("/", commentCreateController);

// get single user /api/v1/comment/profile/:id

commentRouter.get("/:id", commentController);

// get users /api/v1/comment
commentRouter.get("/",  commentsController);

// del users /api/v1/comment/:id
commentRouter.delete("/:id", commentDelController);

// update users /api/v1/comment/:id

commentRouter.put("/:id", commentUpdateController);

module.exports = commentRouter;