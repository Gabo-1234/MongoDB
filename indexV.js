const express = require("express");
const connectDB = require("./connect");
const Student = require("./models/students");
const Course = require("./models/Courses");

const app = express();

app.get("/", async (req, res) => {
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

  await Student.create({
    name: "Demetre",
    age: 20,
    email: "demetre@mail.com",
    courses: [math._id, english._id]
  });

  await Student.create({
    name: "Bob",
    age: 17,
    email: "bob@mail.com",
    courses: [english._id]
  });

  const students = await Student.find().populate("courses");

  let html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Students</title>
  </head>
  <body>
    <h1>Students</h1>
  `;

  students.forEach(s => {
    html += `
      <div>
        <h3>${s.name}</h3>
        <p>Age: ${s.age}</p>
        <p>Email: ${s.email || "No email"}</p>
        <p>Courses: ${
          s.courses.map(c => c.title).join(", ")
        }</p>
      </div>
      <hr/>
    `;
  });

  html += `
  </body>
  </html>
  `;

  res.send(html);
});

const start = async () => {
  await connectDB();
  app.listen(3000);
};

start();