/**
 * Handles getBoardTemplate.
 * @returns {*} Result.
 */
/**
 * Returns board template.
 * @returns {string} Result.
 */
function getBoardTemplate() {
  return getBoardHeader() + getBoardColumns();
}

/**
 * Handles getBoardHeader.
 * @returns {*} Result.
 */
/**
 * Returns board header.
 * @returns {string} Result.
 */
function getBoardHeader() {
  return /*html*/ `
    <div class="board-header">
      <h1>Board</h1>
      <img src="./assets/icons/plus add task mobile.svg" alt="Add Task Button" class="add-task-mobile-btn" onclick="showAddTaskDialog()">
      ${getBoardActions()}
    </div>
  `;
}

/**
 * Handles getBoardActions.
 * @returns {*} Result.
 */
/**
 * Returns board actions.
 * @returns {string} Result.
 */
function getBoardActions() {
  return /*html*/ `
    <div class="board-actions">
      ${getBoardSearch()}
      <button class="add-task-btn" onclick="showAddTaskDialog()">Add Task +</button>
    </div>
  `;
}

/**
 * Handles getBoardSearch.
 * @returns {*} Result.
 */
/**
 * Returns board search.
 * @returns {string} Result.
 */
function getBoardSearch() {
  return /*html*/ `
    <div class="board-search">
      <input id="search-task" type="text" placeholder="Find Task">
      <button id="search-clear" class="search-clear" type="button" aria-label="Clear search">×</button>
      <div class="search-divider"></div>
      ${getSearchIcon()}
    </div>
  `;
}

/**
 * Handles getSearchIcon.
 * @returns {*} Result.
 */
/**
 * Returns search icon.
 * @returns {string} Result.
 */
function getSearchIcon() {
  return /*html*/ `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
    </svg>
  `;
}

/**
 * Handles getBoardColumns.
 * @returns {*} Result.
 */
/**
 * Returns board columns.
 * @returns {string} Result.
 */
function getBoardColumns() {
  return /*html*/ `
    <div class="board-columns">
      ${getBoardColumnsMarkup()}
    </div>
  `;
}

/**
 * Handles getBoardColumnsMarkup.
 * @returns {*} Result.
 */
/**
 * Returns board columns markup.
 * @returns {string} Result.
 */
function getBoardColumnsMarkup() {
  return getBoardColumnConfigs().map(getBoardColumn).join("");
}

/**
 * Handles getBoardColumnConfigs.
 * @returns {*} Result.
 */
/**
 * Returns board column configs.
 * @returns {string} Result.
 */
function getBoardColumnConfigs() {
  return [
    { id: "todo-column", title: "To Do", status: "To Do", showAdd: true },
    { id: "inprogress-column", title: "In Progress", status: "In Progress", showAdd: true },
    { id: "awaiting-column", title: "Await Feedback", status: "Await Feedback", showAdd: true },
    { id: "done-column", title: "Done", status: "Done", showAdd: false },
  ];
}

/**
 * Handles getBoardColumn.
 * @param {*} config - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns board column.
 * @param {*} config - Parameter.
 * @returns {string} Result.
 */
function getBoardColumn(config) {
  return /*html*/ `
    <div class="board-column"
      id="${config.id}"
      ondragover="allowDrop(event)"
      ondrop="dropTask(event, '${config.status}')">
      ${getColumnHeader(config)}
      ${getNoTasksPlaceholder()}
    </div>
  `;
}

/**
 * Handles getColumnHeader.
 * @param {*} config - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns column header.
 * @param {*} config - Parameter.
 * @returns {string} Result.
 */
function getColumnHeader(config) {
  return /*html*/ `
    <div class="column-header">
      <h2>${config.title}</h2>
      ${getColumnAddButton(config.showAdd)}
    </div>
  `;
}

/**
 * Handles getColumnAddButton.
 * @param {*} showAdd - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns column add button.
 * @param {*} showAdd - Parameter.
 * @returns {string} Result.
 */
function getColumnAddButton(showAdd) {
  if (!showAdd) return "";
  return /*html*/ `
    <img src="./assets/icons/plus button.svg" alt="Add Task Button" width="30" height="30" onclick="showAddTaskDialog()">
  `;
}

