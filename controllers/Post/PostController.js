// register post
const postCreateController = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "art work created successfully",
        });
    } catch (error) {
        res.json(error.message);
    }
};

const postController = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "art work Profile route !! ",
        });
    } catch (error) {
        res.json(error.message);
    }
};

const postsController = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "art work route !! ",
        });
    } catch (error) {
        res.json(error.message);
    }
}

const postDelController = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "art work deleted successfully",
        });
    } catch (error) {
        res.json(error.message);
    }
}

const postUpdateController = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "art work updated successfully",
        });
    } catch (error) {
        res.json(error.message);
    }
}





module.exports = {
    postCreateController,
    postController,
    postsController,
    postDelController,
    postUpdateController,
}

