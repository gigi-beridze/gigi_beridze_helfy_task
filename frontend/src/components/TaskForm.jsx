import { useState, useEffect } from 'react';
import { Spinner } from './Spinner';

const EMPTY = { title: '', description: '', priority: 'medium' };

export const TaskForm = ({ onSubmit, editingTask, onCancel }) => {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description || '',
        priority: editingTask.priority,
      });
    } else {
      setForm(EMPTY);
    }
    setError('');
  }, [editingTask]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }
    setError('');
    setSubmitting(true);
    await onSubmit({ ...form, title: form.title.trim(), description: form.description.trim() });
    setSubmitting(false);
    if (!editingTask) setForm(EMPTY);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2 className="task-form__title">{editingTask ? 'Edit Task' : 'New Task'}</h2>

      {error && <p className="task-form__error">{error}</p>}

      <label className="task-form__field">
        <span>Title *</span>
        <input
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="What needs doing?"
        />
      </label>

      <label className="task-form__field">
        <span>Description</span>
        <textarea
          name="description"
          rows="2"
          value={form.description}
          onChange={handleChange}
          placeholder="Optional details…"
        />
      </label>

      <label className="task-form__field">
        <span>Priority</span>
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      <div className="task-form__actions">
        <button type="submit" className="btn btn--primary" disabled={submitting}>
          {submitting ? <Spinner /> : editingTask ? 'Update Task' : 'Add Task'}
        </button>
        {editingTask && (
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
