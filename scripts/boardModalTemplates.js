/**
 * Handles getTaskModalTemplate.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns task modal template.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function getTaskModalTemplate(task) {
  return /*html*/ `
    <div class="modal-content">
      ${getModalCloseButton()}
      ${getModalCategory(task)}
      ${getModalTitle(task)}
      ${getModalDescription(task)}
      ${getModalDate(task)}
      ${getModalPriority(task)}
      ${getModalAssignedSection(task)}
      ${getModalSubtasksSection(task)}
      ${getModalActions(task)}
    </div>
  `;
}

/**
 * Handles getModalCloseButton.
 * @returns {*} Result.
 */
/**
 * Returns modal close button.
 * @returns {string} Result.
 */
function getModalCloseButton() {
  return /*html*/ `<span class="close" onclick="closeModal()">&times;</span>`;
}

/**
 * Handles getModalCategory.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns modal category.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function getModalCategory(task) {
  const color = task.category === "User Story" ? "#0038FF" : "#1FD7C1";
  return /*html*/ `
    <div class="task-category" style="background-color: ${color}">
      ${task.category}
    </div>
  `;
}

/**
 * Handles getModalTitle.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns modal title.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function getModalTitle(task) {
  return /*html*/ `<div class="modal-title"><h2>${task.title}</h2></div>`;
}

/**
 * Handles getModalDescription.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns modal description.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function getModalDescription(task) {
  return /*html*/ `<div class="modal-description">${task.description}</div>`;
}

/**
 * Handles getModalDate.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns modal date.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function getModalDate(task) {
  return /*html*/ `
    <div class="modal-date">
      <span class="modal-titles-task">Due date:</span> ${task.dueDate}
    </div>
  `;
}

/**
 * Handles getModalPriority.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns modal priority.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function getModalPriority(task) {
  return /*html*/ `
    <div class="modal-priority">
      <span class="modal-titles-task">Priority:</span>
      <div>${task.priority}</div>
      ${getModalPriorityIcon(task.priority)}
    </div>
  `;
}

/**
 * Handles getModalPriorityIcon.
 * @param {*} priority - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns modal priority icon.
 * @param {*} priority - Parameter.
 * @returns {string} Result.
 */
function getModalPriorityIcon(priority) {
  if (priority === "urgent") return '<img src="./assets/img/Category_Urgent.svg" alt="Urgent">';
  if (priority === "medium") return '<img src="./assets/icons/medium_orange.svg" alt="Medium">';
  return '<img src="./assets/img/Category_Low.svg" alt="Low">';
}

/**
 * Handles getModalAssignedSection.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns modal assigned section.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function getModalAssignedSection(task) {
  return /*html*/ `
    <div class="modal-contacts">
      <span class="modal-titles-task">Assigned To:</span>
      <div class="modal-contacts-list">${generateModalAssignedContacts(task)}</div>
    </div>
  `;
}

/**
 * Handles generateModalAssignedContacts.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Generates modal assigned contacts.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function generateModalAssignedContacts(task) {
  if (!task.contacts || task.contacts.length === 0) {
    return "—";
  }
  return task.contacts.map((name) => getModalAssignedContact(name)).join("");
}

/**
 * Handles getModalAssignedContact.
 * @param {*} name - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns modal assigned contact.
 * @param {string} name - Name.
 * @returns {string} Result.
 */
function getModalAssignedContact(name) {
  if (!name) return "";
  const initials = name.split(" ").map(n => n[0]).join("");
  return /*html*/ `
    <div class="modal-contact">
      <div class="avatar" style="background-color: ${getRandomColor()};">${initials}</div>
      <span>${name}</span>
    </div>
  `;
}

/**
 * Handles getModalSubtasksSection.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns modal subtasks section.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function getModalSubtasksSection(task) {
  return /*html*/ `
    <div class="modal-subtasks-area">
      <span class="modal-titles-task">Subtasks</span>
      <div class="modal-subtasks">${generateModalSubtasks(task)}</div>
    </div>
  `;
}

