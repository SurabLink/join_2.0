function getHTMLContactGroup(letter, initials, contactName, email) {
    return `
        <div class="contact-card">
            <h2 class="contact-group-letter">${letter}</h2>
            <div class="dividing-line"></div>
            
            <div class="contact-area">
                <div class="contact-avatar">
                    <span class="avatar-placeholder">${initials}</span>
                </div>

                <div class="contact-details">
                    <h3 class="contact-name">${contactName}</h3>
                    <a href="mailto:${email}" class="contact-email">${email}</a>
                </div>
            </div>
        </div>
`
}

function getDialogAddContact() {
    return `
    <dialog id="add-contact-dialog" class="ac-dialog" role="dialog" aria-modal="true" aria-labelledby="ac-title">

        <div class="ac">
            <div class="ac__hero">
                <div class="ac__brand">
                    <img class="ac__logo" src="./assets/img/join_logo_white.svg" alt="Join Logo">
                </div>
                <h2 id="ac-title" class="ac__title">Add contact</h2>
                <p class="ac__subtitle">Tasks are better with a team!</p>
                <span class="ac__underline" aria-hidden="true"></span>
            </div>
            <button type="button" class="ac__close" aria-label="Close">×</button>
            <div class="ac__formwrap">
                <div class="ac__avatar" aria-label="Avatar placeholder">
                    <img src="./assets/img/person.png" alt="Person Icon">
                </div>
                <form onsubmit="addContact(event)" id="add-contact-form" class="ac-form" novalidate>
                    <div class="ac-field">
                        <input class="input-focus" id="ac-name" type="text" placeholder="Name" required>
                        <img src="./assets/icons/person.svg">
                    </div>
                    <div class="ac-field">
                        <input class="input-focus" id="ac-email" type="email" placeholder="Email" required>
                        <img src="./assets/icons/mail.svg">
                    </div>
                    <div class="ac-field">
                        <input class="input-focus" id="ac-phone" name="phone" type="tel" placeholder="Phone">
                        <img src="./assets/img/call.png">
                    </div>
                    <div class="ac__actions">
                        <button type="button" class="btn btn--ghost" data-ac-cancel aria-label="Cancel">
                            <span>Cancel</span>
                            <span class="btn__x">×</span>
                        </button>
                        <button type="submit" class="btn btn--primary" data-ac-submit aria-label="Create contact">
                            <span>Create contact</span>
                            <span class="btn__check" aria-hidden="true">
                                <svg width="18" height="14" viewBox="0 0 18 14">
                                    <path d="M1 7l5 5L17 1" stroke="#fff" stroke-width="2" fill="none"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </dialog>
`

}

function generateObjFromContact() {
    const name = document.getElementById("ac-name").value;
    const email = document.getElementById("ac-email").value;
    const phone = document.getElementById("ac-phone").value;

    return {
      name,
      email,
      phone
    };
}

