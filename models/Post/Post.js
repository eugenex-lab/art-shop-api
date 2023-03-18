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
        // required: true,
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

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: [true, "Please Author is required"],
    },

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
        required: [true,  "Photo is required"]
    }]
    ,

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
    }

    ]

    ,

    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'

    }
    ]

},
    {
        toJSON: {virtuals: true},
        timestamps: true
    }
);


PostSchema.pre(/^find/, function (next) {

    PostSchema.virtual('numberOfViewCount').get(function () {

        const post = this;
        return post.numberOfViews.length;
    });

    // add likes count as virtual field

    PostSchema.virtual('numberOfLikesCount').get(function () {

        const post = this;
        return post.numberOfLikes.length;
    });


    PostSchema.virtual('numberOfDislikesCount').get(function () {
        const post = this;
        return post.numberOfDislikes.length;
    }
    );

    // % of liked posts in total posts

    PostSchema.virtual('percentageOfLikes').get(function () {
        const post = this;
        const total = post.numberOfLikes.length + post.numberOfDislikes.length;
        return `${Math.round((post.numberOfLikes.length / total) * 100)}%`;

    }
    );

    // days ago post was created

    PostSchema.virtual('daysAgo').get(function () {
        const post = this;
        const date = new Date(post.createdAt);
        const days = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));



        return days === 0 ? 'Today' : days === 1 ? 'Yesterday' : `${days} days ago`;

    }
    );




    next();
});



const Post = mongoose.model("Post", PostSchema);

module.exports = Post;



