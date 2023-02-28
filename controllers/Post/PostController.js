
const Post = require("../../models/Post/Post");
const User = require("../../models/User/User");


const postCreateController = async (req, res) => {
    const { title, description   } = req.body;


    try {

// find user by id

        const artist = await User.findById(req.userAuth)  ;

        // create post
        const postCreate = await Post.create({
            title,
            description,
            user: artist._id,
        });

        // add post to user

        artist.posts.push(postCreate);

        // save user
        await artist.save();


        res.json({
            status: "success",
            data: postCreate ,

        });
    } catch (error) {
        console.log("AN ERROR OCCURED" );
        res.json(error.message);
        // console.log(error.message)
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

