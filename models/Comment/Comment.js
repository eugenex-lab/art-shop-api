const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({

        comment: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Comment is required"],
            ref: 'Post'
        },

        user: {
            type: Object,
            required: [true, "User is required"]
        }

    },

    {timestamps: true}
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;

