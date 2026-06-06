import express from "express";
import connectDB from "./connect.js";
import User from "./models/User.js";

const app = express();
app.use(express.json());

async function seedDatabase() {

  const count = await User.countDocuments();

  if (count > 0) return;

  await User.insertMany([
    { name: "Alice", age: 20, city: "Tbilisi", role: "student" },
    { name: "Bob", age: 25, city: "Kutaisi", role: "teacher" },
    { name: "Charlie", age: 30, city: "Batumi", role: "student" },
    { name: "David", age: 28, city: "Tbilisi", role: "admin" },
    { name: "Emma", age: 22, city: "Batumi", role: "student" },
    { name: "Frank", age: 35, city: "Kutaisi", role: "teacher" },
    { name: "George", age: 27, city: "Tbilisi", role: "student" },
    { name: "Helen", age: 24, city: "Batumi", role: "student" },
    { name: "Ian", age: 31, city: "Kutaisi", role: "admin" },
    { name: "Jane", age: 21, city: "Tbilisi", role: "student" }
  ]);

  console.log("Database seeded");
}

app.get("/users", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.city) filter.city = req.query.city;
    if (req.query.role) filter.role = req.query.role;

    if (req.query.minAge) {
      filter.age = { $gte: Number(req.query.minAge) };
    }

    if (req.query.maxAge) {
      filter.age = {
        ...filter.age,
        $lte: Number(req.query.maxAge)
      };
    }

    const sortBy = req.query.sortBy || "name";
    const order = req.query.order === "desc" ? -1 : 1;

    const users = await User.find(filter)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments(filter);

    res.json({
      page,
      limit,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      users
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function start() {
  await connectDB();
  await seedDatabase();

  app.listen(3000, () => {
    console.log("Server running on port http://localhost:3000");
    console.log("Use http://localhost:3000/users to see the users");
  });
}

start();