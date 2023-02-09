const express = require("express");
const {userRegisterController} = require("../../controllers/User/UserController");
const {userLoginController} = require("../../controllers/User/UserController");
const {userController} = require("../../controllers/User/UserController");
const {usersController} = require("../../controllers/User/UserController");
const {userDelController} = require("../../controllers/User/UserController");
const {userUpdateController} = require("../../controllers/User/UserController");

const userRouter = express.Router();


// register users /api/v1/users/register
userRouter.post('/register', userRegisterController);


// users Login /api/v1/users/login
userRouter.post('/login', userLoginController);

// get single user /api/v1/users/profile/:id
userRouter.get('/profile/:id', userController);

// get users /api/v1/users

userRouter.get('/', usersController
);


// del user /api/v1/users/:id

userRouter.delete('/:id', userDelController);

// update user /api/v1/users/:id

userRouter.put('/:id', userUpdateController
);


module.exports = userRouter;