let colors = [
  "#f4b400", // Gelb
  "#9333ea", // Lila
  "#ef4444", // Rot
  "#f97316"  // Orange
];

let boardSearchTerm = "";

function renderBoard() {
  const content = document.getElementById("board-content");
  content.innerHTML = getBoardTemplate();
  initBoardSearch();
  renderTasksIntoColumns();
  updateNoTaskPlaceholders();
  renderAllAvatars();
}

function initBoardSearch() {
  const input = document.getElementById("search-task");
  const clearBtn = document.getElementById("search-clear");
  if (!input) return;
  input.value = boardSearchTerm;
  input.oninput = () => updateBoardSearch(input, clearBtn);
  if (clearBtn) {
    clearBtn.onclick = () => clearBoardSearch(input, clearBtn);
    clearBtn.style.visibility = boardSearchTerm ? "visible" : "hidden";
  }
}

function updateBoardSearch(input, clearBtn) {
  boardSearchTerm = input.value.trim();
  clearTaskCards();
  renderTasksIntoColumns();
  updateNoTaskPlaceholders();
  renderAllAvatars();
  if (clearBtn) clearBtn.style.visibility = boardSearchTerm ? "visible" : "hidden";
}

function clearBoardSearch(input, clearBtn) {
  boardSearchTerm = "";
  input.value = "";
  clearTaskCards();
  renderTasksIntoColumns();
  updateNoTaskPlaceholders();
  renderAllAvatars();
  if (clearBtn) clearBtn.style.visibility = boardSearchTerm ? "visible" : "hidden";
  input.focus();
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
  const term = boardSearchTerm.toLowerCase();
  if (!term) return tasks;
  return tasks.filter((task) => {
    const contactsText = Array.isArray(task.contacts) ? task.contacts.join(" ") : "";
    const subtasksText = Array.isArray(task.subtasks) ? task.subtasks.map(st => st.title || "").join(" ") : "";
    const haystack = [task.title, task.description, task.category, task.priority, task.status, task.dueDate, contactsText, subtasksText].join(" ").toLowerCase();
    return haystack.includes(term);
  });
}

