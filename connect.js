const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://GG:gabogabo2@cluster0.t1lpvwe.mongodb.net/");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;