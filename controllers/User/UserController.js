const bycrypt = require("bcryptjs");

const User = require("../../models/User/User");
const {appErr,AppErr} = require("../../utils/appErr");

const generateToken = require("../../utils/generateToken");
const getTokenHeader = require("../../utils/getTokenHeader");

const commentmodel = require("../../models/Comment/Comment");
const categorymodel = require("../../models/Category/Category");
const postmodel = require("../../models/Post/Post");



//Register User
const userRegisterController = async (req, res) => {
    console.log(req.body);
    const {firstname, lastname, email, profileImage, password} = req.body;
    try {

        const userFound = await User.findOne({email});
        if (userFound) {
            return res.json({
                message: "User already exists"
            }
            );
        }
        // hash password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);

        // create user
        const user = await User.create({
            firstname,
            lastname,
            email,
            profileImage,
            password: hashedPassword
        });

        res.json({
            status: "success",
            data: user
        });
    } catch (error) {
        res.json(error.message);
    }
}


//Login User
const userLoginController = async (req, res) => {

    console.log("Here is the header ---> ");

    const {email, password} = req.body;
    try {

        console.log("Here is the header ---> ");

        const userFound = await User.findOne({email});

        if (!userFound) {
            return res.json({
                    message: "Wrong login credentials"
                }
            );
        }

        const isPasswordMatch = await bycrypt.compare(password, userFound.password);



        if (!isPasswordMatch) {
            return res.json({
                message: "Wrong login credentials"
            }
            );
        }

        // const userFound = await User.findOne({email});
        // if (!userFound) {
        //     return res.json({
        //         message:        "Wrong login credentials"
        //     }
        //     );
        // }
        // // check password
        // const userPassword = await User.findOne({password});
        //
        // if (!userPassword) {
        //     return res.json({
        //         message:   "Wrong login credentials"
        //     }
        //     );
        // }

        res.json({
            status: "success",
            data: {
                firstName: userFound.firstname,
                lastName: userFound.lastname,
                email: userFound.email,
                isAdmin: userFound.isAdmin,
                token: generateToken(userFound._id),
                userId: userFound._id /// Please remove this line before deployment
            } //userFound
        });
    } catch (error) {
        console.log(error.message);
        res.json(error.message);
    }
}

//Get Single User Profile
const userController = async (req, res, next) => {


    // const {id} = req.params;
    try {

        //get token from header

        // const token = getTokenHeader(req);


        // console.log(token);

        const user = await User.findById(req.userAuth)


        // to to populate the user posts
        //
        //     .populate({
        //     path: "posts",
        // });
        //

        res.json({
            status: "success",
            data: user
        });
    } catch (error) {
    next(error.message);
    }
}

//Get All Users
const usersController = async (req, res) => {
    try {

        const users = await User.find();

        res.json({
            status: "success",
            data: users

        });
    } catch (error) {
        console.log("something went wrong");
        res.json(error.message);
    }
}

//Delete User
const userDelController = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "user deleted successfully"
        });
    } catch (error) {
        res.json(error.message);
    }

}

//Update User
const userUpdateController = async (req, res , next ) => {

    const {firstname, lastname, email} = req.body;

    try {

        if (email){

            const emailTakenCheck = await  User.findOne({email});

            if (emailTakenCheck){
                return next( new appErr("Email already taken", 403));
            }

        }


        // find user to be updated

        const userToUpdate = await User.findByIdAndUpdate(req.userAuth  ,
            {
                firstname,
                lastname,
                email
            },

            {
                new: true,
                runValidators: true
            }
        );   // find user by id


        //s



        res.json({
            status: "success",
            data: userToUpdate
        });
    } catch (error) {
        res.json(error.message);
    }
}


//Update Password
const userUpdatePasswordController = async (req, res , next ) => {

    const {password , confirmPassword} = req.body;

    try {

        // check if password and confirm password match

        if (password !== confirmPassword){
            return next(new appErr("Password and confirm password do not match ", 403));
        }

        // hash password

        if(password){
            const salt = await bycrypt.genSalt(10);
            const hashedPassword = await bycrypt.hash(password, salt);

            // update password
            await User.findByIdAndUpdate(req.userAuth, {password: hashedPassword} ,
                {
                    new: true,
                    runValidators: true
                }
            );
            res.json({
                status: "success",
                data: "user password updated successfully"
            });
        }else {
            return next(new appErr("Password is required", 403));
        }


    } catch (error) {
        res.json(error.message);
    }
}

