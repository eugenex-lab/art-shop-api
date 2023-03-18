const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
        ,
        title: {
            type: String,
            required: [true, "Title is required"]

        },
    description : {
        type: String,

    }
    },
    {timestamps: true}
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
