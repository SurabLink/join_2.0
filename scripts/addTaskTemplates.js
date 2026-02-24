const URGENT_ICON = `
  <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.6528 15.2547C19.4182 15.2551 19.1896 15.1803 19.0007 15.0412L10.7487 8.958L2.49663 15.0412C2.38078 15.1267 2.24919 15.1887 2.10939 15.2234C1.96959 15.2582 1.82431 15.2651 1.68184 15.2437C1.53937 15.2223 1.40251 15.1732 1.27906 15.099C1.15562 15.0247 1.04801 14.927 0.96238 14.8112C0.876751 14.6954 0.814779 14.5639 0.780002 14.4243C0.745226 14.2846 0.738325 14.1394 0.759696 13.997C0.802855 13.7095 0.958545 13.4509 1.19252 13.2781L10.0966 6.70761C10.2853 6.56802 10.5139 6.49268 10.7487 6.49268C10.9835 6.49268 11.212 6.56802 11.4007 6.70761L20.3048 13.2781C20.4908 13.415 20.6286 13.6071 20.6988 13.827C20.7689 14.0469 20.7678 14.2833 20.6955 14.5025C20.6232 14.7216 20.4834 14.9124 20.2962 15.0475C20.1089 15.1826 19.8837 15.2551 19.6528 15.2547Z"
      fill="#FF3D00" />
    <path
      d="M19.6528 9.50568C19.4182 9.50609 19.1896 9.43124 19.0007 9.29214L10.7487 3.20898L2.49663 9.29214C2.26266 9.46495 1.96957 9.5378 1.68184 9.49468C1.39412 9.45155 1.13532 9.29597 0.962385 9.06218C0.789449 8.82838 0.716541 8.53551 0.7597 8.24799C0.802859 7.96048 0.95855 7.70187 1.19252 7.52906L10.0966 0.958588C10.2853 0.818997 10.5139 0.743652 10.7487 0.743652C10.9835 0.743652 11.212 0.818997 11.4007 0.958588L20.3048 7.52906C20.4908 7.66598 20.6286 7.85809 20.6988 8.07797C20.769 8.29785 20.7678 8.53426 20.6955 8.75344C20.6232 8.97262 20.4834 9.16338 20.2962 9.29847C20.1089 9.43356 19.8837 9.50608 19.6528 9.50568Z"
      fill="#FF3D00" />
  </svg>
`;

const MEDIUM_ICON = `
  <svg width="21" height="8" viewBox="0 0 21 8" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.1526 7.72528H1.34443C1.05378 7.72528 0.775033 7.60898 0.569514 7.40197C0.363995 7.19495 0.248535 6.91419 0.248535 6.62143C0.248535 6.32867 0.363995 6.0479 0.569514 5.84089C0.775033 5.63388 1.05378 5.51758 1.34443 5.51758H19.1526C19.4433 5.51758 19.722 5.63388 19.9276 5.84089C20.1331 6.0479 20.2485 6.32867 20.2485 6.62143C20.2485 6.91419 20.1331 6.0479 19.9276 5.84089C19.722 5.63388 19.4433 5.51758 19.1526 5.51758H1.34443C1.05378 5.51758 0.775033 5.63388 0.569514 5.84089C0.363995 6.0479 0.248535 6.32867 0.248535 6.62143C0.248535 6.91419 0.363995 7.19495 0.569514 7.40197C0.775033 7.60898 1.05378 7.72528 1.34443 7.72528H19.1526Z"
      fill="#FFA801" />
    <path
      d="M19.1526 2.48211H1.34443C1.05378 2.48211 0.775033 2.36581 0.569514 2.1588C0.363995 1.95179 0.248535 1.67102 0.248535 1.37826C0.248535 1.0855 0.363995 0.804736 0.569514 0.597724C0.775033 0.390712 1.05378 0.274414 1.34443 0.274414L19.1526 0.274414C19.4433 0.274414 19.722 0.390712 19.9276 0.597724C20.1331 0.804736 20.2485 1.0855 20.2485 1.37826C20.2485 1.67102 20.1331 1.95179 19.9276 2.1588C19.722 2.36581 19.4433 2.48211 19.1526 2.48211Z"
      fill="#FFA801" />
  </svg>
`;

