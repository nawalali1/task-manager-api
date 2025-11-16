const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'tasks.json');

app.use(express.json());

async function readTasks() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeTasks(tasks) {
  await fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2));
}

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await readTasks();
    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve tasks'
    });
  }
});

app.get('/tasks/:id', async (req, res) => {
  try {
    const tasks = await readTasks();
    const task = tasks.find(t => t.id === req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }
    
    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve task'
    });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Title is required'
      });
    }
    
    const tasks = await readTasks();
    
    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description ? description.trim() : '',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    await writeTasks(tasks);
    
    res.status(201).json({
      success: true,
      data: newTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create task'
    });
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    
    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }
    
    const { title, description, completed } = req.body;
    
    if (title !== undefined) {
      if (title.trim() === '') {
        return res.status(400).json({
          success: false,
          error: 'Title cannot be empty'
        });
      }
      tasks[taskIndex].title = title.trim();
    }
    
    if (description !== undefined) {
      tasks[taskIndex].description = description.trim();
    }
    
    if (completed !== undefined) {
      tasks[taskIndex].completed = Boolean(completed);
    }
    
    tasks[taskIndex].updatedAt = new Date().toISOString();
    
    await writeTasks(tasks);
    
    res.json({
      success: true,
      data: tasks[taskIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update task'
    });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    
    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }
    
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    await writeTasks(tasks);
    
    res.json({
      success: true,
      message: 'Task deleted successfully',
      data: deletedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete task'
    });
  }
});

app.get('/', (req, res) => {
  res.json({
    message: 'Task Manager REST API',
    version: '1.0.0',
    endpoints: {
      'GET /tasks': 'List all tasks',
      'GET /tasks/:id': 'Get a specific task',
      'POST /tasks': 'Create a new task',
      'PUT /tasks/:id': 'Update a task',
      'DELETE /tasks/:id': 'Delete a task'
    }
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});