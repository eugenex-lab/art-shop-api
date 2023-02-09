const categoryCreateController = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "category created successfully",
        });
    } catch (error) {
        res.json(error.message);
    }
}

const categoryController = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "category Profile route !! ",
        });
    } catch (error) {
        res.json(error.message);
    }
}

const categoriesController = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "category route !! ",
        });
    } catch (error) {
        res.json(error.message);
    }
}

const categoryDelController = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "category deleted !! ",
        });
    } catch (error) {
        res.json(error.message);
    }
}

const categoryUpdateController = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "category updated !! ",
        });
    } catch (error) {
        res.json(error.message);
    }
}

module.exports = {
    categoryCreateController,
    categoryController,
    categoriesController,
    categoryDelController,
    categoryUpdateController,
}