const LOW_ICON = `
  <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.2485 9.50589C10.0139 9.5063 9.7854 9.43145 9.59655 9.29238L0.693448 2.72264C0.57761 2.63708 0.47977 2.52957 0.405515 2.40623C0.33126 2.28289 0.282043 2.14614 0.260675 2.00379C0.217521 1.71631 0.290421 1.42347 0.463337 1.1897C0.636253 0.955928 0.895022 0.800371 1.18272 0.757248C1.47041 0.714126 1.76347 0.786972 1.99741 0.95976L10.2485 7.04224L18.4997 0.95976C18.6155 0.874204 18.7471 0.812285 18.8869 0.777538C19.0266 0.742791 19.1719 0.735896 19.3144 0.757248C19.4568 0.7786 19.5937 0.82778 19.7171 0.901981C19.8405 0.976181 19.9481 1.07395 20.0337 1.1897C20.1194 1.30545 20.1813 1.43692 20.2161 1.57661C20.2509 1.71629 20.2578 1.86145 20.2364 2.00379C20.215 2.14614 20.1658 2.28289 20.0916 2.40623C20.0173 2.52957 19.9195 2.63708 19.8036 2.72264L10.9005 9.29238C10.7117 9.43145 10.4831 9.5063 10.2485 9.50589Z"
      fill="#7AE229" />
    <path
      d="M10.2485 15.2544C10.0139 15.2548 9.7854 15.18 9.59655 15.0409L0.693448 8.47117C0.459502 8.29839 0.30383 8.03981 0.260675 7.75233C0.217521 7.46485 0.290421 7.17201 0.463337 6.93824C0.636253 6.70446 0.895021 6.54891 1.18272 6.50578C1.47041 6.46266 1.76347 6.53551 1.99741 6.7083L10.2485 12.7908L18.4997 6.7083C18.7336 6.53551 19.0267 6.46266 19.3144 6.50578C19.602 6.54891 19.8608 6.70446 20.0337 6.93824C20.2066 7.17201 20.2795 7.46485 20.2364 7.75233C20.1932 8.03981 20.0376 8.29839 19.8036 8.47117L10.9005 15.0409C10.7117 15.18 10.4831 15.2548 10.2485 15.2544Z"
      fill="#7AE229" />
  </svg>
`;

/**
 * Handles generateAddTask.
 * @returns {*} Result.
 */
/**
 * Generates add task.
 * @returns {string} Result.
 */
function generateAddTask() {
  return getAddTaskHeader() + getAddTaskForm() + getAddTaskNoteOutside();
}

/**
 * Handles getAddTaskHeader.
 * @returns {*} Result.
 */
/**
 * Returns add task header.
 * @returns {string} Result.
 */
function getAddTaskHeader() {
  return /*html*/ `
    <div class="add-task-header">
      <h1>Add Task</h1>
      <img src="./assets/icons/close.svg" alt="Close-Button" width="20" height="20" onclick="closeAddTaskDialog()">
    </div>
  `;
}

/**
 * Handles getAddTaskForm.
 * @returns {*} Result.
 */
/**
 * Returns add task form.
 * @returns {string} Result.
 */
function getAddTaskForm() {
  return /*html*/ `
    <form class="task-form" id="addTaskForm" onsubmit="saveToArray(event)">
      ${getAddTaskFormLeft()}
      ${getAddTaskFormRight()}
    </form>
  `;
}

/**
 * Handles getAddTaskFormLeft.
 * @returns {*} Result.
 */
/**
 * Returns add task form left.
 * @returns {string} Result.
 */
function getAddTaskFormLeft() {
  return /*html*/ `
    <div class="form-left">
      ${getTitleField()}
      ${getDescriptionField()}
      ${getDateField()}
    </div>
  `;
}

