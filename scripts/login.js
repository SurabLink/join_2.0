// Entferne Intro-Overlay nach Animation
window.addEventListener('DOMContentLoaded', () => {
    initIntroAlignment();
    scheduleIntroOverlayRemoval();
    initLoginPasswordToggle();
});

/**
 * Handles initIntroAlignment.
 * @returns {*} Result.
 */
/**
 * Initializes intro alignment.
 * @returns {void} Result.
 */
function initIntroAlignment() {
    requestAnimationFrame(() => alignIntroLogo());
}

/**
 * Handles alignIntroLogo.
 * @returns {*} Result.
 */
/**
 * Handles align intro logo.
 * @returns {void} Result.
 */
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

/**
 * Handles getCenterDeltaX.
 * @param {*} introRect - Parameter.
 * @param {*} headerRect - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns center delta x.
 * @param {*} introRect - Parameter.
 * @param {*} headerRect - Parameter.
 * @returns {*} Result.
 */
function getCenterDeltaX(introRect, headerRect) {
    const introCenterX = introRect.left + introRect.width / 2;
    const headerCenterX = headerRect.left + headerRect.width / 2;
    return headerCenterX - introCenterX;
}

/**
 * Handles getCenterDeltaY.
 * @param {*} introRect - Parameter.
 * @param {*} headerRect - Parameter.
 * @returns {*} Result.
 */
/**
 * Returns center delta y.
 * @param {*} introRect - Parameter.
 * @param {*} headerRect - Parameter.
 * @returns {*} Result.
 */
function getCenterDeltaY(introRect, headerRect) {
    const introCenterY = introRect.top + introRect.height / 2;
    const headerCenterY = headerRect.top + headerRect.height / 2;
    return headerCenterY - introCenterY;
}

/**
 * Handles scheduleIntroOverlayRemoval.
 * @returns {*} Result.
 */
/**
 * Handles schedule intro overlay removal.
 * @returns {void} Result.
 */
function scheduleIntroOverlayRemoval() {
    setTimeout(() => removeIntroOverlay(), 2000);
}

/**
 * Handles removeIntroOverlay.
 * @returns {*} Result.
 */
/**
 * Handles remove intro overlay.
 * @returns {void} Result.
 */
function removeIntroOverlay() {
    const introOverlay = document.getElementById('introOverlay');
    if (introOverlay) {
        introOverlay.remove();
    }
}

/**
 * Handles initLoginPasswordToggle.
 * @returns {*} Result.
 */
/**
 * Initializes login password toggle.
 * @returns {void} Result.
 */
function initLoginPasswordToggle() {
    const elements = getLoginPasswordElements();
    if (!elements) return;
    initLoginPasswordHandlers(elements);
    syncLoginPasswordIcons(elements);
}

/**
 * Handles getLoginPasswordElements.
 * @returns {*} Result.
 */
/**
 * Returns login password elements.
 * @returns {*} Result.
 */
function getLoginPasswordElements() {
    const passwordInput = document.getElementById('loginPassword');
    const lockIcon = document.getElementById('lockIcon');
    const visibilityOffIcon = document.getElementById('visibilityOffIcon');
    const visibilityIcon = document.getElementById('visibilityIcon');
    if (!passwordInput || !lockIcon || !visibilityOffIcon || !visibilityIcon) return null;
    return { passwordInput, lockIcon, visibilityOffIcon, visibilityIcon };
}

/**
 * Handles initLoginPasswordHandlers.
 * @param {*} elements - Parameter.
 * @returns {*} Result.
 */
/**
 * Initializes login password handlers.
 * @param {*} elements - Parameter.
 * @returns {void} Result.
 */
function initLoginPasswordHandlers(elements) {
    elements.passwordInput.addEventListener('input', () => syncLoginPasswordIcons(elements));
    elements.visibilityOffIcon.addEventListener('click', () => showLoginPassword(elements));
    elements.visibilityIcon.addEventListener('click', () => hideLoginPassword(elements));
}

/**
 * Handles showLoginPassword.
 * @param {*} elements - Parameter.
 * @returns {*} Result.
 */
/**
 * Shows login password.
 * @param {*} elements - Parameter.
 * @returns {void} Result.
 */
function showLoginPassword(elements) {
    if (elements.passwordInput.value.length === 0) return;
    setLoginPasswordVisibility(elements, true);
}

/**
 * Handles hideLoginPassword.
 * @param {*} elements - Parameter.
 * @returns {*} Result.
 */
/**
 * Hides login password.
 * @param {*} elements - Parameter.
 * @returns {void} Result.
 */
function hideLoginPassword(elements) {
    if (elements.passwordInput.value.length === 0) return;
    setLoginPasswordVisibility(elements, false);
}

/**
 * Handles setLoginPasswordVisibility.
 * @param {*} elements - Parameter.
 * @param {*} isVisible - Parameter.
 * @returns {*} Result.
 */
/**
 * Sets login password visibility.
 * @param {*} elements - Parameter.
 * @param {*} isVisible - Parameter.
 * @returns {void} Result.
 */