/**
 * Handles generateModalSubtasks.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Generates modal subtasks.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function generateModalSubtasks(task) {
  if (!task.subtasks || task.subtasks.length === 0) {
    return "<span>No subtasks</span>";
  }
  return task.subtasks.map((st, i) => getModalSubtaskItem(task, st, i)).join("");
}

/**
 * Handles getModalSubtaskItem.
 * @param {*} task - Parameter.
 * @param {*} subtask - Parameter.
 * @param {*} index - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns modal subtask item.
 * @param {Object} task - Task object.
 * @param {Object} subtask - Subtask object.
 * @param {number} index - Index.
 * @returns {string} Result.
 */
function getModalSubtaskItem(task, subtask, index) {
  return /*html*/ `
    <label class="modal-subtask">
      <input type="checkbox"
             ${subtask.done ? "checked" : ""}
             onchange="toggleSubtaskDone(${task.id}, ${index}, this)">
      <span>${subtask.title}</span>
    </label>
  `;
}

/**
 * Handles getModalActions.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns modal actions.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function getModalActions(task) {
  return /*html*/ `
    <div class="modal-actions">
      <div class="modal-delete" onclick="deleteTask()">
        <img src="./assets/icons/delete.svg" alt="Delete">
        <span>Delete</span>
      </div>
      <div class="action-separator"></div>
      <div class="modal-edit" onclick="openEditTaskModal(${task.id})">
        <img src="./assets/icons/edit.svg" alt="Edit">
        <span>Edit</span>
      </div>
    </div>
  `;
}

/**
 * Handles generateEditTaskTemplate.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Generates edit task template.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function generateEditTaskTemplate(task) {
  return /*html*/ `
    <form class="edit-task-form" id="editTaskForm" onsubmit="saveEditedTask(event, ${task.id})">
      ${getEditFormScroll(task)}
      ${getEditFormActions(task)}
    </form>
  `;
}

/**
 * Handles getEditFormScroll.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns edit form scroll.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function getEditFormScroll(task) {
  return /*html*/ `
    <div class="edit-form-scroll">
      ${getEditTitleField(task)}
      ${getEditDescriptionField(task)}
      ${getEditDateField(task)}
      ${getEditPrioritySection(task)}
      ${getEditAssignedSection()}
      ${getEditCategorySection(task)}
      ${getEditSubtasksSection()}
    </div>
  `;
}

/**
 * Handles getEditTitleField.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns edit title field.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function getEditTitleField(task) {
  return /*html*/ `
    <label class="edit-label">
      <span>Title<span class="req">*</span></span>
      <input class="edit-input" type="text" id="edit-title" value="${task.title}" required>
    </label>
  `;
}

/**
 * Handles getEditDescriptionField.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns edit description field.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function getEditDescriptionField(task) {
  return /*html*/ `
    <label class="edit-label">
      <span>Description</span>
      <textarea class="edit-textarea" id="edit-description">${task.description}</textarea>
    </label>
  `;
}

/**
 * Handles getEditDateField.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns edit date field.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function getEditDateField(task) {
  return /*html*/ `
    <label class="edit-label">
      <span>Due date<span class="req">*</span></span>
      <input class="edit-input" type="date" id="edit-date" value="${task.dueDate}" required>
    </label>
  `;
}

/**
 * Handles getEditPrioritySection.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns edit priority section.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function getEditPrioritySection(task) {
  return /*html*/ `
    <div class="priority">
      <span>Priority</span>
      <div class="priority-options">
        ${getEditPriorityOption("urgent", task.priority === "urgent", URGENT_ICON)}
        ${getEditPriorityOption("medium", task.priority === "medium", MEDIUM_ICON)}
        ${getEditPriorityOption("low", task.priority === "low", LOW_ICON)}
      </div>
    </div>
  `;
}

