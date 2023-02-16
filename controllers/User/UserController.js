const bycrypt = require("bcryptjs");

const User = require("../../models/User/User");
const {appError,AppError} = require("../../utils/appError");

const generateToken = require("../../utils/generateToken");
const getTokenHeader = require("../../utils/getTokenHeader");

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
const userController = async (req, res) => {
    // console.log(req.params.id);

    console.log("Here is the header ---> " + req.headers);

    console.log("Here is the USER Auth ---> " + req.userAuth);

    const {id} = req.params;
    try {

        //get token from header

        const token = getTokenHeader(req);


        console.log(token);

        const user = await User.findById(req.userAuth);
        res.json({
            status: "success",
            data: user
        });
    } catch (error) {
        res.json(error.message);
    }
}

//Get All Users
const usersController = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "users route !! " ,

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
const userUpdateController = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "user updated successfully"
        });
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
            return next(appError("User not found", 403));
        }

        // check if the user is blocked

        if (userToUpdate.isBlocked) {
            return next(appError("User is blocked", 403));

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
            return next(appError("You cannot view your own profile", 403));
        }




        // check if the user profile viewed was found and
        // also the the user viewing if the user is found

        if (user && userViewer) {

            const isUserProfileAlreadyViewed = user.viewers.find(
                viewer => viewer.toString() === userViewer._id.toJSON()
            );

            if (isUserProfileAlreadyViewed){
                return next(appError("You have already viewed this profile", 403));
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


module.exports = {
    userRegisterController,
    userLoginController,
    userController,
    usersController,
    userDelController,
    userUpdateController,
    profilePhotoController,
    profileViewerController

}