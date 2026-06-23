export const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const createdAt = new Date(task.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <article className={`task ${task.completed ? 'task--done' : ''}`}>
      <div className="task__body">
        <header className="task__header">
          <span className={`badge badge--${task.priority}`}>{task.priority}</span>
          <span className="task__status">
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </header>

        <h3 className="task__title">{task.title}</h3>

        {task.description && <p className="task__desc">{task.description}</p>}

        <p className="task__meta">Created {createdAt}</p>
      </div>

      <div className="task__actions">
        <button
          type="button"
          className="btn btn--toggle"
          onClick={() => onToggle(task.id)}
        >
          {task.completed ? 'Mark Pending' : 'Mark Done'}
        </button>
        <button type="button" className="btn btn--edit" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button
          type="button"
          className="btn btn--delete"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}