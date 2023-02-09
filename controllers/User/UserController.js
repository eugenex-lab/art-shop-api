const bycrypt = require("bcryptjs");
const User = require("../../models/User/User");

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

    const {email, password} = req.body;
    try {

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
            data: userFound //userFound
        });
    } catch (error) {
        res.json(error.message);
    }
}

//Get Single User Profile
const userController = async (req, res) => {
    // console.log(req.params.id);
    const {id} = req.params;
    try {
        const user = await User.findById(id);
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
            data: "users route !! "
        });
    } catch (error) {
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


module.exports = {
    userRegisterController,
    userLoginController,
    userController,
    usersController,
    userDelController,
    userUpdateController

}