let colors = [
  "#f4b400", // Gelb
  "#9333ea", // Lila
  "#ef4444", // Rot
  "#f97316"  // Orange
];

let boardSearchTerm = "";

/**
 * Handles renderBoard.
 * @returns {*} Result.
 */
/**
 * Renders board.
 * @returns {void} Result.
 */
function renderBoard() {
  const content = document.getElementById("board-content");
  content.innerHTML = getBoardTemplate();
  initBoardSearch();
  renderTasksIntoColumns();
  updateNoTaskPlaceholders();
  renderAllAvatars();
}

/**
 * Handles initBoardSearch.
 * @returns {*} Result.
 */
/**
 * Initializes board search.
 * @returns {void} Result.
 */
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

/**
 * Handles updateBoardSearch.
 * @param {*} input - Parameter.
 * @param {*} clearBtn - Parameter.
 * @returns {*} Result.
 */
/**
 * Updates board search.
 * @param {HTMLElement} input - Input element.
 * @param {*} clearBtn - Parameter.
 * @returns {void} Result.
 */
function updateBoardSearch(input, clearBtn) {
  boardSearchTerm = input.value.trim();
  clearTaskCards();
  renderTasksIntoColumns();
  updateNoTaskPlaceholders();
  renderAllAvatars();
  if (clearBtn) clearBtn.style.visibility = boardSearchTerm ? "visible" : "hidden";
}

/**
 * Handles clearBoardSearch.
 * @param {*} input - Parameter.
 * @param {*} clearBtn - Parameter.
 * @returns {*} Result.
 */
/**
 * Clears board search.
 * @param {HTMLElement} input - Input element.
 * @param {*} clearBtn - Parameter.
 * @returns {void} Result.
 */
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

/**
 * Handles clearTaskCards.
 * @returns {*} Result.
 */
/**
 * Clears task cards.
 * @returns {void} Result.
 */
function clearTaskCards() {
  const cards = document.querySelectorAll(".task-card");
  cards.forEach((card) => card.remove());
}

/**
 * Handles renderTasksIntoColumns.
 * @returns {*} Result.
 */
/**
 * Renders tasks into columns.
 * @returns {void} Result.
 */
function renderTasksIntoColumns() {
  const filteredTasks = getFilteredTasks();
  for (let i = 0; i < filteredTasks.length; i++) {
    const task = filteredTasks[i];
    const column = getColumnByStatus(task.status);
    if (!column) continue;
    column.innerHTML += createTaskCard(task);
  }
}

/**
 * Handles getColumnByStatus.
 * @param {*} status - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns column by status.
 * @param {string} status - Status value.
 * @returns {*} Result.
 */
function getColumnByStatus(status) {
  if (status === "To Do") return document.getElementById("todo-column");
  if (status === "In Progress") return document.getElementById("inprogress-column");
  if (status === "Await Feedback") return document.getElementById("awaiting-column");
  if (status === "Done") return document.getElementById("done-column");
  return null;
}

/**
 * Handles renderAllAvatars.
 * @returns {*} Result.
 */
/**
 * Renders all avatars.
 * @returns {void} Result.
 */
function renderAllAvatars() {
  const filteredTasks = getFilteredTasks();
  for (let i = 0; i < filteredTasks.length; i++) {
    renderAvatar(filteredTasks[i]);
  }
}

/**
 * Handles getFilteredTasks.
 * @returns {*} Result.
 */
/**
 * Returns filtered tasks.
 * @returns {*} Result.
 */
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

/**
 * Handles highlightText.
 * @param {*} text - Parameter.
 * @returns {*} Result.
 */
/**
 * Handles highlight text.
 * @param {*} text - Parameter.
 * @returns {void} Result.
 */
function highlightText(text) {
  if (!boardSearchTerm) return text;
  if (!text) return "";
  const escaped = escapeRegExp(boardSearchTerm);
  const regex = new RegExp(escaped, "gi");
  return text.replace(regex, (match) => `<mark class="search-highlight">${match}</mark>`);
}

/**
 * Handles escapeRegExp.
 * @param {*} value - Parameter.
 * @returns {*} Result.
 */
/**
 * Handles escape reg exp.
 * @param {string} value - Value.
 * @returns {void} Result.
 */
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Handles loadTasks.
 * @returns {Promise<*>} Result promise.
 */
/**
 * Loads tasks.
 * @returns {Promise<*>} Result.
 */
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

/**
 * Handles updateTask.
 * @param {*} task - Parameter.
 * @returns {Promise<*>} Result promise.
 */
/**
 * Updates task.
 * @param {Object} task - Task object.
 * @returns {Promise<*>} Result.
 */
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

