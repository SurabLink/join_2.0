// Entferne Intro-Overlay nach Animation
window.addEventListener('DOMContentLoaded', () => {
    initIntroAlignment();
    scheduleIntroOverlayRemoval();
    initLoginPasswordToggle();
});

function initIntroAlignment() {
    requestAnimationFrame(() => alignIntroLogo());
}

function alignIntroLogo() {
    const introLogo = document.getElementById('introLogo');
    const headerLogo = document.querySelector('.header-left img');
    if (!introLogo || !headerLogo) return;
    const introRect = introLogo.getBoundingClientRect();
    const headerRect = headerLogo.getBoundingClientRect();
    const dx = getCenterDeltaX(introRect, headerRect);
    const dy = getCenterDeltaY(introRect, headerRect);
    introLogo.style.setProperty('--logo-dx', `${dx}px`);
    introLogo.style.setProperty('--logo-dy', `${dy}px`);
}

function getCenterDeltaX(introRect, headerRect) {
    const introCenterX = introRect.left + introRect.width / 2;
    const headerCenterX = headerRect.left + headerRect.width / 2;
    return headerCenterX - introCenterX;
}

function getCenterDeltaY(introRect, headerRect) {
    const introCenterY = introRect.top + introRect.height / 2;
    const headerCenterY = headerRect.top + headerRect.height / 2;
    return headerCenterY - introCenterY;
}

function scheduleIntroOverlayRemoval() {
    setTimeout(() => removeIntroOverlay(), 2000);
}

function removeIntroOverlay() {
    const introOverlay = document.getElementById('introOverlay');
    if (introOverlay) {
        introOverlay.remove();
    }
}

function initLoginPasswordToggle() {
    const elements = getLoginPasswordElements();
    if (!elements) return;
    initLoginPasswordHandlers(elements);
    syncLoginPasswordIcons(elements);
}

function getLoginPasswordElements() {
    const passwordInput = document.getElementById('loginPassword');
    const lockIcon = document.getElementById('lockIcon');
    const visibilityOffIcon = document.getElementById('visibilityOffIcon');
    const visibilityIcon = document.getElementById('visibilityIcon');
    if (!passwordInput || !lockIcon || !visibilityOffIcon || !visibilityIcon) return null;
    return { passwordInput, lockIcon, visibilityOffIcon, visibilityIcon };
}

function initLoginPasswordHandlers(elements) {
    elements.passwordInput.addEventListener('input', () => syncLoginPasswordIcons(elements));
    elements.visibilityOffIcon.addEventListener('click', () => showLoginPassword(elements));
    elements.visibilityIcon.addEventListener('click', () => hideLoginPassword(elements));
}

function showLoginPassword(elements) {
    if (elements.passwordInput.value.length === 0) return;
    setLoginPasswordVisibility(elements, true);
}

function hideLoginPassword(elements) {
    if (elements.passwordInput.value.length === 0) return;
    setLoginPasswordVisibility(elements, false);
}

function setLoginPasswordVisibility(elements, isVisible) {
    elements.passwordInput.type = isVisible ? 'text' : 'password';
    elements.visibilityIcon.classList.toggle('is-hidden', !isVisible);
    elements.visibilityOffIcon.classList.toggle('is-hidden', isVisible);
}

function syncLoginPasswordIcons(elements) {
    const hasValue = elements.passwordInput.value.length > 0;
    elements.lockIcon.classList.toggle('is-hidden', hasValue);
    if (!hasValue) {
        elements.visibilityOffIcon.classList.add('is-hidden');
        elements.visibilityIcon.classList.add('is-hidden');
        elements.passwordInput.type = 'password';
        return;
    }
    const isVisible = elements.passwordInput.type === 'text';
    setLoginPasswordVisibility(elements, isVisible);
}

async function login() {
    try {
        clearLoginErrors();
        const credentials = getLoginCredentials();
        if (!validateLoginCredentials(credentials)) return;
        const signedUpUser = await findSignedUpUser(credentials.email, credentials.password);
        handleLoginResult(credentials, signedUpUser);
    } catch (error) {
        showLoginError("An error occurred. Please try again later.");
    }
}

function validateLoginCredentials({ email, password }) {
    if (!email || !password) {
        showLoginError("Please fill in all fields.");
        return false;
    }
    if (!isValidEmail(email)) {
        showLoginError("Please enter a valid email address.");
        return false;
    }
    return true;
}

function handleLoginResult(credentials, signedUpUser) {
    if (signedUpUser) {
        storeUserSession(credentials.email, signedUpUser);
        window.location.href = "summary.html";
        return;
    }
    showLoginError("Check your email and password. Please try again.");
}

function clearLoginErrors() {
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    emailInput.classList.remove('input-error');
    passwordInput.classList.remove('input-error');
}

function getLoginCredentials() {
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    return {
        email: emailInput.value.trim(),
        password: passwordInput.value.trim()
    };
}

async function findSignedUpUser(email, password) {
    const response = await fetch(`${BASE_URL}/users.json`);
    if (!response.ok) throw new Error(`HTTP-Error! Status: ${response.status}`);
    const userAsJson = await response.json();
    return Object.values(userAsJson || {}).find(u => u.email === email && u.password === password);
}

function storeUserSession(email, signedUpUser) {
    localStorage.setItem("user", JSON.stringify({
        mode: "user",
        email: email,
        displayName: signedUpUser.name || ""
    }));
}

function showLoginError(message) {
    removeLoginError();
    appendLoginError(message);
    markLoginInputsError();
}

function removeLoginError() {
    const oldError = document.querySelector('.login-error');
    if (oldError) oldError.remove();
}

function appendLoginError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'login-error';
    errorDiv.textContent = message;
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.appendChild(errorDiv);
}

function markLoginInputsError() {
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    emailInput.classList.add('input-error');
    passwordInput.classList.add('input-error');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function navigateToSignup() {
     window.location.href = "signup.html";
}

function guestLogin() {
  // Guest-Session speichern (wichtig für Summary)
  localStorage.setItem("user", JSON.stringify({ mode: "guest" }));

  window.location.href = "summary.html";
}
