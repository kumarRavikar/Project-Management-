const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Helper function to read tasks from data.json
const readTasksFromFile = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading or parsing data.json:', err);
        return [];
    }
};

// Helper function to write tasks to data.json
const writeTasksToFile = (tasks) => {
    try {
        fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(tasks, null, 2));
    } catch (err) {
        console.error('Error writing to data.json:', err);
    }
};

// Endpoint to get tasks
app.get('/tasks', (req, res) => {
    const tasks = readTasksFromFile();
    res.json(tasks);
});

// Endpoint to create a new task
app.post('/tasks', (req, res) => {
    const newTask = req.body;

    // Input validation
    if (!newTask.task || typeof newTask.completed !== 'boolean') {
        return res.status(400).json({ message: 'Task and completed status are required.' });
    }
    
    // Generate a new ID for the task
    const tasks = readTasksFromFile();
    const newId = tasks.length ? Math.max(tasks.map(task => task.id)) + 1 : 1; // Incremental ID
    newTask.id = newId;

    tasks.push(newTask); // Add the new task to the array
    writeTasksToFile(tasks); // Save changes
    res.status(201).json(newTask); // Respond with the created task
});

// Endpoint to update an existing task
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const updatedTask = req.body;

    // Input validation
    if (updatedTask.completed !== undefined && typeof updatedTask.completed !== 'boolean') {
        return res.status(400).json({ message: 'Completed status must be a boolean.' });
    }

    const tasks = readTasksFromFile();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex !== -1) {
        // Update the task
        const taskToUpdate = tasks[taskIndex];
        tasks[taskIndex] = {
            ...taskToUpdate,
            ...updatedTask,
        };
        writeTasksToFile(tasks); // Save changes
        res.json(tasks[taskIndex]); // Respond with the updated task
    } else {
        res.status(404).json({ message: 'Task not found' }); // Task not found
    }
});

// Endpoint to delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);

    // Read current tasks
    const tasks = readTasksFromFile();

    // Find the task to delete
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1); // Remove the task
        writeTasksToFile(tasks); // Save changes
        res.status(204).send(); // Respond with no content
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
