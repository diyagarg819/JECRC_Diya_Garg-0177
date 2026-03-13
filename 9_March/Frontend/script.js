const apiUrl = "http://localhost:5107/api/todo";

let allTasks = [];
let currentFilter = "all";

// Load tasks
function loadTasks() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      allTasks = data;
      applyFilterAndSearch();
    });
}

// Display tasks
function displayTasks(tasks) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = `<li style="border:none;background:none;box-shadow:none;">
      <div class="empty">No tasks to show.</div>
    </li>`;
    updateFooter();
    return;
  }

  tasks.forEach(task => {
    const li = document.createElement("li");
    if (task.isCompleted) li.classList.add("completed");

    li.innerHTML = `
      <div class="task-check" onclick="toggleComplete(${task.id}, '${escHtml(task.title)}', ${task.isCompleted})">
        ${task.isCompleted ? "✓" : ""}
      </div>
      <span class="task-text">${escHtml(task.title)}</span>
      <div class="task-actions">
        <button class="task-btn edit" onclick="openEditModal(${task.id}, '${escHtml(task.title)}', ${task.isCompleted})">Edit</button>
        <button class="task-btn del"  onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;

    list.appendChild(li);
  });

  updateFooter();
}

// Add task
function addTask() {
  const input = document.getElementById("taskInput");
  const title = input.value.trim();
  if (title === "") return;

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: title, isCompleted: false })
  }).then(() => {
    input.value = "";
    loadTasks();
  });
}

// Delete task
function deleteTask(id) {
  fetch(apiUrl + "/" + id, { method: "DELETE" })
    .then(() => loadTasks());
}

// Toggle complete
function toggleComplete(id, title, status) {
  fetch(apiUrl + "/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id, title: title, isCompleted: !status })
  }).then(() => loadTasks());
}

// Edit task — modal instead of prompt
function openEditModal(id, oldTitle, status) {
  document.getElementById("editModal")?.remove();

  const overlay = document.createElement("div");
  overlay.id = "editModal";
  overlay.innerHTML = `
    <div class="modal-backdrop" onclick="closeEditModal()"></div>
    <div class="modal-box">
      <h3>Edit Task</h3>
      <input class="modal-input" id="editInput" type="text" value="${escHtml(oldTitle)}" autocomplete="off">
      <div class="modal-actions">
        <button class="modal-cancel" onclick="closeEditModal()">Cancel</button>
        <button class="modal-save"   onclick="saveEdit(${id}, ${status})">Save</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add("visible"));

  const inp = document.getElementById("editInput");
  inp.focus();
  inp.select();
  inp.addEventListener("keydown", e => {
    if (e.key === "Enter")  saveEdit(id, status);
    if (e.key === "Escape") closeEditModal();
  });
}

function closeEditModal() {
  const m = document.getElementById("editModal");
  if (m) { m.classList.remove("visible"); setTimeout(() => m.remove(), 200); }
}

function saveEdit(id, status) {
  const newTitle = document.getElementById("editInput").value.trim();
  if (!newTitle) return;

  fetch(apiUrl + "/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id, title: newTitle, isCompleted: status })
  }).then(() => {
    closeEditModal();
    loadTasks();
  });
}

// Filter tasks
function filterTasks(type, el) {
  currentFilter = type;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  if (el) el.classList.add("active");
  applyFilterAndSearch();
}

// Search tasks
function searchTask() {
  applyFilterAndSearch();
}

// Apply filter + search together
function applyFilterAndSearch() {
  const text = document.getElementById("search").value.toLowerCase();

  let tasks = [...allTasks];

  if (currentFilter === "active")    tasks = tasks.filter(t => !t.isCompleted);
  if (currentFilter === "completed") tasks = tasks.filter(t =>  t.isCompleted);

  if (text) tasks = tasks.filter(t => t.title.toLowerCase().includes(text));

  displayTasks(tasks);
}

// Update footer counts
function updateFooter() {
  const total = allTasks.length;
  const done  = allTasks.filter(t => t.isCompleted).length;
  const countEl = document.getElementById("taskCount");
  const doneEl  = document.getElementById("completedCount");
  if (countEl) countEl.textContent = total + (total === 1 ? " task" : " tasks");
  if (doneEl)  doneEl.textContent  = done + " done";
}

// Dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Escape HTML to prevent XSS
function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Start
loadTasks();