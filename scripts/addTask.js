/**
 * Renders add task.
 * @returns {Promise<*>} Result.
 */
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

/**
 * Handles resetSelectedContacts.
 * @returns {*} Result.
 */
/**
 * Handles reset selected contacts.
 * @returns {void} Result.
 */
function resetSelectedContacts() {
  selectedContacts = [];
}

/**
 * Validates form.
 * @returns {void} Result.
 */
function validateForm() {
  clearValidationErrors();
  let isValid = true;
  isValid = validateTitleField() && isValid;
  isValid = validateDateField() && isValid;
  isValid = validateCategoryField() && isValid;
  return isValid;
}

/**
 * Handles clearValidationErrors.
 * @returns {*} Result.
 */
/**
 * Clears validation errors.
 * @returns {void} Result.
 */
function clearValidationErrors() {
  setErrorText('titleError', '');
  setErrorText('dateError', '');
  setErrorText('categoryError', '');
}

/**
 * Handles setErrorText.
 * @param {*} id - Parameter.
 * @param {*} value - Parameter.
 * @returns {*} Result.
 */
/**
 * Sets error text.
 * @param {string} id - Identifier.
 * @param {string} value - Value.
 * @returns {void} Result.
 */
function setErrorText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

/**
 * Handles validateTitleField.
 * @returns {*} Result.
 */
/**
 * Validates title field.
 * @returns {void} Result.
 */
function validateTitleField() {
  const input = document.getElementById('title');
  return validateRequiredInput(input, 'titleError');
}

/**
 * Handles validateDateField.
 * @returns {*} Result.
 */
/**
 * Validates date field.
 * @returns {void} Result.
 */
function validateDateField() {
  const input = document.getElementById('date');
  return validateRequiredInput(input, 'dateError');
}

/**
 * Handles validateCategoryField.
 * @returns {*} Result.
 */
/**
 * Validates category field.
 * @returns {void} Result.
 */
function validateCategoryField() {
  const input = document.getElementById('category');
  return validateRequiredInput(input, 'categoryError');
}

/**
 * Handles validateRequiredInput.
 * @param {*} input - Parameter.
 * @param {*} errorId - Parameter.
 * @returns {*} Result.
 */
/**
 * Validates required input.
 * @param {HTMLElement} input - Input element.
 * @param {*} errorId - Parameter.
 * @returns {void} Result.
 */
function validateRequiredInput(input, errorId) {
  if (!input || !input.value.trim()) {
    setErrorText(errorId, 'This field is required');
    input?.classList.add('input-error');
    return false;
  }
  input.classList.remove('input-error');
  return true;
}

/**
 * Handles saveToArray.
 * @param {*} event - Parameter.
 * @returns {Promise<*>} Result promise.
 */
/**
 * Saves to array.
 * @param {Event} event - DOM event.
 * @returns {Promise<*>} Result.
 */
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

/**
 * Handles handleSaveSuccess.
 * @returns {*} Result.
 */
/**
 * Handles save success.
 * @returns {void} Result.
 */
function handleSaveSuccess() {
  showMessage("Task added to board", "success");
  subtasks.length = 0;
  selectedContacts.length = 0;
  showSubtasks();
  document.getElementById('addTaskForm').reset();
  setTimeout(() => { window.location.href = "board.html"; }, 1500);
}

/**
 * Handles handleSaveFailure.
 * @returns {*} Result.
 */
/**
 * Handles save failure.
 * @returns {void} Result.
 */
function handleSaveFailure() {
  showMessage("Task could not be saved", "error");
}

/**
 * Saves task.
 * @param {Object} task - Task object.
 * @returns {Promise<*>} Result.
 */
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

/**
 * Handles select contacts.
 * @returns {void} Result.
 */
function selectContacts() {
  let select = document.getElementById('dropdownContacts');
  select.innerHTML = generateAssignedContacts(contacts);
}

/**
 * Toggles dropdown.
 * @param {Event} event - DOM event.
 * @returns {void} Result.
 */
function toggleDropdown(event) {
  event.stopPropagation();
  document.getElementById("dropdownContacts").classList.toggle("show");
}

/**
 * Handles toggleAddCategoryDropdown.
 * @param {*} event - Parameter.
 * @returns {*} Result.
 */
/**
 * Toggles add category dropdown.
 * @param {Event} event - DOM event.
 * @returns {void} Result.
 */
function toggleAddCategoryDropdown(event) {
  event.stopPropagation();
  const dropdown = document.getElementById("categoryDropdown");
  if (!dropdown) return;
  dropdown.classList.toggle("show");
}

/**
 * Handles setAddCategory.
 * @param {*} value - Parameter.
 * @returns {*} Result.
 */
/**
 * Sets add category.
 * @param {string} value - Value.
 * @returns {void} Result.
 */
function setAddCategory(value) {
  const input = document.getElementById("category");
  const select = document.getElementById("categorySelect");
  if (!input || !select) return;
  input.value = value;
  updateAddCategoryLabel(select, value);
  closeAddCategoryDropdown();
}

/**
 * Handles updateAddCategoryLabel.
 * @param {*} select - Parameter.
 * @param {*} value - Parameter.
 * @returns {*} Result.
 */
/**
 * Updates add category label.
 * @param {*} select - Parameter.
 * @param {string} value - Value.
 * @returns {void} Result.
 */
function updateAddCategoryLabel(select, value) {
  const label = select.querySelector("span");
  if (label) {
    label.childNodes[0].textContent = value + " ";
  }
}