/**
 * Handles getTitleField.
 * @returns {*} Result.
 */
/**
 * Returns title field.
 * @returns {string} Result.
 */
function getTitleField() {
  return /*html*/ `
    <label>
      <span>
        Title<span class="req">*</span>
      </span>
      <input type="text" placeholder="Enter a title" id="title">
      <div class="error-message" id="titleError"></div>
    </label>
  `;
}

/**
 * Handles getDescriptionField.
 * @returns {*} Result.
 */
/**
 * Returns description field.
 * @returns {string} Result.
 */
function getDescriptionField() {
  return /*html*/ `
    <label>
      Description
      <textarea placeholder="Enter a Description" id="description"></textarea>
    </label>
  `;
}

/**
 * Handles getDateField.
 * @returns {*} Result.
 */
/**
 * Returns date field.
 * @returns {string} Result.
 */
function getDateField() {
  return /*html*/ `
    <label>
      <span>
        Due date<span class="req">*</span>
      </span>
      <input type="date" id="date">
      <div class="error-message" id="dateError"></div>
    </label>
  `;
}

/**
 * Handles getAddTaskFormRight.
 * @returns {*} Result.
 */
/**
 * Returns add task form right.
 * @returns {string} Result.
 */
function getAddTaskFormRight() {
  return /*html*/ `
    <div class="form-right">
      ${getPrioritySection()}
      ${getAssignedToSection()}
      ${getCategorySection()}
      ${getSubtaskSection()}
      ${getInlineNote()}
      ${getFormActions()}
    </div>
  `;
}

/**
 * Handles getPrioritySection.
 * @returns {*} Result.
 */
/**
 * Returns priority section.
 * @returns {string} Result.
 */
function getPrioritySection() {
  return /*html*/ `
    <div class="priority">
      <span>Priority</span>
      <div class="priority-options">
        ${getPriorityUrgent()}
        ${getPriorityMedium()}
        ${getPriorityLow()}
      </div>
    </div>
  `;
}

/**
 * Handles getPriorityUrgent.
 * @returns {*} Result.
 */
/**
 * Returns priority urgent.
 * @returns {string} Result.
 */
function getPriorityUrgent() {
  return /*html*/ `
    <input type="radio" id="urgent" name="priority" value="urgent">
    <label for="urgent" class="urgent priority-btn">Urgent
      ${URGENT_ICON}
    </label>
  `;
}

/**
 * Handles getPriorityMedium.
 * @returns {*} Result.
 */
/**
 * Returns priority medium.
 * @returns {string} Result.
 */
function getPriorityMedium() {
  return /*html*/ `
    <input type="radio" id="medium" name="priority" value="medium" checked>
    <label for="medium" class="medium priority-btn">Medium
      ${MEDIUM_ICON}
    </label>
  `;
}

/**
 * Handles getPriorityLow.
 * @returns {*} Result.
 */
/**
 * Returns priority low.
 * @returns {string} Result.
 */
function getPriorityLow() {
  return /*html*/ `
    <input type="radio" id="low" name="priority" value="low">
    <label for="low" class="low priority-btn">Low
      ${LOW_ICON}
    </label>
  `;
}

/**
 * Handles getAssignedToSection.
 * @returns {*} Result.
 */
/**
 * Returns assigned to section.
 * @returns {string} Result.
 */
function getAssignedToSection() {
  return /*html*/ `
    <div class="assigned-to-label">
      Assigned to
      ${getAssignedSelect()}
      <div id="selectedAvatars" class="avatar-container"></div>
    </div>
  `;
}

/**
 * Handles getAssignedSelect.
 * @returns {*} Result.
 */
/**
 * Returns assigned select.
 * @returns {string} Result.
 */
function getAssignedSelect() {
  return /*html*/ `
    <div id="selectContacts" class="custom-select" tabindex="0">
      <span onclick="toggleDropdown(event)">
        Select contacts to assign
        <img src="./assets/icons/arrow_drop_down.svg" alt="" class="dropdown-arrow">
      </span>
      <div id="dropdownContacts" class="dropdown-content" onclick="event.stopPropagation()"></div>
    </div>
  `;
}

