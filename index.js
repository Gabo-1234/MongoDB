import connectDB from "./connect.js";
import Student from "./models/students.js";
import Course from "./models/Courses.js";

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
