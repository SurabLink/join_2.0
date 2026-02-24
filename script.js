let BASE_URL = "https://join-app-firebase-default-rtdb.europe-west1.firebasedatabase.app";

let columns = ["To Do", "In Progress", "Await Feedback", "Done"];
let draggedTaskId = null;
let activeTask = null;
let users = [
  { 'email': 'erik@test.de', 'password': 'test1234' }
];
let contacts = [];
let selectedContacts = [];
let subtasks = [];

/**
 * Handles loadContacts.
 * @returns {Promise<*>} Result promise.
 */
/**
 * Loads contacts.
 * @returns {Promise<*>} Result.
 */
async function loadContacts() {
  try {
    const data = await fetchContactsData();
    contacts = data ? mapContactsData(data) : [];
  } catch (error) {
    console.error("Fehler beim Laden der Kontakte:", error);
  }
}

/**
 * Handles fetchContactsData.
 * @returns {Promise<*>} Result promise.
 */
/**
 * Fetches contacts data.
 * @returns {Promise<*>} Result.
 */
async function fetchContactsData() {
  const response = await fetch(`${BASE_URL}/contacts.json`);
  return await response.json();
}

/**
 * Handles mapContactsData.
 * @param {*} data - Parameter.
 * @returns {*} Result.
 */
/**
 * Handles map contacts data.
 * @param {*} data - Parameter.
 * @returns {void} Result.
 */
function mapContactsData(data) {
  return Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
}

// Seite sofort schützen (BEVOR irgendwas anderes passiert)
// ABER NUR auf geschützten Seiten (nicht auf index.html / signup.html)
/**
 * Handles protectThisPage.
 * @returns {*} Result.
 */
/**
 * Handles protect this page.
 * @returns {void} Result.
 */
function protectThisPage() {
  const currentPage = window.location.pathname;
  if (isPublicPage(currentPage)) {
    return;
  }
  if (!localStorage.getItem("user")) {
    window.location.replace("index.html");
  }
}

/**
 * Handles isPublicPage.
 * @param {*} pathname - Parameter.
 * @returns {*} Result.
 */
/**
 * Checks whether public page.
 * @param {*} pathname - Parameter.
 * @returns {boolean} Result.
 */
function isPublicPage(pathname) {
  return pathname.includes('index.html') || pathname.includes('signup.html');
}

// Sofort aufrufen
protectThisPage();

/**
 * Handles showMessage.
 * @param {*} message - Parameter.
 * @param {*} type - Parameter.
 * @returns {*} Result.
 */
/**
 * Shows message.
 * @param {string} message - Message text.
 * @param {string} type - Message type.
 * @returns {void} Result.
 */
function showMessage(message, type = "success") {
  const box = getOrCreateMessageBox();
  setMessageBoxContent(box, message);
  setMessageBoxType(box, type);
  setMessageBoxBaseStyles(box);
  setMessageBoxLayoutStyles(box);
  setMessageBoxColors(box, type);
  scheduleMessageHide(box);
}

/**
 * Handles getOrCreateMessageBox.
 * @returns {*} Result.
 */
/**
 * Returns or create message box.
 * @returns {*} Result.
 */
function getOrCreateMessageBox() {
  let box = document.getElementById("msgBox");
  if (!box) {
    box = document.createElement("div");
    box.id = "msgBox";
    box.setAttribute("role", "status");
    box.setAttribute("aria-live", "polite");
    document.body.appendChild(box);
  }
  return box;
}

/**
 * Handles setMessageBoxContent.
 * @param {*} box - Parameter.
 * @param {*} message - Parameter.
 * @returns {*} Result.
 */
/**
 * Sets message box content.
 * @param {*} box - Parameter.
 * @param {string} message - Message text.
 * @returns {void} Result.
 */
function setMessageBoxContent(box, message) {
  box.innerHTML = "";
  const textEl = document.createElement("span");
  textEl.textContent = message;
  box.appendChild(textEl);
}

/**
 * Handles setMessageBoxType.
 * @param {*} box - Parameter.
 * @param {*} type - Parameter.
 * @returns {*} Result.
 */
/**
 * Sets message box type.
 * @param {*} box - Parameter.
 * @param {string} type - Message type.
 * @returns {void} Result.
 */
function setMessageBoxType(box, type) {
  box.className = `msgBox ${type}`;
}

/**
 * Handles setMessageBoxBaseStyles.
 * @param {*} box - Parameter.
 * @returns {*} Result.
 */
