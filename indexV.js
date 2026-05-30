const express = require("express");
const connectDB = require("./connect");
const Student = require("./models/students");
const Course = require("./models/Courses");

const app = express();

app.get("/", async (req, res) => {

  await Student.deleteOne({ name: "Gabo" });

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