let signupFieldErrors = {};

function handleSignupSubmit(event) {
    event.preventDefault();
    if (!validateSignupForm()) {
        return;
    }
    addUser();
}

function validateSignupForm() {
    const fields = getSignupFields();
    resetSignupErrors(fields);
    const state = { firstErrorShown: false };
    validateNameField(fields, state);
    validateEmailField(fields, state);
    validatePasswordField(fields, state);
    validateConfirmPasswordField(fields, state);
    validatePolicyField(fields, state);
    return !state.firstErrorShown;
}

function getSignupFields() {
    return {
        nameInput: document.getElementById('registerName'),
        emailInput: document.getElementById('registerEmail'),
        passwordInput: document.getElementById('registerPassword'),
        confirmPasswordInput: document.getElementById('registerPasswordConfirm'),
        policyCheckbox: document.getElementById('acceptPrivacy')
    };
}

function resetSignupErrors(fields) {
    signupFieldErrors = {};
    [fields.nameInput, fields.emailInput, fields.passwordInput, fields.confirmPasswordInput].forEach(input => {
        input.classList.remove('input-error');
    });
    clearSignupErrorTexts();
    clearPolicyError();
}

function clearSignupErrorTexts() {
    setSignupErrorText('registerNameError', '');
    setSignupErrorText('registerEmailError', '');
    setSignupErrorText('registerPasswordError', '');
    setSignupErrorText('registerPasswordConfirmError', '');
    setSignupErrorText('acceptPrivacyError', '');
}

function setSignupErrorText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function clearPolicyError() {
    const policyContainer = document.querySelector('.accept-privacy-policy');
    if (policyContainer) {
        policyContainer.classList.remove('input-error');
    }
}

function validateNameField(fields, state) {
    const nameValue = fields.nameInput.value.trim();
    if (!nameValue) {
        setSignupFieldError('registerName', 'Please enter your name.', fields.nameInput, state);
    }
}

function validateEmailField(fields, state) {
    const emailValue = fields.emailInput.value.trim();
    if (!emailValue) {
        setSignupFieldError('registerEmail', 'Please enter an email address.', fields.emailInput, state);
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        setSignupFieldError('registerEmail', 'Please enter a valid email address.', fields.emailInput, state);
    }
}

function validatePasswordField(fields, state) {
    const passwordValue = fields.passwordInput.value;
    if (!passwordValue) {
        setSignupFieldError('registerPassword', 'Please enter a password.', fields.passwordInput, state);
    }
}

function validateConfirmPasswordField(fields, state) {
    const passwordValue = fields.passwordInput.value;
    const confirmValue = fields.confirmPasswordInput.value;
    if (!confirmValue) {
        setSignupFieldError('registerPasswordConfirm', 'Please confirm your password.', fields.confirmPasswordInput, state);
        return;
    }
    if (passwordValue && passwordValue !== confirmValue) {
        setSignupFieldError('registerPasswordConfirm', 'Passwords do not match.', fields.confirmPasswordInput, state);
    }
}

function validatePolicyField(fields, state) {
    if (fields.policyCheckbox.checked) return;
    signupFieldErrors.acceptPrivacy = 'Please accept the privacy policy.';
    const policyContainer = document.querySelector('.accept-privacy-policy');
    if (policyContainer) {
        policyContainer.classList.add('input-error');
    }
    if (!state.firstErrorShown) {
        setSignupErrorText('acceptPrivacyError', signupFieldErrors.acceptPrivacy);
        state.firstErrorShown = true;
    }
}

function setSignupFieldError(fieldId, message, input, state) {
    signupFieldErrors[fieldId] = message;
    input.classList.add('input-error');
    if (!state.firstErrorShown) {
        setSignupErrorText(getSignupErrorId(fieldId), message);
        input.focus();
        state.firstErrorShown = true;
    }
}

