const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({

 rating: {
     type: mongoose.Schema.Types.ObjectId,
     required: [true, "Comment is required"],
     ref: 'Post'
 }
 ,

    user: {
        type: Object,
        required: [true, "User is required"]
    }

},
    {timestamps: true}
);



const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;