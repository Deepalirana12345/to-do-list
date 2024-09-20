// Load tasks from localStorage when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task function
function addTask() {
  const categoryInput = document.getElementById('category');
  const category = categoryInput.value.trim();

  if (category === '') return alert("Please enter a task category.");

  const tasks = getTasksFromStorage();

  // Create task object with a unique ID
  const newTask = { id: Date.now(), category };
  tasks.push(newTask);

  // Save to localStorage
  saveTasksToStorage(tasks);

  // Clear input field and refresh tasks
  categoryInput.value = '';
  displayTasks();
}

// Edit task function
function editTask(taskId) {
  const tasks = getTasksFromStorage();
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  const newCategory = prompt("Edit task category:", tasks[taskIndex].category);
  if (newCategory) {
    tasks[taskIndex].category = newCategory;
    saveTasksToStorage(tasks);
    displayTasks();
  }
}

// Delete task function
function deleteTask(taskId) {
  let tasks = getTasksFromStorage();
  tasks = tasks.filter(task => task.id !== taskId);
  saveTasksToStorage(tasks);
  displayTasks();
}

// Display all tasks in the table
function displayTasks() {
  const tasks = getTasksFromStorage();
  const tbody = document.querySelector("#taskTable tbody");
  tbody.innerHTML = '';  // Clear the table

  tasks.forEach(task => {
    const row = document.createElement('tr');

    const categoryCell = document.createElement('td');
    categoryCell.textContent = task.category;
    row.appendChild(categoryCell);

    const editCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = "Edit";
    editButton.className = 'btn edit-btn';
    editButton.onclick = () => editTask(task.id);
    editCell.appendChild(editButton);
    row.appendChild(editCell);

    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.className = 'btn delete-btn';
    deleteButton.onclick = () => deleteTask(task.id);
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    tbody.appendChild(row);
  });
}

// Get tasks from localStorage
function getTasksFromStorage() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

// Save tasks to localStorage
function saveTasksToStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks on page load
function loadTasks() {
  displayTasks();
}
