document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task');
        return;
    }

    const taskText = document.createTextNode(taskInput.value);
    const li = document.createElement('li');
    li.appendChild(taskText);

    // Add due date input
    const dueDateInput = document.createElement('input');
    dueDateInput.setAttribute('type', 'date');
    dueDateInput.classList.add('due-date');
    li.appendChild(dueDateInput);

    // Add priority input
    const priorityInput = document.createElement('select');
    priorityInput.innerHTML = `
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
    `;
    priorityInput.classList.add('priority');
    li.appendChild(priorityInput);

    // Add task actions (edit and delete)
    const actions = document.createElement('div');
    actions.innerHTML = `
        <span class="edit-btn" onclick="editTask(this)">Edit</span>
        <span class="delete-btn" onclick="deleteTask(this)">Delete</span>
    `;
    li.appendChild(actions);

    taskList.appendChild(li);
    taskInput.value = '';

    saveTasks();
}

function toggleTaskStatus(task) {
    task.classList.toggle('completed');
    saveTasks();
}

function editTask(editBtn) {
    const li = editBtn.parentElement.parentElement;
    const taskText = li.firstChild;
    const newTaskText = prompt('Edit task:', taskText.nodeValue);

    if (newTaskText !== null) {
        taskText.nodeValue = newTaskText;
        saveTasks();
    }
}

function deleteTask(deleteBtn) {
    const li = deleteBtn.parentElement.parentElement;
    li.remove();
    saveTasks();
}

function clearAllTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('taskList');
    localStorage.setItem('tasks', taskList.innerHTML);
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        taskList.innerHTML = savedTasks;
        const listItems = document.querySelectorAll('#taskList li');

        listItems.forEach((item) => {
            const actions = item.querySelector('.actions');
            const editBtn = actions.querySelector('.edit-btn');
            const deleteBtn = actions.querySelector('.delete-btn');

            item.addEventListener('click', () => {
                toggleTaskStatus(item);
            });

            editBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                editTask(editBtn);
            });

            deleteBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                deleteTask(deleteBtn);
            });
        });
    }
}
