const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = 4000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/api/tasks', tasksRouter);

app.get('/', (req, res) => {
  res.json({ message: 'its running' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
