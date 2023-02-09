const express = require("express");
const { categoryCreateController } = require("../../controllers/Category/CategoryController");
const { categoryController } = require("../../controllers/Category/CategoryController");
const { categoriesController } = require("../../controllers/Category/CategoryController");
const { categoryDelController } = require("../../controllers/Category/CategoryController");
const { categoryUpdateController } = require("../../controllers/Category/CategoryController");

const categoryRouter = express.Router();

// register users /api/v1/category/register

categoryRouter.post("/", categoryCreateController);



// get single user /api/v1/category/profile/:id
categoryRouter.get("/:id", categoryController);

// get users /api/v1/category
categoryRouter.get("/", categoriesController);

// del users /api/v1/category/:id
categoryRouter.delete("/:id", categoryDelController);

// update users /api/v1/category/:id
categoryRouter.put("/:id", categoryUpdateController);


module.exports = categoryRouter;