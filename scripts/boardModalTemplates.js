const BOARD_URGENT_ICON = `
  <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.6528 15.2547C19.4182 15.2551 19.1896 15.1803 19.0007 15.0412L10.7487 8.958L2.49663 15.0412C2.38078 15.1267 2.24919 15.1887 2.10939 15.2234C1.96959 15.2582 1.82431 15.2651 1.68184 15.2437C1.53937 15.2223 1.40251 15.1732 1.27906 15.099C1.15562 15.0247 1.04801 14.927 0.96238 14.8112C0.876751 14.6954 0.814779 14.5639 0.780002 14.4243C0.745226 14.2846 0.738325 14.1394 0.759696 13.997C0.802855 13.7095 0.958545 13.4509 1.19252 13.2781L10.0966 6.70761C10.2853 6.56802 10.5139 6.49268 10.7487 6.49268C10.9835 6.49268 11.212 6.56802 11.4007 6.70761L20.3048 13.2781C20.4908 13.415 20.6286 13.6071 20.6988 13.827C20.7689 14.0469 20.7678 14.2833 20.6955 14.5025C20.6232 14.7216 20.4834 14.9124 20.2962 15.0475C20.1089 15.1826 19.8837 15.2551 19.6528 15.2547Z"
      fill="#FF3D00" />
    <path
      d="M19.6528 9.50568C19.4182 9.50609 19.1896 9.43124 19.0007 9.29214L10.7487 3.20898L2.49663 9.29214C2.26266 9.46495 1.96957 9.5378 1.68184 9.49468C1.39412 9.45155 1.13532 9.29597 0.962385 9.06218C0.789449 8.82838 0.716541 8.53551 0.7597 8.24799C0.802859 7.96048 0.95855 7.70187 1.19252 7.52906L10.0966 0.958588C10.2853 0.818997 10.5139 0.743652 10.7487 0.743652C10.9835 0.743652 11.212 0.818997 11.4007 0.958588L20.3048 7.52906C20.4908 7.66598 20.6286 7.85809 20.6988 8.07797C20.769 8.29785 20.7678 8.53426 20.6955 8.75344C20.6232 8.97262 20.4834 9.16338 20.2962 9.29847C20.1089 9.43356 19.8837 9.50608 19.6528 9.50568Z"
      fill="#FF3D00" />
  </svg>
`;

const BOARD_MEDIUM_ICON = `
  <svg width="21" height="8" viewBox="0 0 21 8" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.1526 7.72528H1.34443C1.05378 7.72528 0.775033 7.60898 0.569514 7.40197C0.363995 7.19495 0.248535 6.91419 0.248535 6.62143C0.248535 6.32867 0.363995 6.0479 0.569514 5.84089C0.775033 5.63388 1.05378 5.51758 1.34443 5.51758H19.1526C19.4433 5.51758 19.722 5.63388 19.9276 5.84089C20.1331 6.0479 20.2485 6.32867 20.2485 6.62143C20.2485 6.91419 20.1331 7.19495 19.9276 7.40197C19.722 7.60898 19.4433 7.72528 19.1526 7.72528Z"
      fill="#FFA801" />
    <path
      d="M19.1526 2.48211H1.34443C1.05378 2.48211 0.775033 2.36581 0.569514 2.1588C0.363995 1.95179 0.248535 1.67102 0.248535 1.37826C0.248535 1.0855 0.363995 0.804736 0.569514 0.597724C0.775033 0.390712 1.05378 0.274414 1.34443 0.274414L19.1526 0.274414C19.4433 0.274414 19.722 0.390712 19.9276 0.597724C20.1331 0.804736 20.2485 1.0855 20.2485 1.37826C20.2485 1.67102 20.1331 1.95179 19.9276 2.1588C19.722 2.36581 19.4433 2.48211 19.1526 2.48211Z"
      fill="#FFA801" />
  </svg>
`;

