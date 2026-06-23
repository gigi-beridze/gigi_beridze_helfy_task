import { useState, useEffect } from 'react';
import * as api from './services/api';
import { TaskForm } from './components/TaskForm';
import { TaskFilter } from './components/TaskFilter';
import { TaskList } from './components/TaskList';
import { Modal } from './components/Modal';
import { Skeleton } from './components/Skeleton';
import './styles/App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getTasks()
      .then((data) => setTasks(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const openCreate = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleSubmit = async (data) => {
    try {
      if (editingTask) {
        const updated = await api.updateTask(editingTask.id, data);
        setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      } else {
        const created = await api.createTask(data);
        setTasks((prev) => [...prev, created]);
      }
      closeForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('u sure to delete?')) return;
    try {
      await api.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggle = async (id) => {
    try {
      const updated = await api.toggleTask(id);
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  const query = debouncedSearch.trim().toLowerCase();
  const visibleTasks = tasks.filter((t) => {
    const matchesStatus =
      filter === 'pending' ? !t.completed : filter === 'completed' ? t.completed : true;
    const matchesSearch =
      !query ||
      t.title.toLowerCase().includes(query) ||
      (t.description || '').toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const counts = {
    all: tasks.length,
    pending: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div className="container">
      {error && (
        <div className="container__error" role="alert">
          ⚠️ {error}
          <button type="button" onClick={() => setError('')} aria-label="Dismiss error">
            ✕
          </button>
        </div>
      )}

      <div className="toolbar">
        <TaskFilter filter={filter} onChange={setFilter} counts={counts} />
        <input
          type="search"
          className="search"
          placeholder="Search tasks…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="button" className="btn btn--primary toolbar__add" onClick={openCreate}>
          + Add Task
        </button>
      </div>

      {loading ? (
        <div className="carousel">
          <div className="carousel__viewport">
            <Skeleton height="clamp(260px, 50vh, 460px)" radius="14px" />
          </div>
        </div>
      ) : (
        <TaskList
          tasks={visibleTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={openEdit}
        />
      )}

      {showForm && (
        <Modal onClose={closeForm}>
          <TaskForm onSubmit={handleSubmit} editingTask={editingTask} onCancel={closeForm} />
        </Modal>
      )}
    </div>
  );
};

export default App;
