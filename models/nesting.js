const mong = require('mongoose');

const courseSchema = new mong.Schema({
    name: String,
    credits: Number,
});

const studentSchema = new mong.Schema({
    name: String,
    age: Number,
    courses: [courseSchema]
});

const Student = mong.model('Student', studentSchema);

module.exports = Student;