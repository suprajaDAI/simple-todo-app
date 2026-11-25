// Key used to store tasks in the browser's localStorage
const STORAGE_KEY = "simple-todo-tasks";

// Grab the elements we need from the page
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");
const counter = document.getElementById("counter");

// Load saved tasks (or start with an empty list)
let tasks = loadTasks();

// ---------- Storage helpers ----------

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return []; // storage unavailable or data corrupted
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Ignore — the app still works, it just won't remember tasks
  }
}

// ---------- Actions ----------

function addTask(text) {
  tasks.push({ id: Date.now(), text, done: false });
  saveTasks();
  render();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) task.done = !task.done;
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  render();
}

// ---------- Rendering ----------

function render() {
  list.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task" + (task.done ? " done" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", "Mark task complete");
    checkbox.addEventListener("change", () => toggleTask(task.id));

    // textContent (not innerHTML) keeps user input safe
    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "✕";
    deleteBtn.setAttribute("aria-label", "Delete task");
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    li.append(checkbox, span, deleteBtn);
    list.appendChild(li);
  });

  const remaining = tasks.filter((t) => !t.done).length;
  emptyMessage.hidden = tasks.length > 0;
  counter.textContent = tasks.length
    ? `${remaining} of ${tasks.length} task${tasks.length === 1 ? "" : "s"} left`
    : "";
}

// ---------- Events ----------

form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading
  const text = input.value.trim();
  if (text) {
    addTask(text);
    input.value = "";
  }
  input.focus();
});

// Initial draw
render();
