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
                        <button onclick="resetInputFieldsFromContactDialog()" type="button" class="btn btn--ghost" data-ac-cancel aria-label="Cancel">
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

function getHeaderLetter(firstLetter) {
    return `
    <h3 class="contact-group-letter">${firstLetter}</h3>
    <hr>
    `
}

function getContactItem(contactDataName, contactDataMail, contactNameInitials) {
    return `
    <div class="contact-name-wrapper">
        <div class="contact-initials">${contactNameInitials}</div>
        <div>${contactDataName}</div>
    </div>
    <a href="mailto:${contactDataMail}">${contactDataMail}</a>
    `
}

// ki start: Neue Template-Funktion für Kontakt-Details
function getContactDetailsTemplate(initials, name, email, phone) {
    return `
        <div class="contact-details-container">

        <div class="contact-header-large">
            <div class="contact-avatar-large">
                <div class="contact-initials-large">${initials}</div>
            </div>

            <div class="contact-main-info">
                <h2 class="contact-name-large">${name}</h2>

                <div class="contact-actions">
                    <button class="contact-action-btn">
                        <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_357207_6165" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="33" height="32">
                                <rect x="0.5" width="32" height="32" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_357207_6165)">
                                <path class="edit-svg-path"
                                    d="M7.16667 25.3332H9.03333L20.5333 13.8332L18.6667 11.9665L7.16667 23.4665V25.3332ZM26.2333 11.8998L20.5667 6.29984L22.4333 4.43317C22.9444 3.92206 23.5722 3.6665 24.3167 3.6665C25.0611 3.6665 25.6889 3.92206 26.2 4.43317L28.0667 6.29984C28.5778 6.81095 28.8444 7.42761 28.8667 8.14984C28.8889 8.87206 28.6444 9.48873 28.1333 9.99984L26.2333 11.8998ZM24.3 13.8665L10.1667 27.9998H4.5V22.3332L18.6333 8.19984L24.3 13.8665Z" />
                            </g>
                        </svg>
                    Edit
                    </button>
                    <button class="contact-action-btn">
                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM3 3V16H13V3H3ZM5 13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13ZM9 13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13Z" fill="#2A3647"/>
                        </svg>
                    Delete
                    </button>
                </div>
            </div>
        </div>

            <div class="contact-info">
                <h3>Contact Information</h3>
                <div class="contact-info-details">
                    <p><strong>Email</strong><br><a href="mailto:${email}">${email}</a></p>
                    <div class="contact-phone">
                        <p><strong>Phone</strong></p>
                        <p>${phone}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}
// ki ende