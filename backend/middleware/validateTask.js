const { VALID_PRIORITIES } = require("./const");

const validateCreateTask = (req, res, next) => {
  const { title, description, priority } = req.body || {};
  const errors = [];

  if (typeof title !== 'string' || title.trim() === '') {
    errors.push('title is required');
  }

  if (description !== undefined && typeof description !== 'string') {
    errors.push('description must be a string');
  }

  if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
    errors.push(`priority must be one of: ${VALID_PRIORITIES.join(', ')}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  next();
}

const validateUpdateTask = (req, res, next) => {
  const { title, description, completed, priority } = req.body || {};
  const errors = [];

  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    errors.push('title must be a non-empty string');
  }

  if (description !== undefined && typeof description !== 'string') {
    errors.push('description must be a string');
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    errors.push('completed must be a boolean');
  }

  if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
    errors.push(`priority must be one of: ${VALID_PRIORITIES.join(', ')}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  next();
}

module.exports = { validateCreateTask, validateUpdateTask, VALID_PRIORITIES };