// profile photo upload
const profilePhotoController = async (req, res, next) => {

    // access the file from req.file
    // console.log("user file uploadeded" + req.file);



    try {

        // find user to be updated

        const userToUpdate = await User.findById(req.userAuth);   // find user by id


        // check if user exists


        if (!userToUpdate) {
            return next(appErr("User not found", 403));
        }

        // check if the user is blocked

        if (userToUpdate.isBlocked) {
            return next(appErr("User is blocked", 403));

        }

        // check if the user is the owner of the profile

        if (req.file) {
            await User.findByIdAndUpdate(req.userAuth, {
                    $set: {
                        profileImage: req.file.path
                    }
                    ,

                },
                {
                    new: true,
                }
            );
            res.json({
                    status: "success",
                    data: "profile photo uploaded"
                }
            );

        }

    }
            catch (error) {
        console.log("Error uploading file");

        next(appError(error.message, 500));

    }
}
//
const profileViewerController = async (req, res, next) => {
    try {

        // find user the id of the user to be viewed

        const user = await User.findById(req.params.id); //

        // check the user who is viewing the profile

        const userViewer = await User.findById(req.userAuth); //

        // check if the user is viewing his own profile

        if (userViewer._id.toJSON() === user._id.toJSON()) {
            return next(new appErr("You cannot view your own profile", 403));
        }




        // check if the user profile viewed was found and
        // also the the user viewing if the user is found

        if (user && userViewer) {

            const isUserProfileAlreadyViewed = user.viewers.find(
                viewer => viewer.toString() === userViewer._id.toJSON()
            );

            if (isUserProfileAlreadyViewed){
                return next(new Error("user profile has been viewed already", 403));
            }
            else {

            // push the userWHO is viewing
            // the profile to the viewers array

            user.viewers.push(userViewer._id);


            // save the user profile
            await user.save();

            res.json({
                status: "success",
                data: "profile viewed successfully "
            }
        );
        }
        }

    }
        catch (error) {
        res.json(error.message);
    }
}



//following ANOTHER USER PROFILE
const userFollowingController = async (req, res, next) => {
    try {
        // find user to be updated
        const userWhoFollowed = await User.findById(req.userAuth);   // find user by id
        // check if usser to be fllowed exists
        const userToFollow = await User.findById(req.params.id);   // find user by id

        if (userWhoFollowed && userToFollow ) {

            const isUserAlreadyFollowed = userToFollow.following.find(
                follower => follower.toString() === userWhoFollowed._id.toString()
            );

            if (isUserAlreadyFollowed){
                return next(appErr("You have already followed this user"));
            }

            else {

                    // push the userWHO is following
                    // the profile to the following array

                    userToFollow.following.push(userWhoFollowed._id);
                    userWhoFollowed.followers.push(userToFollow._id);

                    // save the user profile

                    await userToFollow.save();
                    await userWhoFollowed.save();

                    res.json({
                        status: "success",
                        data: "user followed successfully "
                    }
                );
            }

        }

    } catch (error) {
        res.json(error.message);
    }
}

// UNFOLLOW A USER PROFILE

const userUnFollowingController = async (req, res, next) => {

    try {
        // find user to be updated
        const userWhoUnFollowed = await User.findById(req.userAuth);   // find user by id
        // check if usser to be fllowed exists
        const userToUnFollow = await User.findById(req.params.id);   // find user by id

        if (userWhoUnFollowed && userToUnFollow ) {

            const isUserAlreadyFollowed = userToUnFollow.following.find(
                follower => follower.toString() === userWhoUnFollowed._id.toString()
            );

            if (!isUserAlreadyFollowed){
                return next(appErr("You have not followed this user"));
            }

            else {

                    // push the userWHO is following
                    // the profile to the following array

                    userToUnFollow.following.pull(userWhoUnFollowed._id);
                    userWhoUnFollowed.followers.pull(userToUnFollow._id);

                    // save the user profile

                    await userToUnFollow.save();
                    await userWhoUnFollowed.save();

                    res.json({
                        status: "success",
                        data: "user unfollowed successfully "
                    }
                );
            }

        }

    } catch (error) {
        res.json(error.message);
    }
}

