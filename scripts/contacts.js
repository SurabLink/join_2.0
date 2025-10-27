// let contacts = [
//     { id: 1, name: "Alex Johnson", email: "alex@example.com", phone: "+49 123 456789", avatar: "assets/avatar1.jpg" },
//     { id: 2, name: "Maria Gomez", email: "maria@example.com", phone: "+49 987 654321", avatar: "assets/avatar3.jpg" },
//     { id: 3, name: "Chris Müller", email: "chris@example.com", phone: "+49 555 123456", avatar: "assets/avatar4.jpg" }
// ];



function closeOverlay() {
  document.getElementById("contact-overlay").classList.add("hidden");
}

function openAddContactDialog() {
  let dialog = document.getElementById("add-contact-dialog");

  if (!dialog) {
    document.body.insertAdjacentHTML("beforeend", getDialogAddContact());
    dialog = document.getElementById("add-contact-dialog");

    const closeBtn = dialog.querySelector(".ac__close");
    const cancelBtn = dialog.querySelector("[data-ac-cancel]");
    [closeBtn, cancelBtn].forEach(btn =>
      btn.addEventListener("click", () => dialog.close())
    );

    dialog.addEventListener("cancel", e => {
      e.preventDefault();
      dialog.close();
    });
  }

  dialog.showModal();

  if (typeof openAddContact === "function") {
    openAddContact();
  }
}

async function addContact(event) {
  event.preventDefault();
  const contact = generateObjFromContact();

  await saveContact(contact);
  alert("Task erfolgreich erstellt!");
  document.getElementById('add-contact-form').reset();
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

async function loadContacts() {
  try {
    const response = await fetch(`${BASE_URL}/contacts.json`);
    const data = await response.json();

    if (!data) {
      console.log("Keine Kontakte vorhanden");
      contacts = [];
      return;
    }

    // Firebase-Objekte in Array umwandeln
    contacts = Object.keys(data).map(key => ({
      id: key,
      ...data[key]
    }));

    console.log("Geladene Kontakte:", contacts);

    // Dropdown direkt füllen
    //selectContacts();

  } catch (error) {
    console.error("Fehler beim Laden der Kontakte:", error);
  }
}

function resetInputFieldsFromContactDialog() {
  document.getElementById('add-contact-form').reset();
}

function generateObjFromContact() {
  const name = document.getElementById('ac-name').value;
  const email = document.getElementById('ac-email').value;
  const phone = document.getElementById('ac-phone').value;

  return {
    name,
    email,
    phone
  };
}

// ab hier ki agent
function handleContactClick(event) {
  const clickedContact = event.currentTarget;
  
  // Remove selected class from all contacts
  document.querySelectorAll('.contact-area, .contact-item').forEach(contact => {
    contact.classList.remove('selected');
  });
  
  // Add selected class to clicked contact
  clickedContact.classList.add('selected');
}

function addContactClickListeners() {
  document.querySelectorAll('.contact-area, .contact-item').forEach(contact => {
    contact.addEventListener('click', handleContactClick);
  });
}
// ende ki agent

async function renderContactGroup() {
  const contactListRef = document.getElementById('contact-list');
  contactListRef.innerHTML = '';
  const contactsData = await loadContactsForContactGroup();
  let currentLetter = '';

  iterateContactEntries(contactListRef, contactsData, currentLetter);

  // Nach dem Rendern: Initialen einfärben
  colorizeContactInitials();
  
  // ab hier ki agent
  // Add click listeners to all contacts after rendering
  addContactClickListeners();
  // ende ki agent
}

function iterateContactEntries(contactListRef, contactsData, currentLetter) {
  for (let i = 0; i < contactsData.length; i++) {
    contactsData.sort((a, b) => a.name.localeCompare(b.name));
    const contactDataName = contactsData[i].name
    const contactDataMail = contactsData[i].email
    const firstLetter = contactsData[i].name.charAt(0).toUpperCase();

    if (currentLetter !== firstLetter) {
      currentLetter = firstLetter;
      contactListRef.innerHTML += getHeaderLetter(firstLetter);
    }
    const contactNameInitials = contactDataName.split(" ").map(n => n[0]).join("");
    contactListRef.innerHTML += getContactItem(contactDataName, contactDataMail, contactNameInitials);
  };

}

async function loadContactsForContactGroup() {
  try {
    const response = await fetch(`${BASE_URL}/contacts.json`);
    const data = await response.json();
    return Object.values(data);
  } catch (error) {
    console.error("Fehler beim Laden der Kontakte:", error);
    return [];
  }

}

function colorizeContactInitials() {
  const initialsElements = document.querySelectorAll('.contact-initials');
  initialsElements.forEach(el => {
    el.classList.remove('bg-blue','bg-green','bg-purple','bg-orange','bg-pink','bg-red','bg-teal','bg-brown');
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