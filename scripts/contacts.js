function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function updateAddContactSubmitState(dialog) {
  if (!dialog) return;
  const nameInput = dialog.querySelector('#ac-name');
  const emailInput = dialog.querySelector('#ac-email');
  const phoneInput = dialog.querySelector('#ac-phone');
  const submitBtn = dialog.querySelector('[data-ac-submit]');
  if (!submitBtn) return;
  const isValid = (
    isNonEmptyString(nameInput?.value ?? '') &&
    isNonEmptyString(emailInput?.value ?? '') &&
    isNonEmptyString(phoneInput?.value ?? '')
  );
  submitBtn.disabled = !isValid;
  submitBtn.setAttribute('aria-disabled', String(!isValid));
}

function initAddContactDialogValidation(dialog) {
  if (!dialog || dialog.dataset.acValidationInit === '1') return;
  const fields = [
    dialog.querySelector('#ac-name'),
    dialog.querySelector('#ac-email'),
    dialog.querySelector('#ac-phone'),
  ].filter(Boolean);
  const handler = () => updateAddContactSubmitState(dialog);
  bindContactValidationFields(fields, handler);
  bindContactValidationReset(dialog, handler, '#add-contact-form');
  dialog.dataset.acValidationInit = '1';
  handler();
}

function bindContactValidationFields(fields, handler) {
  fields.forEach((field) => {
    field.addEventListener('input', handler);
    field.addEventListener('change', handler);
    field.addEventListener('blur', handler);
  });
}

function bindContactValidationReset(dialog, handler, formSelector) {
  const form = dialog.querySelector(formSelector);
  if (!form) return;
  form.addEventListener('reset', () => {
    setTimeout(handler, 0);
  });
}

function openAddContactDialog() {
  let dialog = ensureAddContactDialog();
  dialog.classList.remove('closing');
  dialog.showModal();
  initAddContactDialogValidation(dialog);
  updateAddContactSubmitState(dialog);
  if (typeof openAddContact === "function") {
    openAddContact();
  }
}

function ensureAddContactDialog() {
  let dialog = document.getElementById("add-contact-dialog");
  if (!dialog) {
    document.body.insertAdjacentHTML("beforeend", getDialogAddContact());
    dialog = document.getElementById("add-contact-dialog");
    bindAddContactDialogEvents(dialog);
  }
  return dialog;
}

function bindAddContactDialogEvents(dialog) {
  const closeBtn = dialog.querySelector(".ac__close");
  closeBtn.addEventListener("click", () => closeAddContactDialogWithAnimation());
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      closeAddContactDialogWithAnimation();
    }
  });
  const dialogContent = dialog.querySelector(".ac-dialog-content");
  if (dialogContent) {
    dialogContent.addEventListener("click", (e) => e.stopPropagation());
  }
}

// NEU: Schließt Add Contact Dialog mit Animation
function closeAddContactDialogWithAnimation() {
  const dialog = document.getElementById("add-contact-dialog");
  if (dialog) {
    dialog.classList.add('closing');
    setTimeout(() => {
      dialog.close();
    }, 300);
  }
}

async function addContact(event) {
  event.preventDefault();
  const contact = generateObjFromContact();
  if (!isContactComplete(contact)) {
    alert("Bitte alle Felder ausfüllen!");
    return;
  }
  const saved = await saveContact(contact);
  if (!saved) return;
  await renderContactGroup();
  const dialog = document.getElementById("add-contact-dialog");
  if (dialog) dialog.close();
  const form = document.getElementById('add-contact-form');
  if (form) form.reset();
  setTimeout(() => showContactsToast('Contact successfully created'), 0);
}

function isContactComplete(contact) {
  return contact.name && contact.email && contact.phone;
}