function getSignupErrorId(fieldId) {
    const idMap = {
        registerName: 'registerNameError',
        registerEmail: 'registerEmailError',
        registerPassword: 'registerPasswordError',
        registerPasswordConfirm: 'registerPasswordConfirmError',
        acceptPrivacy: 'acceptPrivacyError'
    };
    return idMap[fieldId];
}

function showFieldErrorMessage(fieldId) {
    clearAllSignupErrorMessages();
    const message = signupFieldErrors[fieldId];
    if (!message) return;
    const spanId = getSignupErrorId(fieldId);
    const span = document.getElementById(spanId);
    if (span) {
        span.textContent = message;
    }
}

function clearAllSignupErrorMessages() {
    const ids = Object.values({
        registerName: 'registerNameError',
        registerEmail: 'registerEmailError',
        registerPassword: 'registerPasswordError',
        registerPasswordConfirm: 'registerPasswordConfirmError',
        acceptPrivacy: 'acceptPrivacyError'
    });
    ids.forEach(spanId => {
        const span = document.getElementById(spanId);
        if (span) {
            span.textContent = '';
        }
    });
}

function attachSignupErrorFocusHandlers() {
    const pairs = [
        { fieldId: 'registerName', event: 'focus' },
        { fieldId: 'registerEmail', event: 'focus' },
        { fieldId: 'registerPassword', event: 'focus' },
        { fieldId: 'registerPasswordConfirm', event: 'focus' },
    ];

    pairs.forEach(({ fieldId, event }) => {
        const el = document.getElementById(fieldId);
        if (el) {
            el.addEventListener(event, () => showFieldErrorMessage(fieldId));
        }
    });
}

function updateSignupButtonState() {
    const nameValue = document.getElementById('registerName')?.value.trim();
    const emailValue = document.getElementById('registerEmail')?.value.trim();
    const passwordValue = document.getElementById('registerPassword')?.value;
    const confirmValue = document.getElementById('registerPasswordConfirm')?.value;
    const policyChecked = document.getElementById('acceptPrivacy')?.checked;
    const signupButton = document.querySelector('.btn-signup');

    const isComplete = Boolean(nameValue && emailValue && passwordValue && confirmValue && policyChecked);
    if (signupButton) {
        signupButton.disabled = !isComplete;
    }
}

function attachSignupFormStateHandlers() {
    const inputs = getSignupInputElements();
    const policyCheckbox = document.getElementById('acceptPrivacy');
    inputs.forEach(input => bindSignupInputHandlers(input));
    if (policyCheckbox) {
        policyCheckbox.addEventListener('change', updateSignupButtonState);
    }
}

function getSignupInputElements() {
    return [
        document.getElementById('registerName'),
        document.getElementById('registerEmail'),
        document.getElementById('registerPassword'),
        document.getElementById('registerPasswordConfirm')
    ].filter(Boolean);
}

function bindSignupInputHandlers(input) {
    input.addEventListener('input', updateSignupButtonState);
    input.addEventListener('blur', updateSignupButtonState);
}

function initPasswordVisibilityToggle({ inputId, lockIconId, visibilityOffIconId, visibilityIconId }) {
    const elements = getPasswordVisibilityElements(inputId, lockIconId, visibilityOffIconId, visibilityIconId);
    if (!elements) return;
    bindPasswordVisibilityHandlers(elements);
    syncPasswordVisibilityIcons(elements);
}

function getPasswordVisibilityElements(inputId, lockIconId, visibilityOffIconId, visibilityIconId) {
    const passwordInput = document.getElementById(inputId);
    const lockIcon = document.getElementById(lockIconId);
    const visibilityOffIcon = document.getElementById(visibilityOffIconId);
    const visibilityIcon = document.getElementById(visibilityIconId);
    if (!passwordInput || !lockIcon || !visibilityOffIcon || !visibilityIcon) return null;
    return { passwordInput, lockIcon, visibilityOffIcon, visibilityIcon };
}

function bindPasswordVisibilityHandlers(elements) {
    elements.passwordInput.addEventListener('input', () => syncPasswordVisibilityIcons(elements));
    elements.visibilityOffIcon.addEventListener('click', () => showPassword(elements));
    elements.visibilityIcon.addEventListener('click', () => hidePassword(elements));
}

