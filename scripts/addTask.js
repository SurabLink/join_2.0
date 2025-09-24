let contacts = [
  { id: 1, name: "Alex Johnson", email: "alex@example.com", phone: "+49 123 456789", avatar: "assets/avatar1.jpg" },
  { id: 2, name: "Maria Gomez", email: "maria@example.com", phone: "+49 987 654321", avatar: "assets/avatar3.jpg" },
  { id: 3, name: "Chris Müller", email: "chris@example.com", phone: "+49 555 123456", avatar: "assets/avatar4.jpg" }
];

let subtasks = [];

function renderAddTask() {
  let content = document.getElementById('addTaskContent');

  content.innerHTML = '';
  content.innerHTML += generateAddTask();
  selectContacts();
}

/** Neues Task-Objekt anlegen und in Firebase speichern */
async function saveToArray(event) {
  event.preventDefault();
  const task = generateTaskFromForm();

  await saveTask(task);
  alert("Task erfolgreich erstellt!");
  subtasks.length = 0;
  showSubtasks();
  document.getElementById('addTaskForm').reset();
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

function selectContacts() {
  let select = document.getElementById('selectContacts');

  select.innerHTML = '';
  select.innerHTML += generateAssignedContacts(contacts);
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

  subtasks.push(subtask);
  showSubtasks();
  document.getElementById('subtask').value = '';
}

function editSubtask(i) {

}

function deleteSubtask(i) {
  subtasks.splice(i, 1);
  showSubtasks();
}




