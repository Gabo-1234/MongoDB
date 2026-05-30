const connectDB = require("./connect");
const Student = require("./models/students");
const Course = require("./models/Courses");

const run = async () => {
  await connectDB();
  
  const History = await Course.create({
    title: "History",
    difficulty: "medium",
    durationMonth: 4,
  });

  const Gabo = await Student.create({
    name: "Gabo",
    age: 14,
    email: "gabo@mail.com",
    courses: [History._id],
  });

  const oneStudent = await Student.findOne({ name: "Gabo" }).populate(
    "courses",
  );
  console.log(oneStudent);

  process.exit();
};

run();