/**
 * Handles deleteTask.
 * @returns {Promise<*>} Result promise.
 */
/**
 * Deletes task.
 * @returns {Promise<*>} Result.
 */
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

/**
 * Handles renderAvatar.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Renders avatar.
 * @param {Object} task - Task object.
 * @returns {void} Result.
 */
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

/**
 * Handles getRandomColor.
 * @returns {*} Result.
 */
/**
 * Returns random color.
 * @returns {*} Result.
 */
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Handles startDrag.
 * @param {*} id - Parameter.
 * @returns {*} Result.
 */
/**
 * Handles start drag.
 * @param {string} id - Identifier.
 * @returns {void} Result.
 */
function startDrag(id) {
  draggedTaskId = id;
}

/**
 * Handles allowDrop.
 * @param {*} event - Parameter.
 * @returns {*} Result.
 */
/**
 * Handles allow drop.
 * @param {Event} event - DOM event.
 * @returns {void} Result.
 */
function allowDrop(event) {
  event.preventDefault();
}

/**
 * Handles dropTask.
 * @param {*} event - Parameter.
 * @param {*} newStatus - Parameter.
 * @returns {*} Result.
 */
/**
 * Handles drop task.
 * @param {Event} event - DOM event.
 * @param {*} newStatus - Parameter.
 * @returns {void} Result.
 */
function dropTask(event, newStatus) {
  event.preventDefault();
  const task = tasks.find(t => t.id === draggedTaskId);
  if (!task) return;
  task.status = newStatus;
  updateTask(task);
  renderBoard();
}

/**
 * Handles openModal.
 * @param {*} id - Parameter.
 * @returns {*} Result.
 */
/**
 * Opens modal.
 * @param {string} id - Identifier.
 * @returns {void} Result.
 */
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

/**
 * Handles toggleSubtaskDone.
 * @param {*} taskId - Parameter.
 * @param {*} subIndex - Parameter.
 * @param {*} checkbox - Parameter.
 * @returns {Promise<*>} Result promise.
 */
/**
 * Toggles subtask done.
 * @param {number} taskId - Task identifier.
 * @param {number} subIndex - Subtask index.
 * @param {HTMLInputElement} checkbox - Checkbox element.
 * @returns {Promise<*>} Result.
 */
async function toggleSubtaskDone(taskId, subIndex, checkbox) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;
  task.subtasks[subIndex].done = checkbox.checked;
  await updateTask(task);
  renderBoard();
  updateModalSubtasks(task);
}

/**
 * Handles updateModalSubtasks.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Updates modal subtasks.
 * @param {Object} task - Task object.
 * @returns {void} Result.
 */
function updateModalSubtasks(task) {
  const modal = document.getElementById("taskModal");
  if (!modal) return;
  const subtaskContainer = modal.querySelector(".modal-subtasks");
  if (!subtaskContainer) return;
  subtaskContainer.innerHTML = generateModalSubtasks(task);
}

/**
 * Handles openEditTaskModal.
 * @param {*} id - Parameter.
 * @returns {Promise<*>} Result promise.
 */
/**
 * Opens edit task modal.
 * @param {string} id - Identifier.
 * @returns {Promise<*>} Result.
 */
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

/**
 * Handles renderEditAssignedContacts.
 * @returns {*} Result.
 */
/**
 * Renders edit assigned contacts.
 * @returns {void} Result.
 */
function renderEditAssignedContacts() {
  const dropdown = document.getElementById("dropdownContacts");
  if (!dropdown) return;
  dropdown.innerHTML = generateAssignedContacts(contacts);
  renderSelectedAvatars();
}

/**
 * Handles toggleEditCategoryDropdown.
 * @param {*} event - Parameter.
 * @returns {*} Result.
 */
/**
 * Toggles edit category dropdown.
 * @param {Event} event - DOM event.
 * @returns {void} Result.
 */
function toggleEditCategoryDropdown(event) {
  event.stopPropagation();
  const dropdown = document.getElementById("editCategoryDropdown");
  if (!dropdown) return;
  dropdown.classList.toggle("show");
}

/**
 * Handles setEditCategory.
 * @param {*} value - Parameter.
 * @returns {*} Result.
 */
/**
 * Sets edit category.
 * @param {string} value - Value.
 * @returns {void} Result.
 */
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

/**
 * Handles initEditDropdownClose.
 * @returns {*} Result.
 */
/**
 * Initializes edit dropdown close.
 * @returns {void} Result.
 */
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

/**
 * Handles renderEditSubtasks.
 * @returns {*} Result.
 */
