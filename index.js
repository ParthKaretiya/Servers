const express = require("express");
const app = express();

const students = [
  {
    id: 1,
    name: "Aarav Sharma",
    branch: "CSE",
    semester: 8,
    cgpa: 9.3
  },
  {
    id: 2,
    name: "Ishita Verma",
    branch: "IT",
    semester: 7,
    cgpa: 8.9
  },
  {
    id: 3,
    name: "Rohan Kulkarni",
    branch: "ECE",
    semester: 6,
    cgpa: 8.4
  },
  {
    id: 4,
    name: "Meera Iyer",
    branch: "CSE",
    semester: 8,
    cgpa: 9.1
  },
  {
    id: 5,
    name: "Kunal Deshmukh",
    branch: "IT",
    semester: 5,
    cgpa: 7.8
  },
  {
    id: 6,
    name: "Ananya Reddy",
    branch: "CSE",
    semester: 6,
    cgpa: 8.7
  },
  {
    id: 7,
    name: "Vikram Patil",
    branch: "ECE",
    semester: 7,
    cgpa: 8.2
  },
  {
    id: 8,
    name: "Priyanka Nair",
    branch: "AI",
    semester: 4,
    cgpa: 8.8
  },
  {
    id: 9,
    name: "Harsh Mehta",
    branch: "Data Science",
    semester: 5,
    cgpa: 8.0
  },
  {
    id: 10,
    name: "Neha Gupta",
    branch: "CSE",
    semester: 6,
    cgpa: 7.9
  }
];

app.get("/", (req, res) => {
  res.send("Welcome to Student API");
});


app.get("/students", (req, res) => {
  res.send(students).json;
});

app.get("/students/topper", (req, res) => {
  if (students.length === 0) {
    return res.status(404).json({ message: "No students found" });
  }

  const topper = students.reduce((prev, current) => {
    return current.cgpa > prev.cgpa ? current : prev;
  });

  res.status(200).json(topper);
});

app.get("/students/average", (req, res) => {
  if (students.length === 0) {
    return res.status(404).json({ message: "No students found" });
  }

  const totalCGPA = students.reduce((sum, student) => {
    return sum + student.cgpa;
  }, 0);

  const average = totalCGPA / students.length;

  res.status(200).json({
    averageCGPA: Number(average)
  });
});app.get("/students/count", (req, res) => {
  res.status(200).json({
    totalStudents: students.length
  });
});

app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(student);
});


app.get("/students/branch/:branchName", (req, res) => {
  const branchName = req.params.branchName.toLowerCase();

  const filteredStudents = students.filter(
    (student) => student.branch.toLowerCase() === branchName
  );

  // Choice: Returning empty array instead of 404
  // Reason: The branch exists as a valid query,
  // but currently no students match. This keeps API consistent.

  res.status(200).json(filteredStudents);
});


app.listen(3000, () => {
  console.log("Server started on port 3000");
});