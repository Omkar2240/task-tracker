import { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ status: "", priority: "" });
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/tasks`);
      setTasks(res.data.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Could not load tasks. Is the server running?");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this task?")) return;
    try {
      await axios.delete(`${API_URL}/api/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      setError("Could not delete task.");
    }
  }

  function handleEdit(task) {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // called by TaskForm after a successful create/update
  function handleSave() {
    setEditingTask(null);
    fetchTasks();
  }

  // client-side filtering, no re-fetch
  const filtered = tasks.filter((task) => {
    if (filter.status && task.status !== filter.status) return false;
    if (filter.priority && task.priority !== filter.priority) return false;
    return true;
  });

  return (
    <div className="container">
      <h1>Task Tracker</h1>

      {error && <p className="error-msg">{error}</p>}

      <TaskForm
        editingTask={editingTask}
        onSave={handleSave}
        onCancel={() => setEditingTask(null)}
      />

      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TaskList tasks={filtered} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default App;
