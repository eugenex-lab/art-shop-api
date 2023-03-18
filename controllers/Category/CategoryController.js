const {appErr} = require("../../utils/appErr");
const Category = require("../../models/Category/Category");
const categoryCreateController = async (req, res , next ) => {

    const {title, description} = req.body;

    try {

        const findCategory = await Category.findOne({title});

        if (findCategory) {
            return next(appErr("category already exists", 400));
        }



        const categoryCreate = await Category.create({
            title,
            description,
            user: req.userAuth

            //check if the user title is unique

        });


        res.json({
            status: "success",
            data: categoryCreate,
        });
    } catch (error) {

        return next(appErr(error.message, 404));
    }
}

const fetchCategoriesController = async (req, res, next) => {
    try {
        const categories = await Category.find();

        res.json({
            status: "success",
            data: categories,
        });
    } catch (error) {
        return next(appErr(error.message, 404));
    }
}

const categoryDetailsController = async (req, res, next ) => {
    try {
        const category = await Category.findById(req.params.id);


        if (category === null) {
            return next(appErr("category does not exist", 404));
        }

        res.json({
            status: "success",
            data: category,
        });
    } catch (error) {
        next(appErr(error.message, 404));
    }
}

const categoriesController = async (req, res , next ) => {

    const category = await Category.findById(req.params.id);

    try {
        res.json({
            status: "success",
            data: category,
        });
    } catch (error) {
        next(appErr(error.message, 404));
    }
}

const categoryDelController = async (req, res, next ) => {
    try {

        const category = await Category.findByIdAndDelete(req.params.id);

        if (category === null) {
            return next(appErr("category does not exist", 404));
        }

        // delete category from the user category

        await Category.findByIdAndDelete(req.params.id);  // delete category from the user category






        res.json({
            status: "success",
            data: "category has been deleted successfully",
            categories : category
        });
    } catch (error) {
        next(appErr(error.message, 404));
    }
}

const categoryUpdateController = async (req, res , next ) => {

    const {title} = req.body;

    try {
        const category = await Category.findById(req.params.id, {
            title
        }, {new: true , runValidators: true});

        // check if the category title is unique

        if (category === null) {
            return next(appErr("category does not exist", 404));
        }

        // check if the category title is unique

        if (category.title === title) {
            return next(appErr("category title already exists", 400));
        }

        // update category from the user category

        await Category.findByIdAndUpdate(req.params.id, {
            title
        }
        , {new: true , runValidators: true});





        res.json({
            status: "success",
            data: category,
        });
    } catch (error) {
        next(appErr(error.message, 404));
    }
}

module.exports = {
    categoryCreateController,
    categoryDetailsController,
    categoriesController,
    categoryDelController,
    categoryUpdateController,
    fetchCategoriesController
}




