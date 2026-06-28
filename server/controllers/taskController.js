const Task = require("../models/Task");

// GET all tasks, with optional status/priority filters
exports.getTasks = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.priority) filter.priority = req.query.priority;

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch tasks" });
  }
};

// POST create a task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;

    if (!title || !title.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    const task = await Task.create({ title, description, status, priority });
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create task" });
  }
};

// PUT update a task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.json({ success: true, data: task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update task" });
  }
};

// DELETE a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.json({ success: true, data: task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to delete task" });
  }
};
