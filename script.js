document.addEventListener('DOMContentLoaded', () => {
    const newTaskBtn = document.getElementById('new-task-btn');
    const modal = document.getElementById('new-task-modal');
    const closeModalBtn = document.querySelector('.close');
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('tasks');

    // Load tasks from local storage (if available)
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    };

    // Function to show the modal
    const showModal = () => {
        modal.style.display = 'block';
    };

    // Function to hide the modal
    const hideModal = () => {
        modal.style.display = 'none';
    };

    // Show the modal when 'New Task' button is clicked
    newTaskBtn.addEventListener('click', showModal);

    // Hide the modal when 'x' (close button) is clicked
    closeModalBtn.addEventListener('click', hideModal);

    // Hide the modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            hideModal();
        }
    });

    // Function to add task to DOM
    const addTaskToDOM = (task) => {
        const newTaskItem = document.createElement('li');
        newTaskItem.innerHTML = `<strong>${task.title}</strong> (Project: ${task.project}) - Priority: ${task.priority} - Due: ${task.date}`;
        taskList.appendChild(newTaskItem);
    };

    // Form submission event
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskTitle = document.getElementById('task-title').value;
        const taskProject = document.getElementById('task-project').value;
        const taskPriority = document.getElementById('task-priority').value;
        const taskDate = document.getElementById('task-date').value;

        // Create a task object
        const task = {
            title: taskTitle,
            project: taskProject,
            priority: taskPriority,
            date: taskDate
        };

        // Save the task in local storage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Add the new task to the task list
        addTaskToDOM(task);

        // Clear form fields
        taskForm.reset();
        hideModal();
    });

    // Load existing tasks
    loadTasks();
});
