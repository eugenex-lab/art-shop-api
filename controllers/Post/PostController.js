
const Post = require("../../models/Post/Post");
const User = require("../../models/User/User");
const {appErr} = require("../../utils/appErr");


const postCreateController = async (req, res , next ) => {
    const { title, description , category  } = req.body;


    try {

// find user by id

        const artist = await User.findById(req.userAuth)  ;

        const posts = await Post.find({}) ; // find all posts   // find all posts

        // details of post to be created

        // find category by name

        // check if user is blocked

        if(artist.isBlocked === true){
            return next(appErr("user is blocked", 403));
        }

        const titleFound = await Post.findOne({title});

        if (titleFound) {
            return next(appErr("post already exists", 400));
        }


        const postCreate = await Post.create({
            title,
            description,
            user: artist._id,
            category,
            photo : req && req.file && req.file.path

        });


        artist.posts.push(postCreate);

        // save user
        await artist.save();

        console.log("artist is blocked ---> " +  artist.isBlocked);


        res.json({
            status: "success",
            data: postCreate,

        });
    } catch (error) {
        console.log("AN ERROR OCCURED" );
        // res.json(error.message);
        return next(appErr(error.message, 404));
        // console.log(error.message)
    }
};

const fetchPostsController = async (req, res) => {
    try {


        //Find all posts
        const postts = await Post.find({})
            .populate("user")
            .populate("category", "title");


        // filter post to find user blocked

        //Check if the user is blocked by the post owner
        const filteredPosts = postts.filter(post => {
            //get all blocked users
            const blockedUsers = post.user.blocked
            const isBlocked = blockedUsers.includes(req.userAuth);

            // console.log("is blocked ---> " + isBlocked);

            // return isBlocked ? null : post;

            return !isBlocked;
            // return !isBlocked;
        });


        res.json({
            status: "success",
            data: filteredPosts,
        });
    } catch (error) {
        res.json(error.message);
        // return next(appErr(error.message, 404));
    }
}

const viewPostController = async (req, res , next ) => {
    try {

        const post = await Post.findById(req.params.id)

        //  CHECK number of views for post

        const isViewed = post.numberOfViews.includes(req.userAuth);

        if(!isViewed){
            post.numberOfViews.push(req.userAuth);
            await post.save();
        }





        res.json({
            status: "success",
            data: post,
        });
    } catch (error) {
        // res.json(error.message);
        return next(appErr(error.message, 404));
    }
};

const postsController = async (req, res, next ) => {
    try {
        res.json({
            status: "success",
            data: "art work route !! ",
        });
    } catch (error) {
        // res.json(error.message);
        return next(appErr(error.message, 404));
    }
}

const postDelController = async (req, res , next ) => {
    try {



        const post = await Post.findById(req.params.id);

        // get user id

        // const  userId = await User.findById(req.userAuth);
        if(!post){
            return next(appErr("post does not exist", 404));
        }
        // check if user is blocked

        if(post.user.isBlocked === true){
            return next(appErr("user is blocked", 403));
        }

        // check if user belong to post

        if(post.user.toString() !== req.userAuth){
            console.log("user not authorized" + req.userAuth.toString()
                + " %%%%%%%" + post.user);
            return next(appErr("user not authorized", 403));
        }

        // check if post exist




        await Post.findByIdAndDelete(req.params.id);

        res.json({
            status: "success",
            data: "post deleted successfully",
        });
    } catch (error) {
        return next(appErr(error.message, 404));
        // res.json(error.message);
    }
}

const postUpdateController = async (req, res, next ) => {

    const { title, description , category  } = req.body;


    try {
        const post = await Post.findById(req.params.id);

        // check if user is blocked

        if(post.user.isBlocked === true){
            return next(appErr("user is blocked", 403));
        }

        // check if user belong to post

        // if(post.user._id !== req.userAuth){
            if(post.user.toString() !== req.userAuth){
                console.log("user not authorized " + req.userAuth
                    + " %%%%%%%" + post.user.toString());

            return next(appErr("user not authorized", 403));
        }

        await Post.findByIdAndUpdate(req.params.id, {
            title,
            description,
            category,
            photo : req && req.file && req.file.path
            // photo : req && req.file && req.file.path
        },
{
    new: true,
}

        );

        res.json({
            status: "success",
            data: "post updated successfully",
        }
        );






    } catch (error) {
        return next(appErr(error.message, 404));
        // res.json(error.message);
    }
}

const toggleLikesPostController = async (req, res, next ) => {
    try {

        // get id
        const postId = await Post.findById(req.params.id);

        // check if user has liked the post

        const hasLiked = postId.numberOfLikes.includes(req.userAuth);

        // if user has liked the post

        if(hasLiked){

            postId.numberOfLikes = postId.numberOfLikes.filter  // remove the like
            (like => like.toString() !== req.userAuth.toString()); // remove the like

            await postId.save();

        }
        else {
            postId.numberOfLikes.push(req.userAuth);
            await postId.save();
        }

        // check if the post has been disliked by the user and remove it

        const hasDisLiked = postId.numberOfDislikes.includes(req.userAuth);

        if(hasDisLiked){
            postId.numberOfDislikes = postId.numberOfDislikes.filter   // remove the dislike
            (dislike => dislike.toString() !== req.userAuth.toString());  // remove the dislike

            // remove the dislike
            await postId.save();  // save the post
        }



        res.json({
            status: "success",
            data: postId,
        });
    } catch (error) {
        return next(appErr(error.message, 404));
        // res.json(error.message);
    }
}

const toggleDislikesPostController = async (req, res, next ) => {
    try {

        // get id
        const postId = await Post.findById(req.params.id);

        // check if user has ukliked the post

        const hasDisLiked = postId.numberOfDislikes.includes(req.userAuth);

        // if user has liked the post

        if(hasDisLiked){

            postId.numberOfDislikes = postId.numberOfDislikes.filter
            (dislike => dislike.toString() !== req.userAuth.toString());

            await postId.save();

        }
        else {
            postId.numberOfDislikes.push(req.userAuth);
            await postId.save();
        }

        // remove the like if the user has liked the post

        const hasLiked = postId.numberOfLikes.includes(req.userAuth);

        if(hasLiked){
            postId.numberOfLikes = postId.numberOfLikes.filter
            (like => like.toString() !== req.userAuth.toString());

            await postId.save();
        }



        res.json({
            status: "success",
            data: postId,
        });
    } catch (error) {

        return next(appErr(error.message, 404));

        // res.json(error.message);
    }
}




module.exports = {
    postCreateController,
    viewPostController,
    postsController,
    postDelController,
    postUpdateController,
    fetchPostsController,
    toggleLikesPostController,
    toggleDislikesPostController
}

