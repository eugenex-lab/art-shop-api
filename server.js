const express = require('express');

const userRouter = require('./routes/User/userRoutes');
const ratingRouter = require('./routes/Rating/ratingRoutes');
const postRouter = require('./routes/Post/postRoutes');
const categoryRouter = require('./routes/Category/categoryRoutes');
const commentRouter = require('./routes/Comment/commentRoutes');

// const appErr = require('./utils/appErr');




require('dotenv').config({path: '.env'});
require('./config/dbConnect');
// const {AppErr} = require("./utils/appErr");
// const isAdmin = require("./middlewares/isAdmin");

const app = express();
app.use(express.json());  // parse incoming request with JSON payloads


// app.use(appErr,AppErr);

//middlewares
// const userAuth = {
//   isLogin: true,
//   isAdmin: true,
// }


/// check if user is logged in
// app.use((req , res, next) => {
// if(userAuth.isLogin){
//   next();
// }
// else{
//   return res.json({message: 'You are not logged in'});
// }
// });
//
// // check if user is admin
// app.use((req , res, next) => {
// if(userAuth.isAdmin){
//   next();
// }
// else{
//     return res.json({message: 'You are not admin'});
// }
// });

//routes

//users route

// register users
app.use('/api/v1/users',userRouter);

// ratings route
app.use('/api/v1/ratings',ratingRouter);

// posts route
app.use('/api/v1/posts',postRouter);

// create categories
app.use('/api/v1/categories',categoryRouter);

// create comment
app.use('/api/v1/comments',commentRouter);

// RATINGS route
app.use('/api/v1/ratings',ratingRouter);


//404 error
app.use("*", (req, res) => {
  console.log(req.originalUrl);
  res.status(404).json({
    message: `${req.originalUrl} - Route Not Found`,
  });
});

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Here we go !! ${port}`);
});