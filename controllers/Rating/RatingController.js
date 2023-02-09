// Create a new Rating

const ratingCreateController = async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "rating registered successfully"
        });
    } catch (error) {
        res.json(error.message);
    }
}

const ratingController = async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "rating Profile route !! "
        });
    } catch (error) {
        res.json(error.message);
    }
}

const ratingsController = async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "rating route !! "
        });
    } catch (error) {
        res.json(error.message);
    }
}

const ratingDelController = async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "rating deleted successfully"
        });
    } catch (error) {
        res.json(error.message);
    }
}

const ratingUpdateController = async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "rating updated successfully"
        });
    } catch (error) {
        res.json(error.message);
    }
}





module.exports = {
    ratingCreateController,
    ratingController,
    ratingsController,
    ratingDelController,
    ratingUpdateController

}
