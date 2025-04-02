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

function addTask() {
  const taskText = newTaskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const taskItem = document.createElement("li");
  taskItem.textContent = taskText;
  taskItem.className = "list-group-item";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "btn btn-danger list-group-item-action";
  
  const completeButton = document.createElement("button");
  completeButton.textContent = "Complete";
  completeButton.className = "btn btn-secondary list-group-item-action";
  
  taskItem.appendChild(completeButton);
  taskItem.appendChild(deleteButton);

  taskList.appendChild(taskItem);

  deleteButton.addEventListener("click", function() {
    deleteTask(taskItem);
    alert("Task deleted successfully.");
  });

  completeButton.addEventListener("click", function() {
    completeTask(taskItem);
    alert("Task marked as complete.");
  });

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

function loadTasks(){
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task)=>{
    const taskItem = document.createElement("li");
    taskItem.textContent = task.text;

    if(task.completed) {
      taskItem.style.textDecoration = "line-through";
      taskItem.style.color = "gray";
    }
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";

    taskItem.appendChild(completeButton);
    taskItem.appendChild(deleteButton);
  
    taskList.appendChild(taskItem);

    deleteButton.addEventListener("click", function() {
      deleteTask(taskItem);
    });

    completeButton.addEventListener("click", function() {
      completeTask(taskItem);
    });
  })
}


