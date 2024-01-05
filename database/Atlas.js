const mongoose = require("mongoose");

function connectMongoDBAtlas(url) {
  mongoose.connect(url);

  // Get the default connection
  const db = mongoose.connection;

  // Event handlers for Mongoose connection
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB Atlas");
  });
}

module.exports = connectMongoDBAtlas;