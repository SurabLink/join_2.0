// Farbpalette für zufällige Auswahl
let colors = [
  "#f4b400", // Gelb
  "#9333ea", // Lila
  "#ef4444", // Rot
  "#f97316"  // Orange
];

let boardSearchTerm = "";

function initBoardSearch() {
  const input = getSearchInput();
  const clearBtn = getSearchClearButton();
  if (!input) return;

  setSearchInputValue(input);
  bindSearchInput(input, clearBtn);
  bindSearchClearButton(input, clearBtn);
}

function getSearchInput() {
  return document.getElementById("search-task");
}

function getSearchClearButton() {
  return document.getElementById("search-clear");
}

function setSearchInputValue(input) {
  input.value = boardSearchTerm;
}

function bindSearchInput(input, clearBtn) {
  input.oninput = () => handleSearchInput(input, clearBtn);
}

function handleSearchInput(input, clearBtn) {
  boardSearchTerm = input.value.trim();
  applySearchFilter();
  updateSearchClearButton(clearBtn);
}

function bindSearchClearButton(input, clearBtn) {
  if (!clearBtn) return;
  clearBtn.onclick = () => handleSearchClear(input, clearBtn);
  updateSearchClearButton(clearBtn);
}

function handleSearchClear(input, clearBtn) {
  boardSearchTerm = "";
  input.value = "";
  applySearchFilter();
  updateSearchClearButton(clearBtn);
  input.focus();
}

function updateSearchClearButton(button) {
  if (!button) return;
  button.style.visibility = boardSearchTerm ? "visible" : "hidden";
}

function applySearchFilter() {
  clearTaskCards();
  renderTasksIntoColumns();
  updateNoTaskPlaceholders();
  renderAllAvatars();
}

function clearTaskCards() {
  const cards = document.querySelectorAll(".task-card");
  cards.forEach((card) => card.remove());
}

function renderTasksIntoColumns() {
  const filteredTasks = getFilteredTasks();
  for (let i = 0; i < filteredTasks.length; i++) {
    const task = filteredTasks[i];
    const column = getColumnByStatus(task.status);
    if (!column) continue;
    column.innerHTML += createTaskCard(task);
  }
}

function getColumnByStatus(status) {
  if (status === "To Do") return document.getElementById("todo-column");
  if (status === "In Progress") return document.getElementById("inprogress-column");
  if (status === "Await Feedback") return document.getElementById("awaiting-column");
  if (status === "Done") return document.getElementById("done-column");
  return null;
}

function renderAllAvatars() {
  const filteredTasks = getFilteredTasks();
  for (let i = 0; i < filteredTasks.length; i++) {
    renderAvatar(filteredTasks[i]);
  }
}

function getFilteredTasks() {
  const term = getSearchTermLower();
  if (!term) return tasks;
  return tasks.filter((task) => isTaskMatch(task, term));
}

function getSearchTermLower() {
  return boardSearchTerm.toLowerCase();
}

function isTaskMatch(task, term) {
  return getTaskSearchText(task).includes(term);
}

function getTaskSearchText(task) {
  return getTaskSearchParts(task).join(" ").toLowerCase();
}

function getTaskSearchParts(task) {
  return [
    task.title,
    task.description,
    task.category,
    task.priority,
    task.status,
    task.dueDate,
    getContactsText(task.contacts),
    getSubtasksText(task.subtasks),
  ];
}

function getContactsText(contacts) {
  return Array.isArray(contacts) ? contacts.join(" ") : "";
}

function getSubtasksText(subtasks) {
  if (!Array.isArray(subtasks)) return "";
  return subtasks.map(st => st.title || "").join(" ");
}

function highlightText(text) {
  if (!boardSearchTerm) return text;
  if (!text) return "";

  const escaped = escapeRegExp(boardSearchTerm);
  const regex = new RegExp(escaped, "gi");
  return text.replace(regex, (match) => getHighlightedText(match));
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\]/g, "\$&");
}

function renderAvatar(task) {
  let container = document.getElementById(`avatars-${task.id}`);
  if (!container) return;

  container.innerHTML = "";
  let contacts = Array.isArray(task.contacts) ? task.contacts : [];

  for (let i = 0; i < contacts.length; i++) {
    const name = contacts[i];
    if (!name) continue;

    const initials = name.split(" ").map(n => n[0]).join("");
    container.innerHTML += getAvatarMarkup(initials, getRandomColor());
  }
}

function renderSubtaskProgress(task) {
  if (!task.subtasks || task.subtasks.length === 0) {
    return getEmptySubtaskProgress();
  }

  const done = task.subtasks.filter(st => st.done).length;
  const total = task.subtasks.length;
  const percent = Math.round((done / total) * 100);

  return getSubtaskProgressMarkup(done, total, percent);
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function startDrag(id) {
  draggedTaskId = id;
}

function allowDrop(event) {
  event.preventDefault();
}

function dropTask(event, newStatus) {
  event.preventDefault();

  const task = tasks.find(t => t.id === draggedTaskId);
  if (!task) return;

  task.status = newStatus;
  updateTask(task);
  renderBoard();
}

function updateNoTaskPlaceholders() {
  const filteredTasks = getFilteredTasks();
  getNoTaskPlaceholderConfigs().forEach(config => {
    updateNoTaskPlaceholderState(config, filteredTasks);
  });
}

function getNoTaskPlaceholderConfigs() {
  return [
    { id: "todo-column", status: "To Do" },
    { id: "inprogress-column", status: "In Progress" },
    { id: "awaiting-column", status: "Await Feedback" },
    { id: "done-column", status: "Done" },
  ];
}

function updateNoTaskPlaceholderState(config, tasksList) {
  const columnElement = document.getElementById(config.id);
  if (!columnElement) return;
  const placeholder = columnElement.querySelector(".no-tasks");
  if (!placeholder) return;
  const hasTasks = tasksList.some(task => task.status === config.status);
  placeholder.style.display = hasTasks ? "none" : "flex";
}