/**
 * Handles getEditPriorityOption.
 * @param {*} value - Parameter.
 * @param {*} checked - Parameter.
 * @param {*} icon - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns edit priority option.
 * @param {string} value - Value.
 * @param {*} checked - Parameter.
 * @param {*} icon - Parameter.
 * @returns {string} Result.
 */
function getEditPriorityOption(value, checked, icon) {
  const id = `edit-${value}`;
  const labelClass = value === "low" ? "low" : value;
  return /*html*/ `
    <input type="radio" id="${id}" name="edit-priority" value="${value}" ${checked ? "checked" : ""}>
    <label for="${id}" class="${labelClass} priority-btn">${capitalize(value)}
      ${icon}
    </label>
  `;
}

/**
 * Handles capitalize.
 * @param {*} value - Parameter.
 * @returns {*} Result.
 */
/**
 * Handles capitalize.
 * @param {string} value - Value.
 * @returns {string} Result.
 */
function capitalize(value) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
}

/**
 * Handles getEditAssignedSection.
 * @returns {*} Result.
 */
/**
 * Returns edit assigned section.
 * @returns {string} Result.
 */
function getEditAssignedSection() {
  return /*html*/ `
    <div class="edit-assigned">
      <span>Assigned to</span>
      ${getEditAssignedSelect()}
      <div id="selectedAvatars" class="edit-avatar-container"></div>
    </div>
  `;
}

/**
 * Handles getEditAssignedSelect.
 * @returns {*} Result.
 */
/**
 * Returns edit assigned select.
 * @returns {string} Result.
 */
function getEditAssignedSelect() {
  return /*html*/ `
    <div id="selectContacts" class="custom-select">
      <span onclick="toggleDropdown(event)">Select contacts
        <img src="./assets/icons/arrow_drop_down.svg" alt="" class="dropdown-arrow">
      </span>
      <div id="dropdownContacts" class="dropdown-content" onclick="event.stopPropagation()"></div>
    </div>
  `;
}

/**
 * Handles getEditCategorySection.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns edit category section.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function getEditCategorySection(task) {
  return /*html*/ `
    <div class="edit-label">
      <span>Category<span class="req">*</span></span>
      ${getEditCategorySelect(task)}
      <input type="hidden" id="edit-category" value="${task.category || ''}">
    </div>
  `;
}

/**
 * Handles getEditCategorySelect.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns edit category select.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function getEditCategorySelect(task) {
  return /*html*/ `
    <div id="editCategorySelect" class="custom-select">
      <span onclick="toggleEditCategoryDropdown(event)">
        ${task.category ? task.category + " " : "Select task category "}
        <img src="./assets/icons/arrow_drop_down.svg" alt="" class="dropdown-arrow">
      </span>
      <div id="editCategoryDropdown" class="dropdown-content" onclick="event.stopPropagation()">
        ${generateEditCategoryOptions(task.category)}
      </div>
    </div>
  `;
}

/**
 * Handles generateEditCategoryOptions.
 * @param {*} current - Parameter.
 * @returns {*} Result.
 */
/**
 * Generates edit category options.
 * @param {*} current - Parameter.
 * @returns {string} Result.
 */
function generateEditCategoryOptions(current) {
  const categories = ["Technical Task", "User Story"];
  return categories.map((cat) => getEditCategoryOption(cat)).join("");
}

/**
 * Handles getEditCategoryOption.
 * @param {*} cat - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns edit category option.
 * @param {*} cat - Parameter.
 * @returns {string} Result.
 */
function getEditCategoryOption(cat) {
  return /*html*/ `
    <div class="dropdown-item" onclick="setEditCategory('${cat}')">
      <span class="dropdown-name">${cat}</span>
    </div>
  `;
}

/**
 * Handles getEditSubtasksSection.
 * @returns {*} Result.
 */
/**
 * Returns edit subtasks section.
 * @returns {string} Result.
 */
function getEditSubtasksSection() {
  return /*html*/ `
    <div class="edit-subtasks">
      <span>Subtasks</span>
      ${getEditSubtaskInput()}
      <ul id="editSubtaskArea" class="subtask-list"></ul>
    </div>
  `;
}