// Block a user profile
const userBlockedController = async (req, res , next ) => {
    try {

        // find the user to be blocked
        const userToBeBlocked = await User.findById(req.params.id);

// check if the user to be blocked exists
        const userWhoBlocked = await User.findById(req.userAuth);

        if(userToBeBlocked && userWhoBlocked) {

                const isUserAlreadyBlocked = userWhoBlocked.blocked.find(
                    blocked => blocked.toString() === userToBeBlocked._id.toString()
                );

                if (isUserAlreadyBlocked){
                    return next(appErr("You have already blocked this user"));
                }

                else {

                    // push the userWHO is following
                    // the profile to the following array

                    userWhoBlocked.blocked.push(userToBeBlocked._id);

                    // save the user profile

                    await userWhoBlocked.save();

                    res.json({
                        status: "success",
                        data: "user blocked successfully "
                    }
                );
                }
        }
    } catch (error) {
        console.log("something went wrong");
        res.json(error.message);
    }
}

// unblock a user profile

const userUnblockedController = async (req, res, next) => {
    try {

        // find the user to be unblocked
        const userToBeUnblocked = await User.findById(req.params.id);

        // check if the user to be unblocked exists
        const userWhoUnblocked = await User.findById(req.userAuth);

        if(userToBeUnblocked && userWhoUnblocked) {

            const isUserAlreadyBlocked = userWhoUnblocked.blocked.find(
                blocked => blocked.toString() === userToBeUnblocked._id.toString()
            );

            if (!isUserAlreadyBlocked){

                // return error with new error message

                return  new Error("You have not blocked this user");
            }

            else {

                // push the userWHO is following
                // the profile to the following array

                userWhoUnblocked.blocked.pull(userToBeUnblocked._id);

                // save the user profile

                await userWhoUnblocked.save();

                res.json({
                    status: "success",
                    data: "user unblocked successfully "
                });

            }
}
    } catch (error) {
        console.log("something went wrong");
        res.json(error.message);
    }

}


//Admin blockin a user profile

const adminBlockedController = async (req, res, next ) => {
    try {

        // find the user to be blocked
        const userToBeBlocked = await User.findById(req.params.id);


        if(!userToBeBlocked) {
            return next(appErr("User does not exist"));
        }

        // if user has already been unblocked by admin
        if(userToBeBlocked.isBlocked) {
            return next(appErr("User has already been blocked"));
        }


        // check if user exists and is an admin

        // const admin = await User.findById(req.userAuth);

        // if(!admin.isAdmin) {
        //     return next(appErr("You are not an admin"));
        // }





        userToBeBlocked.isBlocked = true;

        await userToBeBlocked.save();


        res.json({
            status: "success",
            data: "Admin blocked a user successfully "

        });
    } catch (error) {
        console.log("something went wrong");
        res.json(error.message);
    }
}


const adminUnblockedController = async (req, res, next ) => {
    try {

        // find the user to be blocked
        const userToBeUnblocked = await User.findById(req.params.id);


        if(!userToBeUnblocked) {
            return next(appErr("User does not exist" , 400));
        }


        // check if user has been unblocked by admin

        if(!userToBeUnblocked.isBlocked) {
return next(new appErr("User has already been unblocked by admin, or was never blocked" , 400));


        }



        userToBeUnblocked.isBlocked = false;

        await userToBeUnblocked.save();


        res.json({
            status: "success",
            data: "Admin unblocked a user successfully "

        });
    } catch (error) {
        console.log("something went wrong");
        res.json(error.message);

       return  next(error);
    }
}


const deleteAccountController = async (req, res, next) => {
    try {
        const user = await User.findById(req.userAuth);

        if(!user) {
            return next(new appErr("User does not exist"));
        }


        await postmodel.deleteMany({user:req.userAuth });
        await commentmodel.deleteMany({user: req.userAuth});
        await categorymodel.deleteMany({user:req.userAuth});

        await user.remove();




        // await user.remove();

        res.json({
            status: "success",
            data: "User deleted successfully"
        });
    } catch (error) {
        console.log("something went wrong");
        res.json(error.message);
    }
}



module.exports = {
    userRegisterController,
    userLoginController,
    userController,
    usersController,
    userDelController,
    userUpdateController,
    profilePhotoController,
    profileViewerController,
    userFollowingController,
    userUnFollowingController,
    userBlockedController,
    userUnblockedController,
    adminBlockedController,
    adminUnblockedController,
    userUpdatePasswordController,
    deleteAccountController

}