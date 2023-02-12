const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({

        firstname: {
            type: String,
            required: [true, "First Name is required"]
        },
        lastname: {
            type: String,
            required: [true, "Last Name is required"]
        },
        email: {
            type: String,
            required: [true, "Email is required"]
        },

        profileImage: {
            type: String,
            // required: [true, "Profile Image is required"]
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },

        // artCount: {
        //     type: Number,
        //     default: 0
        // }
        // ,

        createdAt: {
            type: Date,
            default: Date.now
        },

        isBlocked: {
            type: Boolean,
            default: false
        }
        ,

        isAdmin: {
            type: Boolean,
            default: false
        }
        ,

        role: {
            type: String,
            enum: ['Guest', 'Admin', 'ArtistEditor'],
        },

        viewers: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        ],

        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        ],

        // active: {
        //     type: Boolean,
        //     default: true
        // }
        // ,
        ArtWorks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],

        plans: [

            {
                type: String,
                enum: ['Free', 'Premium', 'Pro'],
                default: 'Free'
            }
        ],

    userAward : [

        {
          type:String,
          enum: ['None','Bronze', 'Silver', 'Gold', 'Platinum'],
            default: 'None'
        }
        ],

        blocked: [
            {
                type : String,
                ref: 'Post'
            }
        ]

    },
    {
        timestamps: true
    }

);



const User = mongoose.model('User', UserSchema);

module.exports = User;


