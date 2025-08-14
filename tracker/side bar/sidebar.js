// ======== Elements ========
// ======== Elements ========
const panels = {
  todo: null,
  notes: null,
  notification: null,
  settings: null
};

// Sidebar buttons
const homeBtn = document.querySelector(".icon-button.home");
const todoBtn = document.querySelector(".icon-button.task");
const notesBtn = document.querySelector(".icon-button.notes");
const notifBtn = document.querySelector(".icon-button.notification");
const settingsBtn = document.querySelector(".icon-button.settings");

// Notification badge
const notifBadge = notifBtn.querySelector(".notif-badge");

// Profile
const profileBtn = document.querySelector(".profile-pic");

// ======== Panel Setup ========
function createPanel(id, content) {
  const panel = document.createElement("div");
  panel.className = "panel";
  panel.id = id;
  panel.innerHTML = content;
  document.body.appendChild(panel);
  return panel;
}

panels.todo = createPanel("todo-panel", `
  <h2>To-Do List</h2>
  <input type="text" id="todo-input" placeholder="Add a task">
  <button id="add-todo">Add Task</button>
  <ul id="todo-list"></ul>
`);

panels.notes = createPanel("notes-panel", `
  <h2>Notes</h2>
  <textarea id="notes-text" rows="15" placeholder="Write your notes..."></textarea>
  <button id="save-notes">Save Notes</button>
`);

panels.notification = createPanel("notif-panel", `
  <h2>Notifications</h2>
  <ul id="notif-list"></ul>
`);

panels.settings = createPanel("settings-panel", `
  <h2>Settings</h2>
  <p>Web version: 1.0.0</p>
  <p>Terms & Conditions: [link]</p>
  <button id="customize-btn">Customize (Testing)</button>
  <div id="user-details">
    <p id="user-name">User Name: Guest</p>
    <p id="user-email">Email: -</p>
  </div>
`);

// ======== Panel Switch Function ========
function showPanel(panelKey) {
  Object.keys(panels).forEach(key => {
    panels[key].classList.toggle("active", key === panelKey);
  });
}

// ======== Button Events ========
homeBtn.addEventListener("click", () => {
  window.location.href = "index.html"; // Redirect to homepage
});

todoBtn.addEventListener("click", () => showPanel("todo"));
notesBtn.addEventListener("click", () => showPanel("notes"));
notifBtn.addEventListener("click", () => showPanel("notification"));
settingsBtn.addEventListener("click", () => showPanel("settings"));
// Close panels when clicking outside
document.addEventListener("click", (e) => {
  const activePanels = Object.values(panels).filter(panel => panel.classList.contains("active"));

  activePanels.forEach(panel => {
    // If the click is NOT inside the panel or on a sidebar button
    if (!panel.contains(e.target) && !e.target.closest(".nav-buttons") && !e.target.closest(".bottom-section")) {
      panel.classList.remove("active");
    }
  });
});


// ======== Profile Login/Register ========
// When user sets profile info
// Profile click event
profileBtn.addEventListener("click", () => {
  let email = prompt("Enter your email:");
  if (!email) return; // user canceled
  let name = prompt("Enter your name:");
  if (!name) return;

  // Save to localStorage
  localStorage.setItem("userName", name);
  localStorage.setItem("userEmail", email);

  // Update sidebar profile circle
  const firstLetter = name.charAt(0).toUpperCase();
  profileBtn.innerHTML = `<div>${firstLetter}</div>`;

  // Update top-bar greeting
  updateTopBarGreeting();
});


// ======== To-Do Logic ========
const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");

function loadTodos() {
  const today = new Date().toLocaleDateString();
  const savedDate = localStorage.getItem("todo-date");
  if (savedDate !== today) {
    localStorage.setItem("todos", JSON.stringify([]));
    localStorage.setItem("todo-date", today);
  }
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");
  todoList.innerHTML = "";
  todos.forEach((t, i) => {
    const li = document.createElement("li");
    li.textContent = t;

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.addEventListener("click", () => removeTodoAnimated(li, i));
    li.appendChild(del);

    todoList.appendChild(li);
  });
}

function addTodo() {
  const value = todoInput.value.trim();
  if (!value) return;
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");
  todos.push(value);
  localStorage.setItem("todos", JSON.stringify(todos));
  todoInput.value = "";
  loadTodos();
}

// Animated remove
function removeTodoAnimated(li, index) {
  li.classList.add("removing");
  li.addEventListener("animationend", () => {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    loadTodos();
  });
}

addTodoBtn.addEventListener("click", addTodo);
loadTodos();

// ======== Notes Logic ========
const notesText = document.getElementById("notes-text");
const saveNotesBtn = document.getElementById("save-notes");

// Load saved notes
notesText.value = localStorage.getItem("notes") || "";

saveNotesBtn.addEventListener("click", () => {
  localStorage.setItem("notes", notesText.value);
  alert("Notes saved!");
});

// ======== Notifications Logic ========
function loadNotifications() {
  const notifications = JSON.parse(localStorage.getItem("notifications") || "[]");
  const notifUl = document.getElementById("notif-list");
  notifUl.innerHTML = "";
  notifications.forEach(n => {
    const li = document.createElement("li");
    li.textContent = n;
    notifUl.appendChild(li);
  });
  notifBadge.textContent = notifications.length;
  notifBadge.setAttribute("data-count", notifications.length);
}

function sendNotification(msg) {
  const notifications = JSON.parse(localStorage.getItem("notifications") || "[]");
  notifications.push(msg);
  localStorage.setItem("notifications", JSON.stringify(notifications));
  loadNotifications();
}

loadNotifications();

// Example notification from developer
setTimeout(() => sendNotification("Welcome to your dashboard!"), 1000);