/**
 * Handles getCategorySection.
 * @returns {*} Result.
 */
/**
 * Returns category section.
 * @returns {string} Result.
 */
function getCategorySection() {
  return /*html*/ `
    <label class="category">
      <span>
        Category<span class="req">*</span>
      </span>
      ${getCategorySelect()}
      ${getCategoryHiddenInput()}
      ${getCategoryError()}
    </label>
  `;
}

/**
 * Handles getCategorySelect.
 * @returns {*} Result.
 */
/**
 * Returns category select.
 * @returns {string} Result.
 */
function getCategorySelect() {
  return /*html*/ `
    <div id="categorySelect" class="custom-select">
      <span onclick="toggleAddCategoryDropdown(event)">
        Select task category
        <img src="./assets/icons/arrow_drop_down.svg" alt="" class="dropdown-arrow">
      </span>
      <div id="categoryDropdown" class="dropdown-content" onclick="event.stopPropagation()">
        ${generateAddCategoryOptions()}
      </div>
    </div>
  `;
}

/**
 * Handles getCategoryHiddenInput.
 * @returns {*} Result.
 */
/**
 * Returns category hidden input.
 * @returns {string} Result.
 */
function getCategoryHiddenInput() {
  return `<input type="hidden" id="category" required>`;
}

/**
 * Handles getCategoryError.
 * @returns {*} Result.
 */
/**
 * Returns category error.
 * @returns {string} Result.
 */
function getCategoryError() {
  return `<div class="error-message" id="categoryError"></div>`;
}

/**
 * Handles getSubtaskSection.
 * @returns {*} Result.
 */
/**
 * Returns subtask section.
 * @returns {string} Result.
 */
function getSubtaskSection() {
  return /*html*/ `
    <label>
      Subtasks
      <div class="subtasks">
        <input type="text" id="subtask" placeholder="Add new subtask">
        ${getSubtaskInputActions()}
      </div>
      <ul id="subtaskArea" class="subtask-list"></ul>
    </label>
  `;
}

/**
 * Handles getSubtaskInputActions.
 * @returns {*} Result.
 */
/**
 * Returns subtask input actions.
 * @returns {string} Result.
 */
function getSubtaskInputActions() {
  return /*html*/ `
    <div class="subtask-input-actions">
      <button type="button" class="subtask-icon-btn" onclick="clearSubtaskInput()" aria-label="Clear subtask">
        <img src="./assets/icons/iconoir_cancel.svg" alt="">
      </button>
      <div class="subtask-input-separator"></div>
      <button type="button" class="subtask-icon-btn" onclick="addSubtask()" aria-label="Add subtask">
        <img src="./assets/icons/checkmark.svg" alt="">
      </button>
    </div>
  `;
}

/**
 * Handles getInlineNote.
 * @returns {*} Result.
 */
/**
 * Returns inline note.
 * @returns {string} Result.
 */
function getInlineNote() {
  return /*html*/ `
    <p class="note note-inline"><span class="req">*</span>This field is required</p>
  `;
}

/**
 * Handles getFormActions.
 * @returns {*} Result.
 */
/**
 * Returns form actions.
 * @returns {string} Result.
 */
function getFormActions() {
  return /*html*/ `
    <div class="actions">
      <button type="reset" class="clear" onclick="clearForm()">Clear ✕</button>
      <button type="submit" class="create">Create Task ▾</button>
    </div>
  `;
}

/**
 * Handles getAddTaskNoteOutside.
 * @returns {*} Result.
 */
/**
 * Returns add task note outside.
 * @returns {string} Result.
 */
function getAddTaskNoteOutside() {
  return /*html*/ `
    <p class="note note-outside"><span class="req">*</span>This field is required</p>
  `;
}

/**
 * Handles generateAddCategoryOptions.
 * @returns {*} Result.
 */
