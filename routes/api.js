const express = require("express");
var router = express.Router();
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

let tasks = [
  { id: 1, name: "Task 1", completed: false },
  { id: 2, name: "Task 2", completed: true },
  { id: 3, name: "Task 3", completed: false },
];

let nextTaskId = 4;

// Get task list
// https://oz6k1e-8080.csb.app/api/tasks/
router.get("/tasks", (req, res) => {
  // res.json(tasks);
  res.status(200);
  res.render("tasks", {
    title: "API",
    tasks: tasks,
  });
});

// Get a task by id
// // https://oz6k1e-8080.csb.app/api/tasks/1　　など
router.get("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    return res.status(404).send("Task not found");
  }
  res.status(200);
  res.render("task_detail", {
    title: "API",
    task: task,
  });
});

// Create a new task
router.post("/tasks", (req, res) => {
  const task = {
    id: nextTaskId++,
    name: req.body.name,
    completed: false,
  };
  tasks.push(task);
  res.status(201);
  res.render("task_detail", {
    title: "API",
    task: task,
  });
});

// Update a task
// 本当はputなんだけどformからだとputで送れないためpostとして受け取り＆データの更新を行なっている状態
router.post("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    return res.status(404).send("Task not found");
  }
  task.name = req.body.name || task.name;
  task.completed = req.body.completed || task.completed;
  // res.json(task);
  res.status(200);

  res.render("tasks", {
    title: "API",
    tasks: tasks,
  });
});

// Delete a task
router.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    return res.status(404).send("Task not found");
  }
  tasks.splice(index, 1);
  res.sendStatus(204);
});

// これ忘れない！！！！
module.exports = router;
