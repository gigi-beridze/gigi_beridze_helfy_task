const express = require('express');
const router = express.Router();
const { validateCreateTask, validateUpdateTask } = require('../middleware/validateTask');

let tasks = [];
let nextId = 1;

router.get('/', (req, res) => {
  res.status(200).json(tasks);
});

router.post('/', validateCreateTask, (req, res) => {
  const { title, description, priority } = req.body;

  const task = {
    id: nextId++,
    title: title.trim(),
    description: description ? description.trim() : '',
    completed: false,
    createdAt: new Date(),
    priority: priority || 'medium',
  };

  tasks.push(task);
  res.status(201).json(task);
});

router.put('/:id', validateUpdateTask, (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: `Task with id ${id} not found` });
  }

  const { title, description, completed, priority } = req.body;

  if (title !== undefined) task.title = title.trim();
  if (description !== undefined) task.description = description.trim();
  if (completed !== undefined) task.completed = completed;
  if (priority !== undefined) task.priority = priority;

  res.status(200).json(task);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Task with id ${id} not found` });
  }

  const [deleted] = tasks.splice(index, 1);
  res.status(200).json(deleted);
});

router.patch('/:id/toggle', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: `Task with id ${id} not found` });
  }

  task.completed = !task.completed;
  res.status(200).json(task);
});

module.exports = router;
