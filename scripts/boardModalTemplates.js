/**
 * Returns task modal template.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function getTaskModalTemplate(task) {
  return /*html*/ `
    <div class="modal-content">
      <span class="close" onclick="closeModal()">&times;</span>
      <div class="task-category" style="background-color: ${task.category === "User Story" ? "#0038FF" : "#1FD7C1"}">${task.category}</div>
      <div class="modal-title"><h2>${task.title}</h2></div>
      <div class="modal-description">${task.description}</div>
      <div class="modal-date"><span class="modal-titles-task">Due date:</span> ${task.dueDate}</div>
      <div class="modal-priority">
        <span class="modal-titles-task">Priority:</span>
        <div>${task.priority}</div>
        ${task.priority === "urgent" ? '<img src="./assets/img/Category_Urgent.svg" alt="Urgent">'
          : task.priority === "medium" ? '<img src="./assets/icons/medium_orange.svg" alt="Medium">'
          : '<img src="./assets/img/Category_Low.svg" alt="Low">'}
      </div>
      <div class="modal-contacts">
        <span class="modal-titles-task">Assigned To:</span>
        <div class="modal-contacts-list">
          ${generateModalAssignedContacts(task)}
        </div>
      </div>
      <div class="modal-subtasks-area">
        <span class="modal-titles-task">Subtasks</span>
        <div class="modal-subtasks">
          ${generateModalSubtasks(task)}
        </div>
      </div>
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
    </div>
  `;
}
/**
 * Generates modal assigned contacts.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function generateModalAssignedContacts(task) {
  if (!task.contacts || task.contacts.length === 0) {
    return "—";
  }
  return task.contacts.map((name) => {
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
  }).join("");
}
/**
 * Generates modal subtasks.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function generateModalSubtasks(task) {
  if (!task.subtasks || task.subtasks.length === 0) {
    return "<span>No subtasks</span>";
  }
  return task.subtasks.map((st, i) => /*html*/ `
    <label class="modal-subtask">
      <input type="checkbox"
             ${st.done ? "checked" : ""}
             onchange="toggleSubtaskDone(${task.id}, ${i}, this)">
      <span>${st.title}</span>
    </label>
  `).join("");
}
/**
 * Generates edit task template.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function generateEditTaskTemplate(task) {
  return /*html*/ `
    <form class="edit-task-form" id="editTaskForm" onsubmit="saveEditedTask(event, ${task.id})">
      <div class="edit-form-scroll">
        <label class="edit-label">
          <span>Title<span class="req">*</span></span>
          <input class="edit-input" type="text" id="edit-title" value="${task.title}" required>
        </label>
        <label class="edit-label">
          <span>Description</span>
          <textarea class="edit-textarea" id="edit-description">${task.description}</textarea>
        </label>
        <label class="edit-label">
          <span>Due date<span class="req">*</span></span>
          <input class="edit-input" type="date" id="edit-date" value="${task.dueDate}" required>
        </label>
        <div class="priority">
          <span>Priority</span>
          <div class="priority-options">
            <input type="radio" id="edit-urgent" name="edit-priority" value="urgent" ${task.priority === "urgent" ? "checked" : ""}>
            <label for="edit-urgent" class="urgent priority-btn">Urgent ${URGENT_ICON}</label>
            <input type="radio" id="edit-medium" name="edit-priority" value="medium" ${task.priority === "medium" ? "checked" : ""}>
            <label for="edit-medium" class="medium priority-btn">Medium ${MEDIUM_ICON}</label>
            <input type="radio" id="edit-low" name="edit-priority" value="low" ${task.priority === "low" ? "checked" : ""}>
            <label for="edit-low" class="low priority-btn">Low ${LOW_ICON}</label>
          </div>
        </div>
        <div class="edit-assigned">
          <span>Assigned to</span>
          <div id="selectContacts" class="custom-select">
            <span onclick="toggleDropdown(event)">Select contacts
              <img src="./assets/icons/arrow_drop_down.svg" alt="" class="dropdown-arrow">
            </span>
            <div id="dropdownContacts" class="dropdown-content" onclick="event.stopPropagation()"></div>
          </div>
          <div id="selectedAvatars" class="edit-avatar-container"></div>
        </div>
        <div class="edit-label">
          <span>Category<span class="req">*</span></span>
          <div id="editCategorySelect" class="custom-select">
            <span onclick="toggleEditCategoryDropdown(event)">
              ${task.category ? task.category + " " : "Select task category "}
              <img src="./assets/icons/arrow_drop_down.svg" alt="" class="dropdown-arrow">
            </span>
            <div id="editCategoryDropdown" class="dropdown-content" onclick="event.stopPropagation()">
              ${generateEditCategoryOptions(task.category)}
            </div>
          </div>
          <input type="hidden" id="edit-category" value="${task.category || ''}">
        </div>
        <div class="edit-subtasks">
          <span>Subtasks</span>
          <div class="subtasks">
            <input type="text" id="edit-subtask-input" placeholder="Add new subtask">
            <div class="subtask-input-actions">
              <button type="button" class="subtask-icon-btn" onclick="clearEditSubtaskInput()" aria-label="Clear subtask">
                <img src="./assets/icons/iconoir_cancel.svg" alt="">
              </button>
              <div class="subtask-input-separator"></div>
              <button type="button" class="subtask-icon-btn" onclick="addEditSubtask()" aria-label="Add subtask">
                <img src="./assets/icons/checkmark.svg" alt="">
              </button>
            </div>
          </div>
          <ul id="editSubtaskArea" class="subtask-list"></ul>
        </div>
      </div>
      <div class="edit-actions">
        <button type="button" class="edit-cancel" onclick="openModal(${task.id})">Cancel</button>
        <button type="submit" class="edit-save">OK</button>
      </div>
    </form>
  `;
}
/**
 * Generates edit category options.
 * @param {*} current - Parameter.
 * @returns {string} Result.
 */
function generateEditCategoryOptions(current) {
  const categories = ["Technical Task", "User Story"];
  return categories.map((cat) => /*html*/ `
    <div class="dropdown-item" onclick="setEditCategory('${cat}')">
      <span class="dropdown-name">${cat}</span>
    </div>
  `).join("");
}
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
      <div class="subtask-actions">
        <img src="./assets/icons/delete.svg" alt="Delete" onclick="deleteEditSubtask(${index})">
        <div class="action-separator"></div>
        <img src="./assets/icons/edit.svg" alt="Edit" onclick="editEditSubtask(${index})">
      </div>
    </li>
  `;
}
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
      <div class="subtask-input-actions">
        <button type="button" class="subtask-icon-btn" onclick="deleteEditSubtask(${index})" aria-label="Delete subtask">
          <img src="./assets/icons/delete.svg" alt="">
        </button>
        <div class="subtask-input-separator"></div>
        <button type="button" class="subtask-icon-btn" onclick="saveEditedEditSubtask(${index})" aria-label="Save subtask">
          <img src="./assets/icons/checkmark.svg" alt="">
        </button>
      </div>
    </li>
  `;
}
