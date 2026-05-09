const mong = require("mongoose");

const studentSchema = new mong.Schema({
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
      type: mong.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const Student = mong.model("Student", studentSchema);

module.exports = Student;