/**
 * Sets message box base styles.
 * @param {*} box - Parameter.
 * @returns {void} Result.
 */
function setMessageBoxBaseStyles(box) {
  box.style.position = "fixed";
  box.style.left = "50%";
  box.style.top = "50%";
  box.style.transform = "translate(-50%, -50%)";
  box.style.zIndex = "9999";
}

/**
 * Handles setMessageBoxLayoutStyles.
 * @param {*} box - Parameter.
 * @returns {*} Result.
 */
/**
 * Sets message box layout styles.
 * @param {*} box - Parameter.
 * @returns {void} Result.
 */
function setMessageBoxLayoutStyles(box) {
  box.style.display = "flex";
  box.style.alignItems = "center";
  box.style.justifyContent = "space-between";
  box.style.gap = "22px";
  box.style.minWidth = "280px";
  box.style.maxWidth = "min(520px, calc(100vw - 32px))";
  box.style.padding = "18px 22px";
  box.style.borderRadius = "18px";
  box.style.color = "#fff";
  box.style.fontSize = "18px";
  box.style.fontWeight = "400";
  box.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.22)";
  box.style.pointerEvents = "none";
}

/**
 * Handles setMessageBoxColors.
 * @param {*} box - Parameter.
 * @param {*} type - Parameter.
 * @returns {*} Result.
 */
/**
 * Sets message box colors.
 * @param {*} box - Parameter.
 * @param {string} type - Message type.
 * @returns {void} Result.
 */
function setMessageBoxColors(box, type) {
  if (type === "error") {
    box.style.background = "var(--urgent, #ff3d00)";
    return;
  }
  box.style.background = "var(--sidebar-bg, #2a3647)";
}

/**
 * Handles scheduleMessageHide.
 * @param {*} box - Parameter.
 * @returns {*} Result.
 */
/**
 * Handles schedule message hide.
 * @param {*} box - Parameter.
 * @returns {void} Result.
 */
function scheduleMessageHide(box) {
  window.clearTimeout(box._hideTimeout);
  box._hideTimeout = window.setTimeout(() => {
    box.style.display = "none";
  }, 1500);
}

/**
 * Handles toggleProfileMenu.
 * @param {*} event - Parameter.
 * @returns {*} Result.
 */
/**
 * Toggles profile menu.
 * @param {Event} event - DOM event.
 * @returns {void} Result.
 */
function toggleProfileMenu(event) {
  event.stopPropagation();
  const menu = document.getElementById('profileMenu');
  if (menu) {
    menu.classList.toggle('active');
  }
}

// Menü schließen wenn außerhalb geklickt wird
document.addEventListener('click', (event) => {
  const menu = document.getElementById('profileMenu');
  const profileContainer = document.querySelector('.user-profile-container');
  if (menu && profileContainer && !profileContainer.contains(event.target)) {
    menu.classList.remove('active');
  }
});

/**
 * Handles logout.
 * @param {*} event - Parameter.
 * @returns {*} Result.
 */
/**
 * Handles logout.
 * @param {Event} event - DOM event.
 * @returns {void} Result.
 */
function logout(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  clearUserSession();
  safeFirebaseLogout();
  redirectToLogin();
}

/**
 * Handles clearUserSession.
 * @returns {*} Result.
 */
/**
 * Clears user session.
 * @returns {void} Result.
 */
function clearUserSession() {
  localStorage.removeItem("user");
}

/**
 * Handles safeFirebaseLogout.
 * @returns {*} Result.
 */
/**
 * Handles safe firebase logout.
 * @returns {void} Result.
 */
function safeFirebaseLogout() {
  try {
    if (typeof window.firebaseLogout === "function") {
      window.firebaseLogout();
    }
  } catch (e) {
    console.warn("Firebase logout failed (not critical):", e);
  }
}

/**
 * Handles redirectToLogin.
 * @returns {*} Result.
 */
/**
 * Handles redirect to login.
 * @returns {void} Result.
 */
function redirectToLogin() {
  window.location.replace("index.html");
}

// Verhindere Seiten-Cache
window.addEventListener("pageshow", (event) => {
  if (event.persisted && !localStorage.getItem("user")) {
    window.location.replace("index.html");
  }
});

// Cache deaktivieren
window.addEventListener("beforeunload", () => {
  // Keine Aktion nötig, aber wichtig für manche Browser
});
