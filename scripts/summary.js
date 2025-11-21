function navigateToHelp() {
    window.location.href = "help.html"
}

function navigateToBoard() {
    window.location.href = "board.html";
}

// Delegate clicks so it also works for dynamically rendered cards
document.addEventListener("click", (e) => {
    const card = e.target.closest(".kpi-card, .deadline-card, .task-summary-card");
    if (card) navigateToBoard();
});

