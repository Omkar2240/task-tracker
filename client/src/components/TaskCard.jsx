function TaskCard({ task, onEdit, onDelete }) {
  // labels for the status badge (the enum value isn't pretty enough to show)
  const statusLabels = {
    todo: "To Do",
    "in-progress": "In Progress",
    done: "Done",
  };

  const date = new Date(task.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="task-card">
      <div className="task-card__header">
        <h3>{task.title}</h3>
      </div>

      {task.description && <p className="task-card__desc">{task.description}</p>}

      <div className="badges">
        <span className={`badge badge--${task.status}`}>
          {statusLabels[task.status]}
        </span>
        <span className={`badge badge--${task.priority}`}>{task.priority}</span>
      </div>

      <p className="task-card__date">{date}</p>

      <div className="task-card__actions">
        <button className="btn btn--small" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button
          className="btn btn--small btn--danger"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