/**
 * Handles getNoTasksPlaceholder.
 * @returns {*} Result.
 */
/**
 * Returns no tasks placeholder.
 * @returns {string} Result.
 */
function getNoTasksPlaceholder() {
  return /*html*/ `
    <div class="no-tasks">
      <span>No tasks To do</span>
    </div>
  `;
}

/**
 * Handles createTaskCard.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Creates task card.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function createTaskCard(task) {
  return /*html*/ `
    <div class="task-card" draggable="true" ondragstart="startDrag(${task.id})" onclick="openModal(${task.id})">
      ${getTaskCategoryLabel(task)}
      ${getTaskTitle(task)}
      ${getTaskDescription(task)}
      ${getTaskSubtasks(task)}
      ${getTaskFooter(task)}
    </div>
  `;
}

/**
 * Handles getTaskCategoryLabel.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns task category label.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function getTaskCategoryLabel(task) {
  const color = task.category === "User Story" ? "#0038FF" : "#1FD7C1";
  return /*html*/ `
    <h2 class="task-category" style="background-color: ${color}">${task.category}</h2>
  `;
}

/**
 * Handles getTaskTitle.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns task title.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function getTaskTitle(task) {
  return `<h3>${highlightText(task.title)}</h3>`;
}

/**
 * Handles getTaskDescription.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns task description.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function getTaskDescription(task) {
  const text = task.description.substring(0, 50);
  return `<span>${highlightText(text)}...</span>`;
}

/**
 * Handles getTaskSubtasks.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns task subtasks.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function getTaskSubtasks(task) {
  return /*html*/ `
    <div class="subtask-card">
      ${renderSubtaskProgress(task)}
    </div>
  `;
}

/**
 * Handles getTaskFooter.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns task footer.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function getTaskFooter(task) {
  return /*html*/ `
    <div class="task-footer">
      <div class="avatar-container" id="avatars-${task.id}"></div>
      <div>${getPriorityIcon(task.priority)}</div>
    </div>
  `;
}

/**
 * Handles getPriorityIcon.
 * @param {*} priority - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns priority icon.
 * @param {*} priority - Parameter.
 * @returns {string} Result.
 */
function getPriorityIcon(priority) {
  if (priority === "urgent") return '<img src="./assets/img/Category_Urgent.svg">';
  if (priority === "medium") return '<img src="./assets/icons/medium_orange.svg">';
  return '<img src="./assets/img/Category_Low.svg">';
}

/**
 * Handles renderSubtaskProgress.
 * @param {*} task - Parameter.
 * @returns {*} Result.
 */
/**
 * Renders subtask progress.
 * @param {Object} task - Task object.
 * @returns {string} Result.
 */
function renderSubtaskProgress(task) {
  if (!task.subtasks || task.subtasks.length === 0) {
    return `<div>0/0</div>`;
  }
  const done = task.subtasks.filter(st => st.done).length;
  const total = task.subtasks.length;
  const percent = Math.round((done / total) * 100);
  return getSubtaskProgressMarkup(percent, done, total);
}

/**
 * Handles getSubtaskProgressMarkup.
 * @param {*} percent - Parameter.
 * @param {*} done - Parameter.
 * @param {*} total - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns subtask progress markup.
 * @param {*} percent - Parameter.
 * @param {*} done - Parameter.
 * @param {*} total - Parameter.
 * @returns {string} Result.
 */
function getSubtaskProgressMarkup(percent, done, total) {
  return /*html*/ `
    <div class="subtask-progress-bar">
      <div class="subtask-progress-fill" style="width:${percent}%"></div>
    </div>
    <div>${done}/${total}</div>
  `;
}

/**
 * Handles getAvatarMarkup.
 * @param {*} initials - Parameter.
 * @param {*} color - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns avatar markup.
 * @param {*} initials - Parameter.
 * @param {*} color - Parameter.
 * @returns {string} Result.
 */
function getAvatarMarkup(initials, color) {
  return /*html*/ `
    <div class="avatar" style="background-color: ${color};">
      ${initials}
    </div>
  `;
}
