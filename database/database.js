require('dotenv').config();
const mongoose = require("mongoose");

exports.connectMongoose = () => {
    mongoose.connect(process.env.DB_STRING)
    .then((e) => console.log(`Connected to mongodb:${e.connection.host}`))
    .catch((e) => console.log(e));
};
