const getTokenHeader = require('../utils/getTokenHeader');
const verifyToken = require('../utils/verifyToken');


const isLogin = (req, res, next) => {
    // GET TOKEN FROM HEADER

    const token = getTokenHeader(req);

    //verify token
    const decodeUser = verifyToken(token)

    // save user to req object
    req.userAuth = decodeUser.id;

    if (!decodeUser) {
        return res.json({
            message: "Invalid Token/Token Expired , Please login again"
        });
    }else {
        next();
    }

    // VERIFY TOKEN

    //SAVE USER TO REQ OBJECT

};


module.exports = isLogin;