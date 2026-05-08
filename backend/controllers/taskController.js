const Task = require("../models/Task");

// ================= GET TASKS =================
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= CREATE TASK =================
const createTask = async (req, res) => {
  try {
    const { title, priority, dueDate } = req.body;

    const task = await Task.create({
      title,

      priority,

      dueDate,

      user: req.user.id,
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= UPDATE TASK =================
const updateTask = async (req, res) => {
  try {
    const { title, completed, priority, dueDate } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    task.title = title ?? task.title;

    task.completed = completed ?? task.completed;

    task.priority = priority ?? task.priority;

    task.dueDate = dueDate ?? task.dueDate;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= DELETE TASK =================
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await task.deleteOne();

    res.json({
      message: "Task deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= TOGGLE TASK =================
const toggleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    task.completed = !task.completed;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
};
