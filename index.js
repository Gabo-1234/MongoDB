const connectDB = require("./connect");
const Student = require("./models/students");
const Course = require("./models/Courses")

const run = async () => {
  await connectDB();

  await Student.deleteMany();
  await Course.deleteMany();

  const math = await Course.create({
    title: "Mathematics",
    difficulty: "hard",
    durationMonth: 3
  });

  const english = await Course.create({
    title: "English",
    difficulty: "easy",
    durationMonth: 2
  });

  const demetre = await Student.create({
    name: "Demetre",
    age: 20,
    email: "demetre@mail.com",
    courses: [math._id, english._id]
  });

  const bob = await Student.create({
    name: "Bob",
    age: 17,
    email: "bob@mail.com",
    courses: [english._id]
  });

  const allStudents = await Student.find().populate("courses");
  console.log(allStudents);

  const oneStudent = await Student.findOne({ name: "Demetre" }).populate("courses");
  console.log(oneStudent);

  const updatedStudent = await Student.findOneAndUpdate(
    { name: "Demetre" },
    { age: 21 },
    { returnDocument: "after" }
  );

  console.log(updatedStudent);

  await Student.updateMany(
    { age: { $lt: 18 } },
    { $inc: { age: 1 } }
  );

  const afterUpdate = await Student.find();
  console.log(afterUpdate);

  await Student.deleteOne({ name: "Bob" });

  const afterDeleteOne = await Student.find();
  console.log(afterDeleteOne);

  await Student.deleteMany({ age: { $gte: 21 } });

  const finalStudents = await Student.find();
  console.log(finalStudents);

  process.exit();
};

run();