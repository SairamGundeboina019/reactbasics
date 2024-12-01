const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded, loadTasks");


//add a new task when the "Add" button is clicked
addTaskButton.addEventListener("click", () => {
  const task = taskInput.value.tirm();
  if (task) {
    addTask();
    saveTasks();
    taskInput.value = "";
  
  }
});

function addTask(task) {
  const li = document.createElement("li");
  li.innerHTML = `
  <span>${task}</span>
  <button class = "delete-btn">Delete</button>
  `;

  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
    saveTasks();
  
  });

  taskList.appendChild(li);


}

//saves tasks to local storage

function saveTasks() {
  const tasks = Array.from(taskList.children).map(li =>li.querySelector("span").innerText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTask(task));
}