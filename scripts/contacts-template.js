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
                    <svg class="ac__logo" viewBox="0 0 32 32" aria-hidden="true">
                        <rect width="6" height="6" x="23" y="6" rx="1" fill="#2A3647" />
                        <path d="M8 6h6v18a8 8 0 0 1-16 0v-3h6v3a2 2 0 0 0 4 0V6z" fill="#fff" />
                    </svg>
                </div>
                <h2 id="ac-title" class="ac__title">Add contact</h2>
                <p class="ac__subtitle">Tasks are better with a team!</p>
                <span class="ac__underline" aria-hidden="true"></span>
            </div>
            <button type="button" class="ac__close" aria-label="Close">×</button>
            <div class="ac__formwrap">
                <div class="ac__avatar" aria-label="Avatar placeholder">
                    <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
                        <circle cx="60" cy="60" r="58" fill="#E7E7E7" stroke="#FFF" stroke-width="4" />
                        <circle cx="60" cy="48" r="22" fill="#BDBDBD" />
                        <path d="M20 98c10-18 32-24 40-24s30 6 40 24" fill="#BDBDBD" />
                    </svg>
                </div>
                <form id="add-contact-form" class="ac-form" novalidate>
                    <label class="ac-field">
                        <input id="ac-name" name="name" type="text" placeholder="Name" autocomplete="name" required
                            aria-required="true">
                        <span class="ac-field__icon" aria-hidden="true">
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <circle cx="12" cy="8" r="4" fill="#A8A8A8" />
                                <path d="M4 20c2.5-4 6-6 8-6s5.5 2 8 6" fill="#A8A8A8" />
                            </svg>
                        </span>
                    </label>
                    <label class="ac-field">
                        <input id="ac-email" name="email" type="email" placeholder="Email" autocomplete="email" required
                            aria-required="true">
                        <span class="ac-field__icon" aria-hidden="true">
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path d="M3 6h18v12H3z" fill="#A8A8A8" />
                                <path d="M3 7l9 6 9-6" fill="#fff" />
                            </svg>
                        </span>
                    </label>
                    <label class="ac-field">
                        <input id="ac-phone" name="phone" type="tel" placeholder="Phone" autocomplete="tel">
                        <span class="ac-field__icon" aria-hidden="true">
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path d="M6 2l4 2-2 4c2 3 5 6 8 8l4-2 2 4-3 3c-1 1-3 1-4 1-8-2-14-8-16-16 0-1 0-3 1-4L6 2z"
                                    fill="#A8A8A8" />
                            </svg>
                        </span>
                    </label>
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
