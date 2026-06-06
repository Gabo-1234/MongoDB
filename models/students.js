import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 120,
    validate: {
      validator: function (value) {
        return value !== 13;
      },
      message: "Age 13 is not allowed (custom rule example)",
    },
  },
  role: {
    type: String,
    default: "student",
    enum: ["student", "admin"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