/**
 * Generates add category options.
 * @returns {string} Result.
 */
function generateAddCategoryOptions() {
  const categories = ["Technical Task", "User Story"];
  return categories.map((cat) => getAddCategoryOption(cat)).join("");
}

/**
 * Handles getAddCategoryOption.
 * @param {*} cat - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns add category option.
 * @param {*} cat - Parameter.
 * @returns {string} Result.
 */
function getAddCategoryOption(cat) {
  return /*html*/ `
    <div class="dropdown-item" onclick="setAddCategory('${cat}')">
      <span class="dropdown-name">${cat}</span>
    </div>
  `;
}

/**
 * Handles generateSubtasks.
 * @param {*} i - Parameter.
 * @returns {*} Result.
 */
/**
 * Generates subtasks.
 * @param {number} i - Index.
 * @returns {string} Result.
 */
function generateSubtasks(i) {
  return isEditingSubtask(i) ? getSubtaskEditItem(i) : getSubtaskItem(i);
}

/**
 * Handles isEditingSubtask.
 * @param {*} i - Parameter.
 * @returns {*} Result.
 */
/**
 * Checks whether editing subtask.
 * @param {number} i - Index.
 * @returns {string} Result.
 */
function isEditingSubtask(i) {
  return window.editingSubtaskIndex === i;
}

/**
 * Handles getSubtaskEditItem.
 * @param {*} i - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns subtask edit item.
 * @param {number} i - Index.
 * @returns {string} Result.
 */
function getSubtaskEditItem(i) {
  return /*html*/ `
    <li class="subtask subtask-edit">
      <input
        type="text"
        id="subtask-edit-${i}"
        class="subtask-edit-input"
        value="${subtasks[i].title}"
        placeholder="Edit subtask"
      >
      ${getSubtaskEditActions(i)}
    </li>
  `;
}

/**
 * Handles getSubtaskEditActions.
 * @param {*} i - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns subtask edit actions.
 * @param {number} i - Index.
 * @returns {string} Result.
 */
function getSubtaskEditActions(i) {
  return /*html*/ `
    <div class="subtask-input-actions">
      <button type="button" class="subtask-icon-btn" onclick="deleteSubtask(${i})" aria-label="Delete subtask">
        <img src="./assets/icons/delete.svg" alt="">
      </button>
      <div class="subtask-input-separator"></div>
      <button type="button" class="subtask-icon-btn" onclick="saveEditedSubtask(${i})" aria-label="Save subtask">
        <img src="./assets/icons/checkmark.svg" alt="">
      </button>
    </div>
  `;
}

/**
 * Handles getSubtaskItem.
 * @param {*} i - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns subtask item.
 * @param {number} i - Index.
 * @returns {string} Result.
 */
function getSubtaskItem(i) {
  return /*html*/ `
    <li class="subtask">
      <span>${subtasks[i].title}</span>
      ${getSubtaskActions(i)}
    </li>
  `;
}

/**
 * Handles getSubtaskActions.
 * @param {*} i - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns subtask actions.
 * @param {number} i - Index.
 * @returns {string} Result.
 */
function getSubtaskActions(i) {
  return /*html*/ `
    <div class="subtask-actions">
      <img src="./assets/icons/edit.svg" alt="Edit" onclick="editSubtask(${i})">
      <div class="action-separator"></div>
      <img src="./assets/icons/delete.svg" alt="Delete" onclick="deleteSubtask(${i})">
    </div>
  `;
}

/**
 * Handles generateAssignedContacts.
 * @param {*} contacts - Parameter.
 * @returns {*} Result.
 */
/**
 * Generates assigned contacts.
 * @param {*} contacts - Parameter.
 * @returns {string} Result.
 */
function generateAssignedContacts(contacts) {
  return contacts.map((contact, i) => getAssignedContactItem(contact, i)).join("");
}

/**
 * Handles getAssignedContactItem.
 * @param {*} contact - Parameter.
 * @param {*} i - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns assigned contact item.
 * @param {Object} contact - Contact object.
 * @param {number} i - Index.
 * @returns {string} Result.
 */
