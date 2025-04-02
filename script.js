const newTaskInput = document.getElementById("newTask");
const addTaskButton = document.getElementById("btnAddTask");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", function() {
  loadTasks();
});

addTaskButton.addEventListener("keydown",function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function createTaskElement(taskText, completed = false) {
  // Create the list item for the task
  const taskItem = document.createElement("li");
  taskItem.textContent = taskText;
  taskItem.className = "list-group-item d-flex justify-content-between align-items-center";

  if (completed) {
    taskItem.style.textDecoration = "line-through";
    taskItem.style.color = "gray";
  }

  // Create the complete button
  const completeButton = document.createElement("button");
  completeButton.textContent = completed ? "Uncomplete" : "Complete";
  completeButton.className = "btn btn-secondary btn-sm me-2";

  // Create the delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "btn btn-danger btn-sm";

  // Append buttons to the task item
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "d-flex";
  buttonContainer.appendChild(completeButton);
  buttonContainer.appendChild(deleteButton);

  taskItem.appendChild(buttonContainer);

  // Event listener for delete button
  deleteButton.addEventListener("click", function () {
    deleteTask(taskItem);
  });

  // Event listener for complete button
  completeButton.addEventListener("click", function () {
    completeTask(taskItem);
  });

  return taskItem;
}

function addTask() {
  const taskText = newTaskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const taskElement = createTaskElement(taskText);
  taskList.appendChild(taskElement);

  saveTasks();
  newTaskInput.value = '';
  newTaskInput.focus();
}

function deleteTask(taskItem){
  taskItem.remove();
  saveTasks(); 
}

function completeTask(taskItem) {
  const completeButton = taskItem.querySelector("button:first-of-type");

  if (taskItem.style.textDecoration === "line-through") {
    // Uncomplete the task
    taskItem.style.textDecoration = "none";
    taskItem.style.color = "black";
    completeButton.textContent = "Complete";
  } else {
    // Mark as complete
    taskItem.style.textDecoration = "line-through";
    taskItem.style.color = "gray";
    completeButton.textContent = "Uncomplete";
  }

  newTaskInput.focus();
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach(taskItem => {
    tasks.push({
      text: taskItem.firstChild.textContent,
      completed: taskItem.style.textDecoration === "line-through"
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const taskElement = createTaskElement(task.text, task.completed);
    taskList.appendChild(taskElement);
  });
}