const BOARD_LOW_ICON = `
  <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.2485 9.50589C10.0139 9.5063 9.7854 9.43145 9.59655 9.29238L0.693448 2.72264C0.57761 2.63708 0.47977 2.52957 0.405515 2.40623C0.33126 2.28289 0.282043 2.14614 0.260675 2.00379C0.217521 1.71631 0.290421 1.42347 0.463337 1.1897C0.636253 0.955928 0.895022 0.800371 1.18272 0.757248C1.47041 0.714126 1.76347 0.786972 1.99741 0.95976L10.2485 7.04224L18.4997 0.95976C18.6155 0.874204 18.7471 0.812285 18.8869 0.777538C19.0266 0.742791 19.1719 0.735896 19.3144 0.757248C19.4568 0.7786 19.5937 0.82778 19.7171 0.901981C19.8405 0.976181 19.9481 1.07395 20.0337 1.1897C20.1194 1.30545 20.1813 1.43692 20.2161 1.57661C20.2509 1.71629 20.2578 1.86145 20.2364 2.00379C20.215 2.14614 20.1658 2.28289 20.0916 2.40623C20.0173 2.52957 19.9195 2.63708 19.8036 2.72264L10.9005 9.29238C10.7117 9.43145 10.4831 9.5063 10.2485 9.50589Z"
      fill="#7AE229" />
    <path
      d="M10.2485 15.2544C10.0139 15.2548 9.7854 15.18 9.59655 15.0409L0.693448 8.47117C0.459502 8.29839 0.30383 8.03981 0.260675 7.75233C0.217521 7.46485 0.290421 7.17201 0.463337 6.93824C0.636253 6.70446 0.895021 6.54891 1.18272 6.50578C1.47041 6.46266 1.76347 6.53551 1.99741 6.7083L10.2485 12.7908L18.4997 6.7083C18.7336 6.53551 19.0267 6.46266 19.3144 6.50578C19.602 6.54891 19.8608 6.70446 20.0337 6.93824C20.2066 7.17201 20.2795 7.46485 20.2364 7.75233C20.1932 8.03981 20.0376 8.29839 19.8036 8.47117L10.9005 15.0409C10.7117 15.18 10.4831 15.2548 10.2485 15.2544Z"
      fill="#7AE229" />
  </svg>
`;

function getTaskModalContent(task, id) {
  return /*html*/ `
    <div class="modal-content">
      ${getModalCloseButton()}
      ${getModalCategory(task)}
      ${getModalTitle(task)}
      ${getModalDescription(task)}
      ${getModalDate(task)}
      ${getModalPriority(task)}
      ${getModalContacts(task)}
      ${getModalSubtasks(task)}
      ${getModalActions(id)}
    </div>
  `;
}

function getModalCloseButton() {
  return /*html*/ `
    <span class="close" onclick="closeModal()">&times;</span>
  `;
}

function getModalCategory(task) {
  const color = task.category === "User Story" ? "#0038FF" : "#1FD7C1";
  return /*html*/ `
    <div class="task-category" style="background-color: ${color}">${task.category}</div>
  `;
}

function getModalTitle(task) {
  return /*html*/ `
    <div class="modal-title"><h2>${task.title}</h2></div>
  `;
}

function getModalDescription(task) {
  return /*html*/ `
    <div class="modal-description">${task.description}</div>
  `;
}

