const express = require('express');

const userRouter = require('./routes/User/userRoutes');
const ratingRouter = require('./routes/Rating/ratingRoutes');
const postRouter = require('./routes/Post/postRoutes');
const categoryRouter = require('./routes/Category/categoryRoutes');
const commentRouter = require('./routes/Comment/commentRoutes');

require('dotenv').config({path: '.env'});
require('./config/dbConnect');

const app = express();
app.use(express.json());  // parse incoming request with JSON payloads

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




const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Here we go !! ${port}`);
});