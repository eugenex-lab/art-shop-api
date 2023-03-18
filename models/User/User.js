const mongoose = require("mongoose");
const Post = require("../Post/Post");


const userSchema = new mongoose.Schema({

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
    // isUserBlocked:{
    //
    //     type: Boolean,
    //     default: false
    //
    // },

        isAdmin: {
            type: Boolean,
            default: false
        }
        ,

        role: {
            type: String,
            enum: ['Guest', 'Admin', 'ArtistEditor'],
        },

        viewers:[ {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],

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
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],

        // plans: [
        //
        //     {
        //         type: String,
        //         enum: ['Free', 'Premium', 'Pro'],
        //         default: 'Free'
        //     }
        // ],

        userAward :

            {
              type:String,
              enum: ['None','Bronze', 'Silver', 'Gold', 'Platinum'],
                default: 'None'
            }
            ,

        blocked: [
            {
                type: String,
                ref: 'Post'
            }
        ]
    },
    {
        timestamps: true,
        toJSON: {virtuals: true},
    }
);

// Get full name of user

// UserSchema.virtual('fullname').get(function () {
//     console.log(this);
//     return this.firstname + ' ' + this.lastname;
//
// });
//
// // Get initials of user
//
//
//
// UserSchema.virtual('initials').get(function () {
//     return this.firstname[0] + this.lastname[0];
// }
// );
//
// //get user art count
//
// UserSchema.virtual('artCount').get(function () {
//     return this.ArtWorks.length;
// }
// );
//
// //get user followers count
//
// UserSchema.virtual('followersCount').get(function () {
//     return this.followers.length;
// }
// );
//
// // get blocked count
//
// UserSchema.virtual('blockedCount').get(function () {
//     return this.blocked.length;
// }
// );

// Hooks

// before saving user record

userSchema.pre("findOne",
    async function (next) {

    this.populate(
        {
            path: 'posts',
        }
    );

        console.log("pre hook called");
        console.log(this);

        // fet the user id
        const userId = this._conditions._id;

        // find the post created by the user
        const postsFound = await Post.find({user: userId});

        // get last post created by the user
        const lastPost = postsFound[postsFound.length - 1];


        //// check last post date and format it

        //
        // console.log(lastPost + "last post $$$$$$$$$$+++++++++++++++++++" +
        //     "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

        const lastPostDate = new Date(lastPost && lastPost.createdAt);

        const lastPostDateFormatted = lastPostDate.toDateString();

        // console.log(lastPostDateFormatted + "last post date $$$$$$$$$$+++++++++++++++++++" +
        //     "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

        userSchema.virtual('lastPostDate').get(function () {
                return lastPostDateFormatted;
            }
        );


        //check if user is inactive for 30 days

        const currentDate = new Date();

        const diff = currentDate - lastPostDate

        const diffIndays = diff / (1000 * 3600 * 24);


        // if user is inactive for 30 days or more block the user

        if (diffIndays > 30) {

            userSchema.virtual("isActive").get(function () {
                return false;

            });



            //Find the user by ID and update

            await User.findByIdAndUpdate(
                // userId,
                // {
                //     isBlocked: true,
                // },
                // {
                //     new: true,
                // }
            );





            await User.findByIdAndUpdate(
                userId,
                {
                    isBlocked: true,
                },
                {
                    new: true,
                }
            );
        } else {
            userSchema.virtual("isActive").get(function () {
                return true;
            });


            await User.findByIdAndUpdate(
                userId,
                {
                    isBlocked: false,
                },
                {
                    new: true,
                }
            );


            // last active date virtual field

            const lastActiveDate = Math.floor(diffIndays);

            userSchema.virtual('lastActiveDate').get(function () {

                    if (lastActiveDate === 0) {
                        return "Today"
                    } else if (lastActiveDate === 1) {
                        return "Yesterday"

                    } else {
                        return lastActiveDate + " days ago"
                    }

                }
            );

            //// UPDATE USER RECORD TO UPdate award field

            const numberOfPosts = postsFound.length;

            if (numberOfPosts < 10) {


            } else if (numberOfPosts >=3 && numberOfPosts < 5) {

                await User.findByIdAndUpdate(
                    userId,
                    {
                        userAward: "Silver",
                    },
                    {
                        new: true,
                    }
                )

            } else if (numberOfPosts >= 5) {

                await User.findByIdAndUpdate(
                    userId,
                    {
                        userAward: "Gold",

                    },
                    {
                        new: true,
                    }
                )

            }
            console.log("pre hook called" + "%%%%%%%%%%%%%%%%%%%%%%%%%%%#################++++++++++++++++++++++++++++++"
                + "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++" + postsFound.length + "number of posts");
        }



        next();

    }
);




            // create virtual field to show user is blocked

            // UserSchema.virtual('isActive').get(function () {
            //         return false;
            //     }
            // )
            // //
            // // await User.findByIdAndUpdate(userId, {isBlocked : true})
            // //
            // //
            // //
            //
            // // get the id of the user  and  update the user record to block the user
            //
            //     .then( async (user) => {
            //
            //     await User.findByIdAndUpdate(userId, {isBlocked : true})
            //
            // }
            // )





            // call next middleware

        // } else {

            // create virtual field to show user is active






            // UserSchema.virtual('isActive').get(function () {
            //         return true;
            //     }
            // )

//
//


        // add one second delay to the next middleware


                // await User.findByIdAndUpdate(userId, {isBlocked: true})










        // )

//         next();
//     }
//     }
// );

// post sav

// UserSchema.post('save', async function (next )
// {
//     // get the id of the user
//     const userId = this._conditions._id;
//
// // find the post created by the user
//
//     const postsFound = await Post.find({artist: userId});
//     console.log(postsFound);
//
//     // get last post created by the user
//
//     const lastPost = postsFound[postsFound.length - 1];
//
//     console.log(lastPost + "last post $$$$$$$$$$++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
//
//
//     console.log("post hook called");
//     next();
// }
// );


const User = mongoose.model('User', userSchema);

module.exports = User;


