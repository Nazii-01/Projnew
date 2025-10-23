const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskTable = document.getElementById("taskTable");

let tasks = [];

addBtn.addEventListener("click", () => {
  const taskName = taskInput.value.trim();
  if (taskName === "") return;

  const task = { name: taskName, status: "Pending" };
  tasks.push(task);
  taskInput.value = "";
  displayTasks();
});

function displayTasks() {
  taskTable.innerHTML = "";

  tasks.forEach((task, index) => {
    const row = document.createElement("tr");

    // Task name
    const nameCell = document.createElement("td");
    nameCell.textContent = task.name;

    // Status
    const statusCell = document.createElement("td");
    statusCell.textContent = task.status;
    statusCell.classList.add("status");
    statusCell.classList.add(task.status.toLowerCase().replace(" ", ""));

    // Change status button
    const changeCell = document.createElement("td");
    const changeBtn = document.createElement("button");
    changeBtn.textContent = "Change";
    changeBtn.classList.add("change");
    changeBtn.onclick = () => changeStatus(index);
    changeCell.appendChild(changeBtn);

    // Remove button
    const removeCell = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.classList.add("remove");
    removeBtn.onclick = () => removeTask(index);
    removeCell.appendChild(removeBtn);

    row.appendChild(nameCell);
    row.appendChild(statusCell);
    row.appendChild(changeCell);
    row.appendChild(removeCell);

    taskTable.appendChild(row);
  });
}

function changeStatus(index) {
  const current = tasks[index].status;
  if (current === "Pending") tasks[index].status = "In Progress";
  else if (current === "In Progress") tasks[index].status = "Completed";
  else tasks[index].status = "Pending"; // cycle back
  displayTasks();
}

function removeTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}