/**
 * Renders edit subtasks.
 * @returns {void} Result.
 */
function renderEditSubtasks() {
  const area = document.getElementById("editSubtaskArea");
  if (!area) return;
  area.innerHTML = "";
  editSubtasks.forEach((st, i) => appendEditSubtask(area, st, i));
}

/**
 * Handles appendEditSubtask.
 * @param {*} area - Parameter.
 * @param {*} subtask - Parameter.
 * @param {*} index - Parameter.
 * @returns {*} Result.
 */
/**
 * Handles append edit subtask.
 * @param {*} area - Parameter.
 * @param {Object} subtask - Subtask object.
 * @param {number} index - Index.
 * @returns {void} Result.
 */
function appendEditSubtask(area, subtask, index) {
  const isEditing = window.editingEditSubtaskIndex === index;
  const markup = isEditing
    ? getEditSubtaskEditMarkup(subtask, index)
    : getEditSubtaskItemMarkup(subtask, index);
  area.innerHTML += markup;
}

/**
 * Handles addEditSubtask.
 * @returns {*} Result.
 */
/**
 * Adds edit subtask.
 * @returns {void} Result.
 */
function addEditSubtask() {
  const input = document.getElementById("edit-subtask-input");
  if (!input) return;
  const value = input.value.trim();
  if (!value) return;
  editSubtasks.push({ title: value, done: false });
  input.value = "";
  renderEditSubtasks();
}

/**
 * Handles deleteEditSubtask.
 * @param {*} i - Parameter.
 * @returns {*} Result.
 */
/**
 * Deletes edit subtask.
 * @param {number} i - Index.
 * @returns {void} Result.
 */
function deleteEditSubtask(i) {
  editSubtasks.splice(i, 1);
  if (window.editingEditSubtaskIndex === i) {
    window.editingEditSubtaskIndex = null;
  } else if (typeof window.editingEditSubtaskIndex === "number" && i < window.editingEditSubtaskIndex) {
    window.editingEditSubtaskIndex -= 1;
  }
  renderEditSubtasks();
}

/**
 * Handles clearEditSubtaskInput.
 * @returns {*} Result.
 */
/**
 * Clears edit subtask input.
 * @returns {void} Result.
 */
function clearEditSubtaskInput() {
  const input = document.getElementById("edit-subtask-input");
  if (!input) return;
  input.value = "";
  input.focus();
}

/**
 * Handles editEditSubtask.
 * @param {*} i - Parameter.
 * @returns {*} Result.
 */
/**
 * Handles edit edit subtask.
 * @param {number} i - Index.
 * @returns {void} Result.
 */
function editEditSubtask(i) {
  window.editingEditSubtaskIndex = i;
  renderEditSubtasks();
  const input = document.getElementById(`edit-subtask-edit-${i}`);
  if (input) {
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }
}

/**
 * Handles saveEditedEditSubtask.
 * @param {*} i - Parameter.
 * @returns {*} Result.
 */
/**
 * Saves edited edit subtask.
 * @param {number} i - Index.
 * @returns {void} Result.
 */
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

/**
 * Handles saveEditedTask.
 * @param {*} event - Parameter.
 * @param {*} id - Parameter.
 * @returns {Promise<*>} Result promise.
 */
/**
 * Saves edited task.
 * @param {Event} event - DOM event.
 * @param {string} id - Identifier.
 * @returns {Promise<*>} Result.
 */
async function saveEditedTask(event, id) {
  event.preventDefault();
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  updateTaskFromEditForm(task);
  await updateTask(task);
  renderBoard();
  openModal(id);
}

/**
 * Handles updateTaskFromEditForm.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Updates task from edit form.
 * @param {Object} task - Task object.
 * @returns {void} Result.
 */
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

/**
 * Handles showAddTaskDialog.
 * @returns {Promise<*>} Result promise.
 */
/**
 * Shows add task dialog.
 * @returns {Promise<*>} Result.
 */
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

/**
 * Handles closeAddTaskDialog.
 * @returns {*} Result.
 */
/**
 * Closes add task dialog.
 * @returns {void} Result.
 */
function closeAddTaskDialog() {
  document.getElementById("addTask-dialog").classList.add("d-none");
}

/**
 * Handles updateNoTaskPlaceholders.
 * @returns {*} Result.
 */
/**
 * Updates no task placeholders.
 * @returns {void} Result.
 */
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

/**
 * Handles closeModal.
 * @returns {*} Result.
 */
/**
 * Closes modal.
 * @returns {void} Result.
 */
function closeModal() {
  const modal = document.getElementById("taskModal");
  if (modal) modal.remove();
  activeTask = null;
}
