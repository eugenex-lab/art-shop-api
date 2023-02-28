const getTokenHeader = require('../utils/getTokenHeader');
const verifyToken = require('../utils/verifyToken');
const User = require('../models/User/User');
const {appErr} = require('../utils/appErr');


const isAdmin = async (req, res, next) => {
    // GET TOKEN FROM HEADER

    const token = getTokenHeader(req);

    //verify token
    const decodeUser = verifyToken(token)

    // save user to req object
    req.userAuth = decodeUser.id;


    const user = await User.findById(decodeUser.id);

    if(user.admin){
        return next();

    }else{
        return next (appErr('You are not admin', 401));
    }


    // VERIFY TOKEN

    //SAVE USER TO REQ OBJECT

};


module.exports = isAdmin;