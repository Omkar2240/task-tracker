import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function TaskForm({ editingTask, onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("todo");
  const [error, setError] = useState("");

  // when an edit is started, fill the form with that task's values
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
      setPriority(editingTask.priority);
      setStatus(editingTask.status);
    } else {
      clearForm();
    }
  }, [editingTask]);

  function clearForm() {
    setTitle("");
    setDescription("");
    setPriority("medium");
    setStatus("todo");
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    const taskData = { title, description, priority, status };

    try {
      if (editingTask) {
        await axios.put(`${API_URL}/api/tasks/${editingTask._id}`, taskData);
      } else {
        await axios.post(`${API_URL}/api/tasks`, taskData);
      }
      clearForm();
      onSave();
    } catch (err) {
      console.error(err);
      setError("Could not save task.");
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{editingTask ? "Edit Task" : "Add Task"}</h2>

      {error && <p className="error-msg">{error}</p>}

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          placeholder="What needs to be done?"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={500}
          placeholder="Optional details..."
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn">
          {editingTask ? "Update" : "Add Task"}
        </button>
        {editingTask && (
          <button type="button" className="btn btn--secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