/**
 * Handles getEditSubtaskInput.
 * @returns {*} Result.
 */
/**
 * Returns edit subtask input.
 * @returns {string} Result.
 */
function getEditSubtaskInput() {
  return /*html*/ `
    <div class="subtasks">
      <input type="text" id="edit-subtask-input" placeholder="Add new subtask">
      ${getEditSubtaskInputActions()}
    </div>
  `;
}

/**
 * Handles getEditSubtaskInputActions.
 * @returns {*} Result.
 */
/**
 * Returns edit subtask input actions.
 * @returns {string} Result.
 */
function getEditSubtaskInputActions() {
  return /*html*/ `
    <div class="subtask-input-actions">
      <button type="button" class="subtask-icon-btn" onclick="clearEditSubtaskInput()" aria-label="Clear subtask">
        <img src="./assets/icons/iconoir_cancel.svg" alt="">
      </button>
      <div class="subtask-input-separator"></div>
      <button type="button" class="subtask-icon-btn" onclick="addEditSubtask()" aria-label="Add subtask">
        <img src="./assets/icons/checkmark.svg" alt="">
      </button>
    </div>
  `;
}

/**
 * Handles getEditFormActions.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns edit form actions.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function getEditFormActions(task) {
  return /*html*/ `
    <div class="edit-actions">
      <button type="button" class="edit-cancel" onclick="openModal(${task.id})">Cancel</button>
      <button type="submit" class="edit-save">OK</button>
    </div>
  `;
}

/**
 * Handles getEditSubtaskItemMarkup.
 * @param {*} subtask - Parameter.
 * @param {*} index - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns edit subtask item markup.
 * @param {Object} subtask - Subtask object.
 * @param {number} index - Index.
 * @returns {string} Result.
 */
function getEditSubtaskItemMarkup(subtask, index) {
  return /*html*/ `
    <li class="subtask">
      <span>${subtask.title}</span>
      ${getEditSubtaskActions(index)}
    </li>
  `;
}

/**
 * Handles getEditSubtaskActions.
 * @param {*} index - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns edit subtask actions.
 * @param {number} index - Index.
 * @returns {string} Result.
 */
function getEditSubtaskActions(index) {
  return /*html*/ `
    <div class="subtask-actions">
      <img src="./assets/icons/delete.svg" alt="Delete" onclick="deleteEditSubtask(${index})">
      <div class="action-separator"></div>
      <img src="./assets/icons/edit.svg" alt="Edit" onclick="editEditSubtask(${index})">
    </div>
  `;
}

/**
 * Handles getEditSubtaskEditMarkup.
 * @param {*} subtask - Parameter.
 * @param {*} index - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns edit subtask edit markup.
 * @param {Object} subtask - Subtask object.
 * @param {number} index - Index.
 * @returns {string} Result.
 */
function getEditSubtaskEditMarkup(subtask, index) {
  return /*html*/ `
    <li class="subtask subtask-edit">
      <input
        type="text"
        id="edit-subtask-edit-${index}"
        class="subtask-edit-input"
        value="${subtask.title}"
        placeholder="Edit subtask"
      >
      ${getEditSubtaskEditActions(index)}
    </li>
  `;
}

/**
 * Handles getEditSubtaskEditActions.
 * @param {*} index - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns edit subtask edit actions.
 * @param {number} index - Index.
 * @returns {string} Result.
 */
function getEditSubtaskEditActions(index) {
  return /*html*/ `
    <div class="subtask-input-actions">
      <button type="button" class="subtask-icon-btn" onclick="deleteEditSubtask(${index})" aria-label="Delete subtask">
        <img src="./assets/icons/delete.svg" alt="">
      </button>
      <div class="subtask-input-separator"></div>
      <button type="button" class="subtask-icon-btn" onclick="saveEditedEditSubtask(${index})" aria-label="Save subtask">
        <img src="./assets/icons/checkmark.svg" alt="">
      </button>
    </div>
  `;
}
