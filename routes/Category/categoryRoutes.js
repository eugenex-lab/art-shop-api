const express = require("express");
const { categoryCreateController } = require("../../controllers/Category/CategoryController");
const { categoryDetailsController } = require("../../controllers/Category/CategoryController");
const { fetchCategoriesController } = require("../../controllers/Category/CategoryController");
const { categoryDelController } = require("../../controllers/Category/CategoryController");
const { categoryUpdateController } = require("../../controllers/Category/CategoryController");


const isLogin = require("../../middlewares/isLogin");
const {toggleLikesPostController} = require("../../controllers/Post/PostController");


const categoryRouter = express.Router();

// register users /api/v1/category/register

categoryRouter.post("/", isLogin , categoryCreateController);



// get single user /api/v1/category/profile/:id
categoryRouter.get("/:id", categoryDetailsController);

// get users /api/v1/category
categoryRouter.get("/", fetchCategoriesController);

// del users /api/v1/category/:id
categoryRouter.delete("/:id", categoryDelController);

// update users /api/v1/category/:id
categoryRouter.put("/:id", isLogin , categoryUpdateController);

// categoryRouter.get("/:id", isLogin , toggleLikesPostController);


module.exports = categoryRouter;