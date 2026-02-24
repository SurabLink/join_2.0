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

function getModalCloseButton() {
  return /*html*/ `<span class="close" onclick="closeModal()">&times;</span>`;
}

function getModalCategory(task) {
  const color = task.category === "User Story" ? "#0038FF" : "#1FD7C1";
  return /*html*/ `
    <div class="task-category" style="background-color: ${color}">
      ${task.category}
    </div>
  `;
}

function getModalTitle(task) {
  return /*html*/ `<div class="modal-title"><h2>${task.title}</h2></div>`;
}

function getModalDescription(task) {
  return /*html*/ `<div class="modal-description">${task.description}</div>`;
}

function getModalDate(task) {
  return /*html*/ `
    <div class="modal-date">
      <span class="modal-titles-task">Due date:</span> ${task.dueDate}
    </div>
  `;
}

function getModalPriority(task) {
  return /*html*/ `
    <div class="modal-priority">
      <span class="modal-titles-task">Priority:</span>
      <div>${task.priority}</div>
      ${getModalPriorityIcon(task.priority)}
    </div>
  `;
}

function getModalPriorityIcon(priority) {
  if (priority === "urgent") return '<img src="./assets/img/Category_Urgent.svg" alt="Urgent">';
  if (priority === "medium") return '<img src="./assets/icons/medium_orange.svg" alt="Medium">';
  return '<img src="./assets/img/Category_Low.svg" alt="Low">';
}

function getModalAssignedSection(task) {
  return /*html*/ `
    <div class="modal-contacts">
      <span class="modal-titles-task">Assigned To:</span>
      <div class="modal-contacts-list">${generateModalAssignedContacts(task)}</div>
    </div>
  `;
}

function generateModalAssignedContacts(task) {
  if (!task.contacts || task.contacts.length === 0) {
    return "—";
  }
  return task.contacts.map((name) => getModalAssignedContact(name)).join("");
}

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

function getModalSubtasksSection(task) {
  return /*html*/ `
    <div class="modal-subtasks-area">
      <span class="modal-titles-task">Subtasks</span>
      <div class="modal-subtasks">${generateModalSubtasks(task)}</div>
    </div>
  `;
}

function generateModalSubtasks(task) {
  if (!task.subtasks || task.subtasks.length === 0) {
    return "<span>No subtasks</span>";
  }
  return task.subtasks.map((st, i) => getModalSubtaskItem(task, st, i)).join("");
}

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

function generateEditTaskTemplate(task) {
  return /*html*/ `
    <form class="edit-task-form" id="editTaskForm" onsubmit="saveEditedTask(event, ${task.id})">
      ${getEditFormScroll(task)}
      ${getEditFormActions(task)}
    </form>
  `;
}

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

function getEditTitleField(task) {
  return /*html*/ `
    <label class="edit-label">
      <span>Title<span class="req">*</span></span>
      <input class="edit-input" type="text" id="edit-title" value="${task.title}" required>
    </label>
  `;
}

function getEditDescriptionField(task) {
  return /*html*/ `
    <label class="edit-label">
      <span>Description</span>
      <textarea class="edit-textarea" id="edit-description">${task.description}</textarea>
    </label>
  `;
}

function getEditDateField(task) {
  return /*html*/ `
    <label class="edit-label">
      <span>Due date<span class="req">*</span></span>
      <input class="edit-input" type="date" id="edit-date" value="${task.dueDate}" required>
    </label>
  `;
}

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

function capitalize(value) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
}

function getEditAssignedSection() {
  return /*html*/ `
    <div class="edit-assigned">
      <span>Assigned to</span>
      ${getEditAssignedSelect()}
      <div id="selectedAvatars" class="edit-avatar-container"></div>
    </div>
  `;
}

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

function getEditCategorySection(task) {
  return /*html*/ `
    <div class="edit-label">
      <span>Category<span class="req">*</span></span>
      ${getEditCategorySelect(task)}
      <input type="hidden" id="edit-category" value="${task.category || ''}">
    </div>
  `;
}

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

function generateEditCategoryOptions(current) {
  const categories = ["Technical Task", "User Story"];
  return categories.map((cat) => getEditCategoryOption(cat)).join("");
}

function getEditCategoryOption(cat) {
  return /*html*/ `
    <div class="dropdown-item" onclick="setEditCategory('${cat}')">
      <span class="dropdown-name">${cat}</span>
    </div>
  `;
}

function getEditSubtasksSection() {
  return /*html*/ `
    <div class="edit-subtasks">
      <span>Subtasks</span>
      ${getEditSubtaskInput()}
      <ul id="editSubtaskArea" class="subtask-list"></ul>
    </div>
  `;
}

function getEditSubtaskInput() {
  return /*html*/ `
    <div class="subtasks">
      <input type="text" id="edit-subtask-input" placeholder="Add new subtask">
      ${getEditSubtaskInputActions()}
    </div>
  `;
}

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

function getEditFormActions(task) {
  return /*html*/ `
    <div class="edit-actions">
      <button type="button" class="edit-cancel" onclick="openModal(${task.id})">Cancel</button>
      <button type="submit" class="edit-save">OK</button>
    </div>
  `;
}

function getEditSubtaskItemMarkup(subtask, index) {
  return /*html*/ `
    <li class="subtask">
      <span>${subtask.title}</span>
      ${getEditSubtaskActions(index)}
    </li>
  `;
}

function getEditSubtaskActions(index) {
  return /*html*/ `
    <div class="subtask-actions">
      <img src="./assets/icons/delete.svg" alt="Delete" onclick="deleteEditSubtask(${index})">
      <div class="action-separator"></div>
      <img src="./assets/icons/edit.svg" alt="Edit" onclick="editEditSubtask(${index})">
    </div>
  `;
}

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
