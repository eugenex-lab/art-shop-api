const express = require("express");
const {userRegisterController} = require("../../controllers/User/UserController");
const {userLoginController} = require("../../controllers/User/UserController");
const {userController} = require("../../controllers/User/UserController");
const {usersController} = require("../../controllers/User/UserController");
const {userDelController} = require("../../controllers/User/UserController");
const {userUpdateController} = require("../../controllers/User/UserController");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const {profilePhotoController} =  require("../../controllers/User/UserController");
const {profileViewerController} = require("../../controllers/User/UserController");
const {userFollowingController} = require("../../controllers/User/UserController");
const {userUnFollowingController} = require("../../controllers/User/UserController");
const {userBlockedController} = require("../../controllers/User/UserController");
const {userUnblockedController} = require("../../controllers/User/UserController");
const {adminBlockedController} = require("../../controllers/User/UserController");
const {adminUnblockedController} = require("../../controllers/User/UserController");
const {userUpdatePasswordController} = require("../../controllers/User/UserController");
const {deleteAccountController} = require("../../controllers/User/UserController");


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

// userRouter.delete('/:id', userDelController);

// update user /api/v1/users/:id

userRouter.put('/', isLogin, userUpdateController
);

// password update /api/v1/users/password/:ids

userRouter.put('/update-password', isLogin, userUpdatePasswordController
);

// following /api/v1/users/following/:id
userRouter.get('/following/:id', isLogin , userFollowingController);

// unfollowing /api/v1/users/unfollowing/:id
userRouter.get('/unfollowing/:id', isLogin , userUnFollowingController);

// block user /api/v1/users/block/:id
userRouter.get('/blocked/:id', isLogin , userBlockedController);


// unblock user /api/v1/users/unblock/:id
userRouter.get('/unblocked/:id', isLogin , userUnblockedController);

// admin block user /api/v1/users/admin-block/:id
userRouter.put('/admin-blocked/:id', isLogin  , adminBlockedController);

// admin unblock user /api/v1/users/admin-unblock/:id
userRouter.put('/admin-unblocked/:id', isLogin  , adminUnblockedController);

//GET profile view count /api/v1/users/profile/view-count/:id

userRouter.get('/profile-viewer/:id', isLogin ,  profileViewerController);

// delete user account /api/v1/users/delete-account/

userRouter.delete('/delete-account', isLogin ,  deleteAccountController);

// profile photo upload /api/v1/users/profile/photo
userRouter.post('/profile-photo' ,
    isLogin,
    upload.single('profileImage'),
    profilePhotoController

);


module.exports = userRouter;