function getAssignedContactItem(contact, i) {
  const isChecked = selectedContacts.includes(contact.name);
  const checkboxId = getContactCheckboxId(i);
  const initials = getContactInitials(contact.name);
  return getAssignedContactMarkup(contact, isChecked, checkboxId, initials);
}

/**
 * Handles getContactCheckboxId.
 * @param {*} i - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns contact checkbox id.
 * @param {number} i - Index.
 * @returns {string} Result.
 */
function getContactCheckboxId(i) {
  return `contact_${i}`;
}

/**
 * Handles getContactInitials.
 * @param {*} name - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns contact initials.
 * @param {string} name - Name.
 * @returns {string} Result.
 */
function getContactInitials(name) {
  return name.split(" ").map(part => part.charAt(0)).join("").toUpperCase();
}

/**
 * Handles getAssignedContactMarkup.
 * @param {*} contact - Parameter.
 * @param {*} isChecked - Parameter.
 * @param {*} checkboxId - Parameter.
 * @param {*} initials - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns assigned contact markup.
 * @param {Object} contact - Contact object.
 * @param {*} isChecked - Parameter.
 * @param {*} checkboxId - Parameter.
 * @param {*} initials - Parameter.
 * @returns {string} Result.
 */
function getAssignedContactMarkup(contact, isChecked, checkboxId, initials) {
  return /*html*/ `
    <div class="dropdown-item">
      <div class="dropdown-avatar">${initials}</div>
      <label for="${checkboxId}" class="dropdown-name">${contact.name}</label>
      <input
        type="checkbox"
        id="${checkboxId}"
        value="${contact.name}"
        onchange="toggleContactSelection('${contact.name}', this)"
        ${isChecked ? "checked" : ""}
      >
    </div>
  `;
}

/**
 * Handles generateTaskFromForm.
 * @returns {*} Result.
 */
/**
 * Generates task from form.
 * @returns {string} Result.
 */
function generateTaskFromForm() {
  const title = getInputTrimmedValue('title');
  const description = getInputTrimmedValue('description');
  const dueDate = getInputTrimmedValue('date');
  const priority = getCheckedPriority();
  const category = getInputTrimmedValue('category');
  return buildTaskObject(title, description, dueDate, priority, category);
}

/**
 * Handles getInputTrimmedValue.
 * @param {*} id - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns input trimmed value.
 * @param {string} id - Identifier.
 * @returns {string} Result.
 */
function getInputTrimmedValue(id) {
  return document.getElementById(id).value.trim();
}

/**
 * Handles getCheckedPriority.
 * @returns {*} Result.
 */
/**
 * Returns checked priority.
 * @returns {string} Result.
 */
function getCheckedPriority() {
  return document.querySelector('input[name="priority"]:checked').value;
}

/**
 * Handles buildTaskObject.
 * @param {*} title - Parameter.
 * @param {*} description - Parameter.
 * @param {*} dueDate - Parameter.
 * @param {*} priority - Parameter.
 * @param {*} category - Parameter.
 * @returns {*} Result.
 */
/**
 * Builds task object.
 * @param {*} title - Parameter.
 * @param {*} description - Parameter.
 * @param {*} dueDate - Parameter.
 * @param {*} priority - Parameter.
 * @param {*} category - Parameter.
 * @returns {string} Result.
 */
function buildTaskObject(title, description, dueDate, priority, category) {
  return {
    id: Date.now(),
    title,
    description,
    dueDate,
    priority,
    contacts: [...selectedContacts],
    category,
    subtasks: [...subtasks],
    status: "To Do",
  };
}

/**
 * Handles getSelectedAvatarMarkup.
 * @param {*} initials - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns selected avatar markup.
 * @param {*} initials - Parameter.
 * @returns {string} Result.
 */
function getSelectedAvatarMarkup(initials) {
  return `<div class="avatar">${initials}</div>`;
}