function highlightText(text) {
  if (!boardSearchTerm) return text;
  if (!text) return "";
  const escaped = escapeRegExp(boardSearchTerm);
  const regex = new RegExp(escaped, "gi");
  return text.replace(regex, (match) => `<mark class="search-highlight">${match}</mark>`);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function loadTasks() {
  try {
    const response = await fetch(`${BASE_URL}/tasks.json`);
    const data = await response.json();
    tasks = data ? Object.entries(data).map(([id, task]) => ({ firebaseId: id, ...task })) : [];
  } catch (error) {
    console.error("Fehler beim Laden der Tasks:", error);
  }
  renderBoard();
}

async function updateTask(task) {
  try {
    const { firebaseId, ...taskData } = task;
    await fetch(`${BASE_URL}/tasks/${firebaseId}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
  } catch (error) {
    console.error("Fehler beim Updaten des Tasks:", error);
  }
}

async function deleteTask() {
  if (!activeTask) return;
  try {
    await fetch(`${BASE_URL}/tasks/${activeTask.firebaseId}.json`, { method: "DELETE" });
    tasks = tasks.filter(t => t.firebaseId !== activeTask.firebaseId);
    closeModal();
    renderBoard();
  } catch (error) {
    console.error("Fehler beim Löschen des Tasks:", error);
  }
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

function openModal(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  activeTask = task;
  const oldModal = document.getElementById("taskModal");
  if (oldModal) oldModal.remove();
  const modal = document.createElement("div");
  modal.id = "taskModal"; modal.className = "modal";
  modal.innerHTML = getTaskModalTemplate(task);
  document.body.appendChild(modal); modal.style.display = "flex";
  setTimeout(() => updateModalSubtasks(task), 0);
  setTimeout(() => {
    const modalContent = modal.querySelector(".modal-content");
    if (modalContent) modalContent.style.transform = "translateX(0)";
  }, 10);
}

async function toggleSubtaskDone(taskId, subIndex, checkbox) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;
  task.subtasks[subIndex].done = checkbox.checked;
  await updateTask(task);
  renderBoard();
  updateModalSubtasks(task);
}

function updateModalSubtasks(task) {
  const modal = document.getElementById("taskModal");
  if (!modal) return;
  const subtaskContainer = modal.querySelector(".modal-subtasks");
  if (!subtaskContainer) return;
  subtaskContainer.innerHTML = generateModalSubtasks(task);
}

async function openEditTaskModal(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  activeTask = task;
  editSubtasks = task.subtasks.map(st => ({ ...st }));
  selectedContacts = [...task.contacts];
  window.editingEditSubtaskIndex = null;
  const modal = document.getElementById("taskModal");
  const modalContent = modal.querySelector(".modal-content");
  modalContent.innerHTML = generateEditTaskTemplate(task);
  await loadContacts();
  renderEditAssignedContacts();
  renderEditSubtasks();
  initEditDropdownClose();
}

function renderEditAssignedContacts() {
  const dropdown = document.getElementById("dropdownContacts");
  if (!dropdown) return;
  dropdown.innerHTML = generateAssignedContacts(contacts);
  renderSelectedAvatars();
}

function toggleEditCategoryDropdown(event) {
  event.stopPropagation();
  const dropdown = document.getElementById("editCategoryDropdown");
  if (!dropdown) return;
  dropdown.classList.toggle("show");
}

function setEditCategory(value) {
  const input = document.getElementById("edit-category");
  const select = document.getElementById("editCategorySelect");
  if (!input || !select) return;
  input.value = value;
  const label = select.querySelector("span");
  if (label) {
    label.childNodes[0].textContent = value + " ";
  }
  const dropdown = document.getElementById("editCategoryDropdown");
  if (dropdown) dropdown.classList.remove("show");
}

function initEditDropdownClose() {
  if (window.editDropdownHandlerAdded) return;
  window.editDropdownHandlerAdded = true;
  document.addEventListener("click", () => {
    const contactsDropdown = document.getElementById("dropdownContacts");
    if (contactsDropdown) contactsDropdown.classList.remove("show");
    const categoryDropdown = document.getElementById("editCategoryDropdown");
    if (categoryDropdown) categoryDropdown.classList.remove("show");
  });
}

function renderEditSubtasks() {
  const area = document.getElementById("editSubtaskArea");
  if (!area) return;
  area.innerHTML = "";
  editSubtasks.forEach((st, i) => appendEditSubtask(area, st, i));
}

function appendEditSubtask(area, subtask, index) {
  const isEditing = window.editingEditSubtaskIndex === index;
  const markup = isEditing
    ? getEditSubtaskEditMarkup(subtask, index)
    : getEditSubtaskItemMarkup(subtask, index);
  area.innerHTML += markup;
}

function addEditSubtask() {
  const input = document.getElementById("edit-subtask-input");
  if (!input) return;
  const value = input.value.trim();
  if (!value) return;
  editSubtasks.push({ title: value, done: false });
  input.value = "";
  renderEditSubtasks();
}

function deleteEditSubtask(i) {
  editSubtasks.splice(i, 1);
  if (window.editingEditSubtaskIndex === i) {
    window.editingEditSubtaskIndex = null;
  } else if (typeof window.editingEditSubtaskIndex === "number" && i < window.editingEditSubtaskIndex) {
    window.editingEditSubtaskIndex -= 1;
  }
  renderEditSubtasks();
}

function clearEditSubtaskInput() {
  const input = document.getElementById("edit-subtask-input");
  if (!input) return;
  input.value = "";
  input.focus();
}

function editEditSubtask(i) {
  window.editingEditSubtaskIndex = i;
  renderEditSubtasks();
  const input = document.getElementById(`edit-subtask-edit-${i}`);
  if (input) {
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }
}

function saveEditedEditSubtask(i) {
  const input = document.getElementById(`edit-subtask-edit-${i}`);
  if (!input) return;
  const value = input.value.trim();
  if (!value) {
    alert("Bitte eine Subtask beschreiben!");
    return;
  }
  editSubtasks[i].title = value;
  window.editingEditSubtaskIndex = null;
  renderEditSubtasks();
}

async function saveEditedTask(event, id) {
  event.preventDefault();
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  updateTaskFromEditForm(task);
  await updateTask(task);
  renderBoard();
  openModal(id);
}

function updateTaskFromEditForm(task) {
  const titleEl = document.getElementById("edit-title");
  const descEl = document.getElementById("edit-description");
  task.title = titleEl ? titleEl.value.trim() : "";
  task.description = descEl ? descEl.value.trim() : "";
  task.dueDate = document.getElementById("edit-date").value;
  task.category = document.getElementById("edit-category").value;
  task.priority = document.querySelector('input[name="edit-priority"]:checked').value;
  task.contacts = [...selectedContacts];
  task.subtasks = editSubtasks.map(st => ({ ...st }));
}

async function showAddTaskDialog() {
  const modalContent = document.getElementById("addTask-dialog-message");
  document.getElementById("addTask-dialog").classList.remove("d-none");
  modalContent.innerHTML = generateAddTask();
  await loadContacts();
  selectedContacts = [];
  selectContacts();
  renderSelectedAvatars();
  if (typeof initAddDropdownClose === "function") initAddDropdownClose();
}

function closeAddTaskDialog() {
  document.getElementById("addTask-dialog").classList.add("d-none");
}

function updateNoTaskPlaceholders() {
  const filteredTasks = getFilteredTasks();
  const columns = [
    { id: "todo-column", status: "To Do" },
    { id: "inprogress-column", status: "In Progress" },
    { id: "awaiting-column", status: "Await Feedback" },
    { id: "done-column", status: "Done" }
  ];
  for (let i = 0; i < columns.length; i++) {
    const columnElement = document.getElementById(columns[i].id);
    if (!columnElement) continue;
    const placeholder = columnElement.querySelector(".no-tasks");
    if (!placeholder) continue;
    placeholder.style.display = filteredTasks.some(task => task.status === columns[i].status) ? "none" : "flex";
  }
}

function closeModal() {
  const modal = document.getElementById("taskModal");
  if (modal) modal.remove();
  activeTask = null;
}
