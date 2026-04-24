const connectDB = require("./db/connect");
const Student = require("./models/Student");

const run = async () => {
  await connectDB();

  await Student.create({
    name: "Alice",
    age: 20
  });

  console.log("Student created");

  const students = await Student.find();
  console.log("All students:", students);

  process.exit();
};

run();