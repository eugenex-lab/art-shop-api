const commentCreateController = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "comment created successfully",
        });
    } catch (error) {
        res.json(error.message);
    }
}

const commentController = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "comment route !! ",
        });
    } catch (error) {
        res.json(error.message);
    }
}

const commentsController = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "comment route !! ",
        });
    } catch (error) {
        res.json(error.message);
    }
}

const commentDelController = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "comment deleted !! ",
        });
    } catch (error) {
        res.json(error.message);
    }
}

const commentUpdateController = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "comment updated !! ",
        });
    } catch (error) {
        res.json(error.message);
    }
}


module.exports = {
    commentCreateController,
    commentController,
    commentsController,
    commentDelController,
    commentUpdateController,
}
