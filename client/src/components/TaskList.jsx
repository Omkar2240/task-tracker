import TaskCard from "./TaskCard";

function TaskList({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty-msg">No tasks found</p>;
  }

  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
