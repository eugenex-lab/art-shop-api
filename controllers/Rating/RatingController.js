// Create a new Rating

const {appErr} = require("../../utils/appErr");
const ratingCreateController = async(req, res , next ) => {
    try {
        res.json({
            status: "success",
            data: "rating registered successfully"
        });
    } catch (error) {
        // res.json(error.message);
        return next(appErr(error.message, 404));
    }
}

const ratingController = async(req, res , next ) => {
    try {
        res.json({
            status: "success",
            data: "rating Profile route !! "
        });
    } catch (error) {
        // res.json(error.message);
        return next(appErr(error.message, 404));
    }
}

const ratingsController = async(req, res , next ) => {
    try {
        res.json({
            status: "success",
            data: "rating route !! "
        });
    } catch (error) {
        // res.json(error.message);
        return next(appErr(error.message, 404));
    }
}

const ratingDelController = async(req, res , next ) => {
    try {
        res.json({
            status: "success",
            data: "rating deleted successfully"
        });
    } catch (error) {
        return next(appErr(error.message, 404));
        // res.json(error.message);
    }
}

const ratingUpdateController = async(req, res , next ) => {
    try {
        res.json({
            status: "success",
            data: "rating updated successfully"
        });
    } catch (error) {
        return next(appErr(error.message, 404));
        // res.json(error.message);
    }
}





module.exports = {
    ratingCreateController,
    ratingController,
    ratingsController,
    ratingDelController,
    ratingUpdateController

}
