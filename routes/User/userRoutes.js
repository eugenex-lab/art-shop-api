const express = require("express");
const {userRegisterController} = require("../../controllers/User/UserController");
const {userLoginController} = require("../../controllers/User/UserController");
const {userController} = require("../../controllers/User/UserController");
const {usersController} = require("../../controllers/User/UserController");
const {userDelController} = require("../../controllers/User/UserController");
const {userUpdateController} = require("../../controllers/User/UserController");
const isLogin = require("../../middlewares/isLogin");
const {profilePhotoController} =  require("../../controllers/User/UserController");
const {profileViewerController} = require("../../controllers/User/UserController");
const  multer  = require("multer");
const userRouter = express.Router();
const storage = require("../../config/cloudinary");

// multer config instance

const upload = multer({
    storage: storage,
}

);


// register users /api/v1/users/register
userRouter.post('/register', userRegisterController);


// users Login /api/v1/users/login
userRouter.post('/login', userLoginController);

// get single user /api/v1/users/profile/:id
//below is if u pass dynamic id
// userRouter.get('/profile/:id', isLogin,userController);
userRouter.get('/profile/', isLogin,userController);

// get users /api/v1/users

userRouter.get('/', usersController
);


// del user /api/v1/users/:id

userRouter.delete('/:id', userDelController);

// update user /api/v1/users/:id

userRouter.put('/:id', userUpdateController
);


//GET profile view count /api/v1/users/profile/view-count/:id

userRouter.get('/profile-viewer/:id', isLogin ,  profileViewerController);

// profile photo upload /api/v1/users/profile/photo
userRouter.post('/profile-photo' ,
    isLogin,
    upload.single('profileImage'),
    profilePhotoController

);


module.exports = userRouter;