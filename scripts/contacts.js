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
