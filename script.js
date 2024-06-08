document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    // Add task
    addTaskBtn.addEventListener('click', addTask);

    // Handle task actions (edit, delete, toggle complete)
    taskList.addEventListener('click', handleTaskActions);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const taskItem = createTaskItem(taskText);
            taskList.appendChild(taskItem);
            taskInput.value = '';
            saveTasks();
        }
    }

    function createTaskItem(text) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${text}</span>
            <div>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
                <button class="complete-btn">Complete</button>
            </div>
        `;
        return li;
    }

    function handleTaskActions(event) {
        const btn = event.target;
        const li = btn.parentElement.parentElement;
        
        if (btn.classList.contains('edit-btn')) {
            editTask(li);
        } else if (btn.classList.contains('delete-btn')) {
            deleteTask(li);
        } else if (btn.classList.contains('complete-btn')) {
            toggleCompleteTask(li);
        }
    }

    function editTask(taskItem) {
        const taskText = prompt('Edit your task:', taskItem.firstChild.textContent);
        if (taskText !== null) {
            taskItem.firstChild.textContent = taskText.trim();
            saveTasks();
        }
    }

    function deleteTask(taskItem) {
        taskItem.remove();
        saveTasks();
    }

    function toggleCompleteTask(taskItem) {
        taskItem.classList.toggle('completed');
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(taskItem => {
            tasks.push({
                text: taskItem.firstChild.textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskItem = createTaskItem(task.text);
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            taskList.appendChild(taskItem);
        });
    }
});