function getModalDate(task) {
  return /*html*/ `
    <div class="modal-date"><span class="modal-titles-task">Due date:</span> ${task.dueDate}</div>
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
  if (priority === "medium") return '<img src="./assets/icons/medium_orange.svg" alt="Medium" color="orange">';
  return '<img src="./assets/img/Category_Low.svg" alt="Low">';
}

function getModalContacts(task) {
  return /*html*/ `
    <div class="modal-contacts">
      <span class="modal-titles-task">Assigned To:</span>
      <div class="modal-contacts-list">
        ${getModalAssignedContactsMarkup(task)}
      </div>
    </div>
  `;
}

function getModalAssignedContactsMarkup(task) {
  if (!task.contacts || task.contacts.length === 0) return "—";
  return task.contacts.map((name) => getModalContactItem(name)).join("");
}

function getModalContactItem(name) {
  if (!name) return "";
  const initials = name.split(" ").map(n => n[0]).join("");
  return /*html*/ `
    <div class="modal-contact">
      <div class="avatar" style="background-color: ${getRandomColor()};">
        ${initials}
      </div>
      <span>${name}</span>
    </div>
  `;
}

function getModalSubtasks(task) {
  return /*html*/ `
    <div class="modal-subtasks-area">
      <span class="modal-titles-task">Subtasks</span>
      <div class="modal-subtasks">
        ${getModalSubtasksMarkup(task)}
      </div>
    </div>
  `;
}

function getModalSubtasksMarkup(task) {
  if (!task.subtasks || task.subtasks.length === 0) return "<span>No subtasks</span>";
  return task.subtasks.map((st, i) => getModalSubtaskItem(task.id, st, i)).join("");
}

function getModalSubtaskItem(taskId, subtask, index) {
  return /*html*/ `
    <label class="modal-subtask">
      <input type="checkbox"
        ${subtask.done ? "checked" : ""}
        onchange="toggleSubtaskDone(${taskId}, ${index}, this)">
      <span>${subtask.title}</span>
    </label>
  `;
}

function getModalActions(id) {
  return /*html*/ `
    <div class="modal-actions">
      ${getModalDeleteAction()}
      <div class="action-separator"></div>
      ${getModalEditAction(id)}
    </div>
  `;
}

function getModalDeleteAction() {
  return /*html*/ `
    <div class="modal-delete" onclick="deleteTask()">
      <img src="./assets/icons/delete.svg" alt="Delete">
      <span>Delete</span>
    </div>
  `;
}

function getModalEditAction(id) {
  return /*html*/ `
    <div class="modal-edit" onclick="openEditTaskModal(${id})">
      <img src="./assets/icons/edit.svg" alt="Edit">
      <span>Edit</span>
    </div>
  `;
}

function getEditTaskFormTemplate(task) {
  return /*html*/ `
    <form class="edit-task-form" id="editTaskForm" onsubmit="saveEditedTask(event, ${task.id})">
      <div class="edit-form-scroll">
        ${getEditTitleField(task)}
        ${getEditDescriptionField(task)}
        ${getEditDateField(task)}
        ${getEditPrioritySection(task)}
        ${getEditAssignedSection()}
        ${getEditCategorySection(task)}
        ${getEditSubtasksSection()}
      </div>
      ${getEditFormActions(task)}
    </form>
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
        ${getEditPriorityOption("urgent", "Urgent", task.priority)}
        ${getEditPriorityOption("medium", "Medium", task.priority)}
        ${getEditPriorityOption("low", "Low", task.priority)}
      </div>
    </div>
  `;
}

function getEditPriorityOption(value, label, current) {
  const checked = current === value ? "checked" : "";
  return /*html*/ `
    <input type="radio" id="edit-${value}" name="edit-priority" value="${value}" ${checked}>
    <label for="edit-${value}" class="${value} priority-btn">${label}
      ${getEditPriorityIcon(value)}
    </label>
  `;
}

function getEditPriorityIcon(value) {
  if (value === "urgent") return BOARD_URGENT_ICON;
  if (value === "medium") return BOARD_MEDIUM_ICON;
  return BOARD_LOW_ICON;
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

function getEditSubtasksSection() {
  return /*html*/ `
    <div class="edit-subtasks">
      <span>Subtasks</span>
      ${getEditSubtaskInputRow()}
      <ul id="editSubtaskArea" class="subtask-list"></ul>
    </div>
  `;
}

function getEditSubtaskInputRow() {
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

function getEditSubtaskItem(st, i) {
  return /*html*/ `
    <li class="subtask">
      <span>${st.title}</span>
      ${getEditSubtaskActions(i)}
    </li>
  `;
}

function getEditSubtaskActions(i) {
  return /*html*/ `
    <div class="subtask-actions">
      <img src="./assets/icons/delete.svg" alt="Delete" onclick="deleteEditSubtask(${i})">
      <div class="action-separator"></div>
      <img src="./assets/icons/edit.svg" alt="Edit" onclick="editEditSubtask(${i})">
    </div>
  `;
}

function getEditSubtaskEditItem(st, i) {
  return /*html*/ `
    <li class="subtask subtask-edit">
      <input type="text" id="edit-subtask-edit-${i}" class="subtask-edit-input" value="${st.title}" placeholder="Edit subtask">
      ${getEditSubtaskEditActions(i)}
    </li>
  `;
}

function getEditSubtaskEditActions(i) {
  return /*html*/ `
    <div class="subtask-input-actions">
      <button type="button" class="subtask-icon-btn" onclick="deleteEditSubtask(${i})" aria-label="Delete subtask">
        <img src="./assets/icons/delete.svg" alt="">
      </button>
      <div class="subtask-input-separator"></div>
      <button type="button" class="subtask-icon-btn" onclick="saveEditedEditSubtask(${i})" aria-label="Save subtask">
        <img src="./assets/icons/checkmark.svg" alt="">
      </button>
    </div>
  `;
}
