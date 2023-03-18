const express = require("express");
const storage = require("../../config/cloudinary");
const  multer  = require("multer");
const { postCreateController, fetchPostsController ,
    toggleLikesPostController,toggleDislikesPostController,
    viewPostController


} = require("../../controllers/Post/PostController");
const { postController } = require("../../controllers/Post/PostController");
const { postsController } = require("../../controllers/Post/PostController");
const { postDelController } = require("../../controllers/Post/PostController");
const { postUpdateController } = require("../../controllers/Post/PostController");
const isLogin = require("../../middlewares/isLogin");



const postRouter = express.Router();


const upload = multer ({ storage });



// register users /api/v1/post/register

postRouter.post("/", isLogin, upload.single('image'), postCreateController);

postRouter.get("/:id", isLogin, viewPostController);
// postRouter.get("/:id", isLogin, viewPostController);

// get users /api/v1/post

postRouter.put("/:id", isLogin,
     upload.single('image'),
    postUpdateController);


postRouter.get("/", isLogin , fetchPostsController );

// del post

postRouter.delete("/:id", isLogin ,  postDelController );

// update post

postRouter.get("/likes/:id", isLogin ,  toggleLikesPostController);

postRouter.get("/dislikes/:id", isLogin ,  toggleDislikesPostController);









module.exports = postRouter;