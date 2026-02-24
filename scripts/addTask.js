/** Task rendern */
async function renderAddTask() {
  let content = document.getElementById('addTaskContent');
  content.innerHTML = '';
  content.innerHTML += generateAddTask();
  await loadContacts();
  resetSelectedContacts();
  selectContacts();
  renderSelectedAvatars();
  initAddDropdownClose();
}

function resetSelectedContacts() {
  selectedContacts = [];
}

/** Validierung des Formulars durchführen */
function validateForm() {
  clearValidationErrors();
  let isValid = true;
  isValid = validateTitleField() && isValid;
  isValid = validateDateField() && isValid;
  isValid = validateCategoryField() && isValid;
  return isValid;
}

function clearValidationErrors() {
  setErrorText('titleError', '');
  setErrorText('dateError', '');
  setErrorText('categoryError', '');
}

function setErrorText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function validateTitleField() {
  const input = document.getElementById('title');
  return validateRequiredInput(input, 'titleError');
}

function validateDateField() {
  const input = document.getElementById('date');
  return validateRequiredInput(input, 'dateError');
}

function validateCategoryField() {
  const input = document.getElementById('category');
  return validateRequiredInput(input, 'categoryError');
}

function validateRequiredInput(input, errorId) {
  if (!input || !input.value.trim()) {
    setErrorText(errorId, 'This field is required');
    input?.classList.add('input-error');
    return false;
  }
  input.classList.remove('input-error');
  return true;
}

async function saveToArray(event) {
  event.preventDefault();
  if (!validateForm()) return;
  const task = generateTaskFromForm();
  const result = await saveTask(task);
  if (result) {
    handleSaveSuccess();
    return;
  }
  handleSaveFailure();
}

function handleSaveSuccess() {
  showMessage("Task added to board", "success");
  subtasks.length = 0;
  selectedContacts.length = 0;
  showSubtasks();
  document.getElementById('addTaskForm').reset();
  setTimeout(() => { window.location.href = "board.html"; }, 1500);
}

function handleSaveFailure() {
  showMessage("Task could not be saved", "error");
}

/** Task in Firebase speichern */
async function saveTask(task) {
  try {
    const response = await fetch(`${BASE_URL}/tasks.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    return await response.json();
  } catch (error) {
    console.error("Fehler beim Speichern des Tasks:", error);
  }
}

/** Dropdown mit Kontakten füllen */
function selectContacts() {
  let select = document.getElementById('dropdownContacts');
  select.innerHTML = generateAssignedContacts(contacts);
}

/** Dropdown öffnen/schließen */
function toggleDropdown(event) {
  event.stopPropagation();
  document.getElementById("dropdownContacts").classList.toggle("show");
}

function toggleAddCategoryDropdown(event) {
  event.stopPropagation();
  const dropdown = document.getElementById("categoryDropdown");
  if (!dropdown) return;
  dropdown.classList.toggle("show");
}

function setAddCategory(value) {
  const input = document.getElementById("category");
  const select = document.getElementById("categorySelect");
  if (!input || !select) return;
  input.value = value;
  updateAddCategoryLabel(select, value);
  closeAddCategoryDropdown();
}

function updateAddCategoryLabel(select, value) {
  const label = select.querySelector("span");
  if (label) {
    label.childNodes[0].textContent = value + " ";
  }
}

function closeAddCategoryDropdown() {
  const dropdown = document.getElementById("categoryDropdown");
  if (dropdown) dropdown.classList.remove("show");
}

function initAddDropdownClose() {
  if (window.addDropdownHandlerAdded) return;
  window.addDropdownHandlerAdded = true;
  document.addEventListener("click", () => closeAddDropdowns());
}

function closeAddDropdowns() {
  const contactsDropdown = document.getElementById("dropdownContacts");
  if (contactsDropdown) contactsDropdown.classList.remove("show");
  const categoryDropdown = document.getElementById("categoryDropdown");
  if (categoryDropdown) categoryDropdown.classList.remove("show");
}

/** Checkbox Umschalten */
function toggleContactSelection(name, checkbox) {
  if (checkbox.checked) {
    selectedContacts.push(name);
  } else {
    selectedContacts = selectedContacts.filter(c => c !== name);
  }
  renderSelectedAvatars();
}

/** Avatare der ausgewählten Kontakte rendern */
function renderSelectedAvatars() {
  const container = document.getElementById("selectedAvatars");
  container.innerHTML = "";
  selectedContacts.forEach(name => appendSelectedAvatar(container, name));
}

function appendSelectedAvatar(container, name) {
  const initials = name.split(" ").map(n => n[0]).join("");
  container.innerHTML += getSelectedAvatarMarkup(initials);
}

function showSubtasks() {
  let subtaskArea = document.getElementById('subtaskArea');
  subtaskArea.innerHTML = '';
  for (let i = 0; i < subtasks.length; i++) {
    subtaskArea.innerHTML += generateSubtasks(i);
  }
}

function addSubtask() {
  let subtask = document.getElementById('subtask').value;
  if (subtask) {
    subtasks.push({ title: subtask, done: false });
    showSubtasks();
    document.getElementById('subtask').value = '';
  } else {
    alert("Bitte eine Subtask beschreiben!");
  }
}

function clearSubtaskInput() {
  const input = document.getElementById('subtask');
  if (input) {
    input.value = '';
    input.focus();
  }
}

function editSubtask(i) {
  setEditingSubtask(i);
}

function deleteSubtask(i) {
  subtasks.splice(i, 1);
  if (window.editingSubtaskIndex === i) {
    window.editingSubtaskIndex = null;
  }
  showSubtasks();
}

function clearForm() {
  selectedContacts = [];
  renderSelectedAvatars();
}

function setEditingSubtask(i) {
  window.editingSubtaskIndex = i;
  showSubtasks();
  focusSubtaskEditInput(i);
}

function focusSubtaskEditInput(i) {
  const input = document.getElementById(`subtask-edit-${i}`);
  if (input) {
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }
}

function cancelEditSubtask() {
  window.editingSubtaskIndex = null;
  showSubtasks();
}

function saveEditedSubtask(i) {
  const input = document.getElementById(`subtask-edit-${i}`);
  if (!input) return;
  const value = input.value.trim();
  if (!value) {
    alert("Bitte eine Subtask beschreiben!");
    return;
  }
  subtasks[i].title = value;
  window.editingSubtaskIndex = null;
  showSubtasks();
}
