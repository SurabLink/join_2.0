function getBoardTemplate() {
  return getBoardHeader() + getBoardColumns();
}

function getBoardHeader() {
  return /*html*/ `
    <div class="board-header">
      <h1>Board</h1>
      <img src="./assets/icons/plus add task mobile.svg" alt="Add Task Button" class="add-task-mobile-btn" onclick="showAddTaskDialog()">
      ${getBoardActions()}
    </div>
  `;
}

function getBoardActions() {
  return /*html*/ `
    <div class="board-actions">
      ${getBoardSearch()}
      <button class="add-task-btn" onclick="showAddTaskDialog()">Add Task +</button>
    </div>
  `;
}

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

function getSearchIcon() {
  return /*html*/ `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
    </svg>
  `;
}

function getBoardColumns() {
  return /*html*/ `
    <div class="board-columns">
      ${getBoardColumnsMarkup()}
    </div>
  `;
}

function getBoardColumnsMarkup() {
  return getBoardColumnConfigs().map(getBoardColumn).join("");
}

function getBoardColumnConfigs() {
  return [
    { id: "todo-column", title: "To Do", status: "To Do", showAdd: true },
    { id: "inprogress-column", title: "In Progress", status: "In Progress", showAdd: true },
    { id: "awaiting-column", title: "Await Feedback", status: "Await Feedback", showAdd: true },
    { id: "done-column", title: "Done", status: "Done", showAdd: false },
  ];
}

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

function getColumnHeader(config) {
  return /*html*/ `
    <div class="column-header">
      <h2>${config.title}</h2>
      ${getColumnAddButton(config.showAdd)}
    </div>
  `;
}

function getColumnAddButton(showAdd) {
  if (!showAdd) return "";
  return /*html*/ `
    <img src="./assets/icons/plus button.svg" alt="Add Task Button" width="30" height="30" onclick="showAddTaskDialog()">
  `;
}

function getNoTasksPlaceholder() {
  return /*html*/ `
    <div class="no-tasks">
      <span>No tasks To do</span>
    </div>
  `;
}

function createTaskCard(task) {
  return /*html*/ `
    <div class="task-card"
      draggable="true"
      ondragstart="startDrag(${task.id})"
      onclick="openModal(${task.id})">
      ${getTaskCategoryLabel(task)}
      <h3>${highlightText(task.title)}</h3>
      <span>${highlightText(task.description.substring(0, 50))}...</span>
      <div class="subtask-card">
        ${renderSubtaskProgress(task)}
      </div>
      ${getTaskFooter(task)}
    </div>
  `;
}

function getTaskCategoryLabel(task) {
  const color = task.category === "User Story" ? "#0038FF" : "#1FD7C1";
  return /*html*/ `
    <h2 class="task-category" style="background-color: ${color}">${task.category}</h2>
  `;
}

function getTaskFooter(task) {
  return /*html*/ `
    <div class="task-footer">
      <div class="avatar-container" id="avatars-${task.id}"></div>
      <div>
        ${getPriorityIcon(task.priority)}
      </div>
    </div>
  `;
}

function getPriorityIcon(priority) {
  if (priority === "urgent") return '<img src="./assets/img/Category_Urgent.svg">';
  if (priority === "medium") return '<img src="./assets/icons/medium_orange.svg">';
  return '<img src="./assets/img/Category_Low.svg">';
}
