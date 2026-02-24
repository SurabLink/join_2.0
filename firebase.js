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
function updateUserProfile() {
  const userData = getStoredUser();
  const profile = document.getElementById("user-profile");
  if (!profile) return;
  profile.textContent = "";
  if (!userData) return;
  applyUserProfile(profile, userData);
}

function getStoredUser() {
  return JSON.parse(localStorage.getItem("user") || "null");
}

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

function getUserInitials(userData) {
  const name = (userData.displayName || userData.name || "").trim();
  if (!name) return "";
  return name.split(" ").map(n => n[0]).join("");
}

function applyEmailInitial(profile, userData) {
  if (userData.email) {
    profile.textContent = userData.email[0].toUpperCase();
  }
}

document.addEventListener("DOMContentLoaded", updateUserProfile);