function setLoginPasswordVisibility(elements, isVisible) {
    elements.passwordInput.type = isVisible ? 'text' : 'password';
    elements.visibilityIcon.classList.toggle('is-hidden', !isVisible);
    elements.visibilityOffIcon.classList.toggle('is-hidden', isVisible);
}

/**
 * Handles syncLoginPasswordIcons.
 * @param {*} elements - Parameter.
 * @returns {*} Result.
 */
/**
 * Handles sync login password icons.
 * @param {*} elements - Parameter.
 * @returns {void} Result.
 */
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

/**
 * Handles login.
 * @returns {Promise<*>} Result promise.
 */
/**
 * Handles login.
 * @returns {Promise<*>} Result.
 */
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

/**
 * Handles validateLoginCredentials.
 * @param {*} param - Parameter.
 * @param {*} password } - Parameter.
 * @returns {*} Result.
 */
/**
 * Validates login credentials.
 * @param {*} param - Parameter.
 * @param {*} password } - Parameter.
 * @returns {void} Result.
 */
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

/**
 * Handles handleLoginResult.
 * @param {*} credentials - Parameter.
 * @param {*} signedUpUser - Parameter.
 * @returns {*} Result.
 */
/**
 * Handles login result.
 * @param {*} credentials - Parameter.
 * @param {*} signedUpUser - Parameter.
 * @returns {void} Result.
 */
function handleLoginResult(credentials, signedUpUser) {
    if (signedUpUser) {
        storeUserSession(credentials.email, signedUpUser);
        window.location.href = "summary.html";
        return;
    }
    showLoginError("Check your email and password. Please try again.");
}

/**
 * Handles clearLoginErrors.
 * @returns {*} Result.
 */
/**
 * Clears login errors.
 * @returns {void} Result.
 */
function clearLoginErrors() {
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    emailInput.classList.remove('input-error');
    passwordInput.classList.remove('input-error');
}

/**
 * Handles getLoginCredentials.
 * @returns {*} Result.
 */
/**
 * Returns login credentials.
 * @returns {*} Result.
 */
function getLoginCredentials() {
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    return {
        email: emailInput.value.trim(),
        password: passwordInput.value.trim()
    };
}

/**
 * Handles findSignedUpUser.
 * @param {*} email - Parameter.
 * @param {*} password - Parameter.
 * @returns {Promise<*>} Result promise.
 */
/**
 * Handles find signed up user.
 * @param {string} email - Email address.
 * @param {*} password - Parameter.
 * @returns {Promise<*>} Result.
 */
async function findSignedUpUser(email, password) {
    const response = await fetch(`${BASE_URL}/users.json`);
    if (!response.ok) throw new Error(`HTTP-Error! Status: ${response.status}`);
    const userAsJson = await response.json();
    return Object.values(userAsJson || {}).find(u => u.email === email && u.password === password);
}

/**
 * Handles storeUserSession.
 * @param {*} email - Parameter.
 * @param {*} signedUpUser - Parameter.
 * @returns {*} Result.
 */
/**
 * Handles store user session.
 * @param {string} email - Email address.
 * @param {*} signedUpUser - Parameter.
 * @returns {void} Result.
 */
function storeUserSession(email, signedUpUser) {
    localStorage.setItem("user", JSON.stringify({
        mode: "user",
        email: email,
        displayName: signedUpUser.name || ""
    }));
}

/**
 * Handles showLoginError.
 * @param {*} message - Parameter.
 * @returns {*} Result.
 */
/**
 * Shows login error.
 * @param {string} message - Message text.
 * @returns {void} Result.
 */
function showLoginError(message) {
    removeLoginError();
    appendLoginError(message);
    markLoginInputsError();
}

/**
 * Handles removeLoginError.
 * @returns {*} Result.
 */
/**
 * Handles remove login error.
 * @returns {void} Result.
 */
function removeLoginError() {
    const oldError = document.querySelector('.login-error');
    if (oldError) oldError.remove();
}

/**
 * Handles appendLoginError.
 * @param {*} message - Parameter.
 * @returns {*} Result.
 */
/**
 * Handles append login error.
 * @param {string} message - Message text.
 * @returns {void} Result.
 */
function appendLoginError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'login-error';
    errorDiv.textContent = message;
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.appendChild(errorDiv);
}

/**
 * Handles markLoginInputsError.
 * @returns {*} Result.
 */
/**
 * Handles mark login inputs error.
 * @returns {void} Result.
 */
function markLoginInputsError() {
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    emailInput.classList.add('input-error');
    passwordInput.classList.add('input-error');
}

/**
 * Handles isValidEmail.
 * @param {*} email - Parameter.
 * @returns {*} Result.
 */
/**
 * Checks whether valid email.
 * @param {string} email - Email address.
 * @returns {boolean} Result.
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Handles navigateToSignup.
 * @returns {*} Result.
 */
/**
 * Handles navigate to signup.
 * @returns {void} Result.
 */
function navigateToSignup() {
     window.location.href = "signup.html";
}

/**
 * Handles guestLogin.
 * @returns {*} Result.
 */
/**
 * Handles guest login.
 * @returns {void} Result.
 */
function guestLogin() {
  // Guest-Session speichern (wichtig für Summary)
  localStorage.setItem("user", JSON.stringify({ mode: "guest" }));

  window.location.href = "summary.html";
}
