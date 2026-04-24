const mong = require('mongoose');

const studentSchema = new mong.Schema({
    name: String,
    age: Number,
});

const Student = mong.model('Student', studentSchema);

module.exports = Student;