function showPassword(elements) {
    if (elements.passwordInput.value.length === 0) return;
    setPasswordVisibility(elements, true);
}

function hidePassword(elements) {
    if (elements.passwordInput.value.length === 0) return;
    setPasswordVisibility(elements, false);
}

function setPasswordVisibility(elements, isVisible) {
    elements.passwordInput.type = isVisible ? 'text' : 'password';
    elements.visibilityIcon.classList.toggle('is-hidden', !isVisible);
    elements.visibilityOffIcon.classList.toggle('is-hidden', isVisible);
}

function syncPasswordVisibilityIcons(elements) {
    const hasValue = elements.passwordInput.value.length > 0;
    elements.lockIcon.classList.toggle('is-hidden', hasValue);

    if (!hasValue) {
        elements.visibilityOffIcon.classList.add('is-hidden');
        elements.visibilityIcon.classList.add('is-hidden');
        elements.passwordInput.type = 'password';
        return;
    }

    const isVisible = elements.passwordInput.type === 'text';
    setPasswordVisibility(elements, isVisible);
}

function initSignupPasswordVisibilityToggles() {
    initPasswordVisibilityToggle({
        inputId: 'registerPassword',
        lockIconId: 'registerLockIcon',
        visibilityOffIconId: 'registerVisibilityOffIcon',
        visibilityIconId: 'registerVisibilityIcon'
    });

    initPasswordVisibilityToggle({
        inputId: 'registerPasswordConfirm',
        lockIconId: 'registerConfirmLockIcon',
        visibilityOffIconId: 'registerConfirmVisibilityOffIcon',
        visibilityIconId: 'registerConfirmVisibilityIcon'
    });
}

document.addEventListener('DOMContentLoaded', () => {
    attachSignupErrorFocusHandlers();
    attachSignupFormStateHandlers();
    initSignupPasswordVisibilityToggles();
    updateSignupButtonState();
});

async function addUser() {
    const values = getSignupValues();
    if (!isPasswordMatch(values)) { showPasswordMismatch(values.confirmPassword); return; }
    const newUser = buildNewUser(values); users.push(newUser);
    try {
        await saveNewUser(newUser);
        await saveNewContact(newUser);
        window.location.href = 'index.html?msg=Du hast dich erfolgreich registriert!';
    } catch (err) {
        console.error("Fehler beim Posten:", err);
        showRegistrationFailed();
    }
}

function getSignupValues() {
    return {
        name: document.getElementById('registerName'),
        email: document.getElementById('registerEmail'),
        password: document.getElementById('registerPassword'),
        confirmPassword: document.getElementById('registerPasswordConfirm')
    };
}

function isPasswordMatch(values) {
    return values.password.value === values.confirmPassword.value;
}

function showPasswordMismatch(confirmPassword) {
    if (typeof showMessage === 'function') {
        showMessage('Passwords do not match.', 'error');
    } else {
        alert('Passwords do not match.');
    }
    confirmPassword.focus();
}

function buildNewUser(values) {
    return {
        name: values.name.value.trim(),
        email: values.email.value.trim(),
        password: values.password.value
    };
}

async function saveNewUser(newUser) {
    await postData("users", newUser);
}

async function saveNewContact(newUser) {
    const newContact = {
        name: newUser.name,
        email: newUser.email,
        phone: ''
    };
    await postData("contacts", newContact);
}

function showRegistrationFailed() {
    if (typeof showMessage === 'function') {
        showMessage('Registration failed. Please try again.', 'error');
    } else {
        alert('Registration failed. Please try again.');
    }
}

async function postData(path = "", user = {}) {
    let response = await fetch(`${BASE_URL}/${path}.json`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        throw new Error(`HTTP-Error! Status: ${response.status}`);
    }

    return await response.json();
}

function navigateToLogin() {
     window.location.href = "index.html";
}
