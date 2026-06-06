import express from "express";
import connectDB from "./connect.js";
import Student from "./models/students.js";
import Course from "./models/Courses.js";

const app = express();

app.get("/", async (req, res) => {
  await Course.deleteMany({});

  const courses = await Course.insertMany([
    {
      title: "History",
      difficulty: "medium",
      durationMonth: 4,
    },
    {
      title: "Math",
      difficulty: "hard",
      durationMonth: 6,
    },
    {
      title: "Literature",
      difficulty: "easy",
      durationMonth: 3,
    },
    {
      title: "Physics",
      difficulty: "hard",
      durationMonth: 5,
    },
  ]);

  const courseByTitle = courses.reduce((map, course) => {
    map[course.title] = course._id;
    return map;
  }, {});

  await Student.deleteMany({});

  await Student.insertMany([
        {
      name: "Luka",
      age: 15,
      email: "luka@mail.com",
      courses: [courseByTitle.Literature],
    },
    {
      name: "Gabo",
      age: 14,
      email: "gabo@mail.com",
      courses: [courseByTitle.History],
    },
    {
      name: "Saba",
      age: 17,
      email: "saba@mail.com",
      courses: [courseByTitle.Physics],
    },
    {
      name: "Nika",
      age: 16,
      email: "nika@mail.com",
      courses: [courseByTitle.Math],
    },
  ]);

  res.redirect("/students");
});

app.get("/students", async (req, res) => {
  try {
    const sortBy = req.query.sortBy || "name";
    const order = req.query.order === "desc" ? -1 : 1;

    const students = await Student.find({})
      .populate("courses")
      .sort({ [sortBy]: order });

    let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Students</title>
    </head>
    <body>
      <h1>Students</h1>
    `;

    students.forEach((s) => {
      html += `
        <div>
          <h3>${s.name}</h3>
          <p>Age: ${s.age}</p>
          <p>Email: ${s.email || "No email"}</p>
          <p>Courses: ${Array.isArray(s.courses) ? s.courses.map((c) => c.title).join(", ") : "No courses"}</p>
        </div>
        <hr/>
      `;
    });

    html += `
    </body>
    </html>
    `;

    res.send(html);
  } catch (err) {
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Error</title>
      </head>
      <body>
        <h1>Server Error</h1>
        <p>${err.message}</p>
      </body>
      </html>
    `);
  }
});

const start = async () => {
  await connectDB();
  app.listen(3000, () => {
    console.log("Server listening on http://localhost:3000");
  });
};

start();
