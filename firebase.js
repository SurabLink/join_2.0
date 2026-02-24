const firebaseConfig = {
  apiKey: "DEIN_API_KEY",
  authDomain: "DEIN_PROJECT.firebaseapp.com",
  projectId: "DEIN_PROJECT_ID",
  storageBucket: "DEIN_PROJECT.appspot.com",
  messagingSenderId: "DEIN_SENDER_ID",
  appId: "DEIN_APP_ID"
};

if (typeof firebase !== "undefined") {
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

  // Firebase Logout (optional)
  /**
   * Handles firebaseLogout.
   * @returns {*} Result.
   */
  /**
   * Handles firebase logout.
   * @returns {void} Result.
   */
  function firebaseLogout() {
    if (auth && typeof auth.signOut === "function") {
      auth.signOut().catch((error) => {
        console.warn("Logout failed:", error);
      });
    }
  }
  window.firebaseLogout = firebaseLogout;
} else {
  console.warn("Firebase SDK not loaded — skipping init.");
}

// Optional: User-Profil aktualisieren
/**
 * Handles updateUserProfile.
 * @returns {*} Result.
 */
/**
 * Updates user profile.
 * @returns {void} Result.
 */
function updateUserProfile() {
  const userData = getStoredUser();
  const profile = document.getElementById("user-profile");
  if (!profile) return;
  profile.textContent = "";
  if (!userData) return;
  applyUserProfile(profile, userData);
}

/**
 * Handles getStoredUser.
 * @returns {*} Result.
 */
/**
 * Returns stored user.
 * @returns {*} Result.
 */
function getStoredUser() {
  return JSON.parse(localStorage.getItem("user") || "null");
}

/**
 * Handles applyUserProfile.
 * @param {*} profile - Parameter.
 * @param {*} userData - Parameter.
 * @returns {*} Result.
 */
/**
 * Handles apply user profile.
 * @param {*} profile - Parameter.
 * @param {*} userData - Parameter.
 * @returns {void} Result.
 */
function applyUserProfile(profile, userData) {
  if (userData.mode === "guest") {
    profile.textContent = "G";
    return;
  }
  const initials = getUserInitials(userData);
  if (initials) {
    profile.textContent = initials;
    return;
  }
  applyEmailInitial(profile, userData);
}

/**
 * Handles getUserInitials.
 * @param {*} userData - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns user initials.
 * @param {*} userData - Parameter.
 * @returns {*} Result.
 */
function getUserInitials(userData) {
  const name = (userData.displayName || userData.name || "").trim();
  if (!name) return "";
  return name.split(" ").map(n => n[0]).join("");
}

/**
 * Handles applyEmailInitial.
 * @param {*} profile - Parameter.
 * @param {*} userData - Parameter.
 * @returns {*} Result.
 */
/**
 * Handles apply email initial.
 * @param {*} profile - Parameter.
 * @param {*} userData - Parameter.
 * @returns {void} Result.
 */
function applyEmailInitial(profile, userData) {
  if (userData.email) {
    profile.textContent = userData.email[0].toUpperCase();
  }
}

document.addEventListener("DOMContentLoaded", updateUserProfile);
