const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  difficulty: {
    type: String,
    required: true,
    enum: ["easy", "medium", "hard"]
  },
  durationMonth: {
    type: Number,
    required: true,
    min: 1,
    max: 60
  }
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;