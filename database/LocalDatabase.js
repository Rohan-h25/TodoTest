const mongoose = require("mongoose");

function connectMongoDB(url) {
    mongoose.connect(url)
    .then((e) => console.log(`Connected to mongodb:${e.connection.host}`))
    .catch((e) => console.log(e));
};

module.exports = connectMongoDB;