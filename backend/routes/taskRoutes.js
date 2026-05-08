const express = require("express");

const router = express.Router();

const {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  toggleTask,
} = require("../controllers/taskController");

const protect = require("../middleware/authMiddleware");

router.get("/", protect, getTasks);

router.post("/", protect, createTask);

router.delete("/:id", protect, deleteTask);

router.put("/:id", protect, updateTask);

router.patch("/:id/toggle", protect, toggleTask);

module.exports = router;