async function saveContact(contact) {
  try {
    const response = await fetch(`${BASE_URL}/contacts.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });
    return await response.json();
  } catch (error) {
    console.error("Fehler beim Speichern des Kontakts:", error);
  }
}

function showContactsToast(message, durationMs = 2200) {
  const old = document.getElementById('contacts-toast');
  if (old) old.remove();
  document.body.insertAdjacentHTML('beforeend', getContactsToastTemplate(message));
  const toast = document.getElementById('contacts-toast');
  if (!toast) return;
  requestAnimationFrame(() => toast.classList.add('contacts-toast--visible'));
  window.setTimeout(() => {
    toast.classList.remove('contacts-toast--visible');
    window.setTimeout(() => toast.remove(), 220);
  }, durationMs);
}

function toggleContactMoreMenu(event) {
  if (event) {
    event.stopPropagation();
  }
  const menu = document.getElementById('contact-more-menu');
  if (!menu) return;
  menu.classList.toggle('is-open');
  initContactMoreMenuAutoClose();
}

function closeContactMoreMenu() {
  const menu = document.getElementById('contact-more-menu');
  if (menu) {
    menu.classList.remove('is-open');
  }
}

function initContactMoreMenuAutoClose() {
  if (document.body.dataset.contactMoreInit === '1') return;
  document.addEventListener('click', (event) => {
    const menu = document.getElementById('contact-more-menu');
    const button = document.querySelector('.contact-more-btn');
    if (!menu || !button) return;
    if (menu.classList.contains('is-open') && !menu.contains(event.target) && !button.contains(event.target)) {
      menu.classList.remove('is-open');
    }
  });
  document.body.dataset.contactMoreInit = '1';
}

function generateObjFromContact() {
  const name = document.getElementById('ac-name').value;
  const email = document.getElementById('ac-email').value;
  const phone = document.getElementById('ac-phone').value;
  return { name, email, phone };
}

async function handleContactClick(event) {
  const clickedContact = event.currentTarget;
  document.querySelectorAll('.contact-area, .contact-item').forEach(contact => contact.classList.remove('selected'));
  clickedContact.classList.add('selected');
  const contactId = clickedContact.dataset.id;
  const contactData = await fetchContactDetails(contactId);
  if (!contactData) { console.error("Kontakt konnte nicht geladen werden."); return; }
  const container = document.getElementById('contact-details');
  const initials = contactData.name.split(" ").map(n => n[0]).join(""); const phone = contactData.phone || '';
  container.innerHTML = getContactDetailsTemplate(initials, contactData.name, contactData.email, phone, contactId);
  initContactMoreMenuAutoClose();
  if (window.innerWidth <= 780) document.querySelector('.wrapper').classList.add('show-contact-details');
}

async function fetchContactDetails(contactId) {
  try {
    const response = await fetch(`${BASE_URL}/contacts/${contactId}.json`);
    if (!response.ok) {
      throw new Error("Fehler beim Abrufen der Kontaktdaten.");
    }
    return await response.json();
  } catch (error) {
    console.error("Fehler beim Abrufen der Kontaktdaten:", error);
    return null;
  }
}

function addContactClickListeners() {
  document.querySelectorAll('.contact-item[data-id], .contact-area[data-id]').forEach(contact => {
    contact.addEventListener('click', handleContactClick);
  });
}

async function renderContactGroup() {
  await loadContacts();
  const contactListRef = document.getElementById('contact-list');
  contactListRef.innerHTML = '';
  renderContactEntries(contactListRef, contacts);
  colorizeContactInitials();
  addContactClickListeners();
}

function renderContactEntries(contactListRef, contactsData) {
  let currentLetter = '';
  contactsData.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  for (let i = 0; i < contactsData.length; i++) {
    const contact = contactsData[i];
    const firstLetter = (contact.name || 'Unnamed').charAt(0).toUpperCase();
    if (currentLetter !== firstLetter) {
      currentLetter = firstLetter;
      contactListRef.innerHTML += getHeaderLetter(firstLetter);
    }
    const name = contact.name || 'Unnamed';
    const initials = name.split(" ").map(n => n[0]).join("");
    const content = getContactItem(name, contact.email, initials);
    contactListRef.innerHTML += getContactItemWrapper(contact.id, contact.phone, content);
  }
}

function refreshContactDetails() {
  const contactDetailsContainerRef = document.getElementById('contact-details');
  contactDetailsContainerRef.innerHTML = '';
  if (window.innerWidth <= 780) {
    document.querySelector('.wrapper').classList.remove('show-contact-details');
  }
}

function colorizeContactInitials() {
  const initialsElements = document.querySelectorAll('.contact-initials');
  initialsElements.forEach(el => {
    el.classList.remove('bg-blue', 'bg-green', 'bg-purple', 'bg-orange', 'bg-pink', 'bg-red', 'bg-teal', 'bg-brown');
    el.classList.add(getRandomInitialsColorClass());
  });
}

function getRandomInitialsColorClass() {
  const colorClasses = [
    'bg-blue',
    'bg-green',
    'bg-purple',
    'bg-orange',
    'bg-pink',
    'bg-red',
    'bg-teal',
    'bg-brown'
  ];
  return colorClasses[Math.floor(Math.random() * colorClasses.length)];
}

// delete contact
async function deleteContact(contactId) {
  try {
    const response = await fetch(`${BASE_URL}/contacts/${contactId}.json`, {
      method: "DELETE"
    });
    if (response.ok) {
      await renderContactGroup();
    } else {
      console.error("Fehler beim Löschen des Kontakts.");
    }
  } catch (error) {
    console.error("Fehler beim Löschen des Kontakts:", error);
  }
  refreshContactDetails();
}

// update contact
async function updateContact(event, contactId) {
  event.preventDefault(); const updatedContact = { name: document.getElementById('edit-name').value, email: document.getElementById('edit-email').value, phone: document.getElementById('edit-phone').value };
  try {
    const response = await fetch(`${BASE_URL}/contacts/${contactId}.json`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedContact),
    });
    if (!response.ok) { console.error("Fehler beim Aktualisieren des Kontakts."); return; }
    await renderContactGroup(); closeEditContactDialog(); refreshContactDetails();
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Kontakts:", error);
  }
}

// NEU: Validierung für Edit Contact Dialog
function updateEditContactSubmitState(dialog) {
  if (!dialog) return;
  const nameInput = dialog.querySelector('#edit-name');
  const emailInput = dialog.querySelector('#edit-email');
  const phoneInput = dialog.querySelector('#edit-phone');
  const submitBtn = dialog.querySelector('[data-edit-submit]');
  if (!submitBtn) return;
  const isValid = (
    isNonEmptyString(nameInput?.value ?? '') &&
    isNonEmptyString(emailInput?.value ?? '') &&
    isNonEmptyString(phoneInput?.value ?? '')
  );
  submitBtn.disabled = !isValid;
  submitBtn.setAttribute('aria-disabled', String(!isValid));
}

function initEditContactDialogValidation(dialog) {
  if (!dialog || dialog.dataset.editValidationInit === '1') return;
  const fields = [
    dialog.querySelector('#edit-name'),
    dialog.querySelector('#edit-email'),
    dialog.querySelector('#edit-phone'),
  ].filter(Boolean);
  const handler = () => updateEditContactSubmitState(dialog);
  bindContactValidationFields(fields, handler);
  bindContactValidationReset(dialog, handler, '#edit-contact-form');
  dialog.dataset.editValidationInit = '1';
  handler();
}

// Öffnet den Edit-Dialog mit vorausgefüllten Daten
function openEditContactDialog(id, name, email, phone, initials) {
  const container = document.getElementById('edit-contact-dialog-container');
  if (!container) return;
  container.innerHTML = getEditContactDialog(id, name, email, phone, initials);
  const dialog = document.getElementById('edit-contact-dialog');
  if (!dialog) return;
  bindEditContactDialogEvents(dialog);
  showEditContactDialog(dialog);
  initEditContactDialogValidation(dialog);
  updateEditContactSubmitState(dialog);
}

function bindEditContactDialogEvents(dialog) {
  dialog.addEventListener('click', (e) => handleEditDialogBackdropClick(e, dialog));
  const dialogContent = dialog.querySelector('.ac-dialog-content');
  if (dialogContent) {
    dialogContent.addEventListener('click', (e) => e.stopPropagation());
  }
}

function handleEditDialogBackdropClick(event, dialog) {
  if (event.target === dialog) {
    closeEditContactDialog();
  }
}

function showEditContactDialog(dialog) {
  dialog.classList.remove('closing');
  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    dialog.setAttribute('open', '');
  }
}

// NEU: Schließt den Edit-Dialog mit Animation
function closeEditContactDialog() {
  const dialog = document.getElementById('edit-contact-dialog');
  if (dialog) {
    dialog.classList.add('closing');
    setTimeout(() => {
      dialog.close();
      dialog.remove();
    }, 300);
  }
}
