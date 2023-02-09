const mongoose = require("mongoose");


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

    })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err.message, "MongoDB connection failed" , err , process.env.MONGODB_URL));

module.exports = mongoose;

