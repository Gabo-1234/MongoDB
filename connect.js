const mong = require('mongoose');

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mong.connect("mongodb+srv://GG:gabogabo2@cluster0.t1lpvwe.mongodb.net/");
        console.log('MongoDB Connected');
    } catch (err) {
        console.error("connection error: ", err);
        process.exit(1);
    }
}

module.exports = connectDB;