/**
 * Handles closeAddCategoryDropdown.
 * @returns {*} Result.
 */
/**
 * Closes add category dropdown.
 * @returns {void} Result.
 */
function closeAddCategoryDropdown() {
  const dropdown = document.getElementById("categoryDropdown");
  if (dropdown) dropdown.classList.remove("show");
}

/**
 * Handles initAddDropdownClose.
 * @returns {*} Result.
 */
/**
 * Initializes add dropdown close.
 * @returns {void} Result.
 */
function initAddDropdownClose() {
  if (window.addDropdownHandlerAdded) return;
  window.addDropdownHandlerAdded = true;
  document.addEventListener("click", () => closeAddDropdowns());
}

/**
 * Handles closeAddDropdowns.
 * @returns {*} Result.
 */
/**
 * Closes add dropdowns.
 * @returns {void} Result.
 */
function closeAddDropdowns() {
  const contactsDropdown = document.getElementById("dropdownContacts");
  if (contactsDropdown) contactsDropdown.classList.remove("show");
  const categoryDropdown = document.getElementById("categoryDropdown");
  if (categoryDropdown) categoryDropdown.classList.remove("show");
}

/**
 * Toggles contact selection.
 * @param {string} name - Name.
 * @param {HTMLInputElement} checkbox - Checkbox element.
 * @returns {void} Result.
 */
function toggleContactSelection(name, checkbox) {
  if (checkbox.checked) {
    selectedContacts.push(name);
  } else {
    selectedContacts = selectedContacts.filter(c => c !== name);
  }
  renderSelectedAvatars();
}

/**
 * Renders selected avatars.
 * @returns {void} Result.
 */
function renderSelectedAvatars() {
  const container = document.getElementById("selectedAvatars");
  container.innerHTML = "";
  selectedContacts.forEach(name => appendSelectedAvatar(container, name));
}

/**
 * Handles appendSelectedAvatar.
 * @param {*} container - Parameter.
 * @param {*} name - Parameter.
 * @returns {*} Result.
 */
/**
 * Handles append selected avatar.
 * @param {HTMLElement} container - Container element.
 * @param {string} name - Name.
 * @returns {void} Result.
 */
function appendSelectedAvatar(container, name) {
  const initials = name.split(" ").map(n => n[0]).join("");
  container.innerHTML += getSelectedAvatarMarkup(initials);
}

/**
 * Handles showSubtasks.
 * @returns {*} Result.
 */
/**
 * Shows subtasks.
 * @returns {void} Result.
 */
function showSubtasks() {
  let subtaskArea = document.getElementById('subtaskArea');
  subtaskArea.innerHTML = '';
  for (let i = 0; i < subtasks.length; i++) {
    subtaskArea.innerHTML += generateSubtasks(i);
  }
}

/**
 * Handles addSubtask.
 * @returns {*} Result.
 */
/**
 * Adds subtask.
 * @returns {void} Result.
 */
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

/**
 * Handles clearSubtaskInput.
 * @returns {*} Result.
 */
/**
 * Clears subtask input.
 * @returns {void} Result.
 */
function clearSubtaskInput() {
  const input = document.getElementById('subtask');
  if (input) {
    input.value = '';
    input.focus();
  }
}

/**
 * Handles editSubtask.
 * @param {*} i - Parameter.
 * @returns {*} Result.
 */
/**
 * Handles edit subtask.
 * @param {number} i - Index.
 * @returns {void} Result.
 */
function editSubtask(i) {
  setEditingSubtask(i);
}

/**
 * Handles deleteSubtask.
 * @param {*} i - Parameter.
 * @returns {*} Result.
 */
/**
 * Deletes subtask.
 * @param {number} i - Index.
 * @returns {void} Result.
 */
function deleteSubtask(i) {
  subtasks.splice(i, 1);
  if (window.editingSubtaskIndex === i) {
    window.editingSubtaskIndex = null;
  }
  showSubtasks();
}

/**
 * Handles clearForm.
 * @returns {*} Result.
 */
/**
 * Clears form.
 * @returns {void} Result.
 */
function clearForm() {
  selectedContacts = [];
  renderSelectedAvatars();
}

/**
 * Handles setEditingSubtask.
 * @param {*} i - Parameter.
 * @returns {*} Result.
 */
/**
 * Sets editing subtask.
 * @param {number} i - Index.
 * @returns {void} Result.
 */
function setEditingSubtask(i) {
  window.editingSubtaskIndex = i;
  showSubtasks();
  focusSubtaskEditInput(i);
}

/**
 * Handles focusSubtaskEditInput.
 * @param {*} i - Parameter.
 * @returns {*} Result.
 */
/**
 * Handles focus subtask edit input.
 * @param {number} i - Index.
 * @returns {void} Result.
 */
function focusSubtaskEditInput(i) {
  const input = document.getElementById(`subtask-edit-${i}`);
  if (input) {
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }
}

/**
 * Handles cancelEditSubtask.
 * @returns {*} Result.
 */
/**
 * Handles cancel edit subtask.
 * @returns {void} Result.
 */
function cancelEditSubtask() {
  window.editingSubtaskIndex = null;
  showSubtasks();
}

/**
 * Handles saveEditedSubtask.
 * @param {*} i - Parameter.
 * @returns {*} Result.
 */
/**
 * Saves edited subtask.
 * @param {number} i - Index.
 * @returns {void} Result.
 */
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
