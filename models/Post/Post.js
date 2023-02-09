const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    }
    ,
    price: {
        type: Number,
        required: true,
    }
    ,

    createdAt: {
        type: Date,
        default: Date.now
    }
    ,

    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    }
    ,

    artist: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
    ,

    isSold: {
        type: Boolean,
        default: false
    }
    ,

    isBlocked: {
        type: Boolean,
        default: false
    },

    numberOfViews: [{
        type: mongoose.Schema.Types.ObjectId,
        default: 0,
        ref: 'User'
    }]
    ,

    numberOfLikes: [{
        type: mongoose.Schema.Types.ObjectId,
        default: 0,
        ref: 'User'
    }]

    ,

    numberOfComments: [{
        type: mongoose.Schema.Types.ObjectId,
        default: 0,
        ref: 'User'
    }
    ]
    ,

    numberOfDislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        default: 0,
        ref: 'User'
    }
    ]
    ,

    numberOfShares: [{
        type: mongoose.Schema.Types.ObjectId,
        default: 0,
        ref: 'User'
    }
    ]
    ,

    photo: [{
        type: String,
        required: [true, "Photo is required"]
    }]
    ,

    timestamp : true
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;



