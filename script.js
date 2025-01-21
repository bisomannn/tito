let totalScores = [0, 0];
let isSubtractMode = false;

// Update scores
function updateScore(player, value) {
    totalScores[player] += isSubtractMode ? -value : value;
    document.getElementById(`player${player + 1}-score`).textContent = totalScores[player];
    addToLog(player + 1, value, isSubtractMode);
}

// Toggle mode
function toggleMode() {
    isSubtractMode = !isSubtractMode;
    const modeIndicator = document.getElementById("mode-indicator");
    modeIndicator.textContent = isSubtractMode ? "وضع النزول مفعل" : "وضع الاكل مفعل";
    modeIndicator.style.color = isSubtractMode ? "red" : "green";
}

// Add to log
function addToLog(player, value, isSubtractMode) {
    const playerName = document.getElementById(`player${player}-name`).textContent;
    const logEntry = document.createElement("li");
    logEntry.textContent = `${playerName} ${isSubtractMode ? "نزل" : "كل"} ${value} بونط`;
    const scoreLog = document.getElementById("score-log");
    scoreLog.appendChild(logEntry);
    scoreLog.scrollTop = scoreLog.scrollHeight; // Scroll to the latest log
}

// Initialize buttons
function initButtons() {
    const player1Buttons = document.querySelectorAll("#player1-buttons .number-button");
    const player2Buttons = document.querySelectorAll("#player2-buttons .number-button");

    player1Buttons.forEach(button => {
        button.addEventListener("click", () => {
            updateScore(0, parseInt(button.getAttribute("data-value")));
        });
    });

    player2Buttons.forEach(button => {
        button.addEventListener("click", () => {
            updateScore(1, parseInt(button.getAttribute("data-value")));
        });
    });
}

// Start the game
function startGame() {
    totalScores = [0, 0];
    document.getElementById("player1-score").textContent = "0";
    document.getElementById("player2-score").textContent = "0";
    isSubtractMode = false;
    document.getElementById("mode-indicator").textContent = "وضع الاكل مفعل";
    document.getElementById("mode-indicator").style.color = "green";
    document.getElementById("score-log").innerHTML = ""; // Clear the log
}

// Edit player name
function setupNameEditing(playerId) {
    const editButton = document.getElementById(`edit-player${playerId}-name`);
    const nameField = document.getElementById(`player${playerId}-name`);
    const inputField = document.getElementById(`player${playerId}-name-input`);

    editButton.addEventListener("click", () => {
        if (inputField.style.display === "none") {
            inputField.style.display = "block";
            inputField.value = nameField.textContent;
        } else {
            nameField.textContent = inputField.value || `Player ${playerId}`;
            inputField.style.display = "none";
        }
    });
}

// Event listeners
document.getElementById("start").addEventListener("click", startGame);
document.getElementById("toggle").addEventListener("click", toggleMode);

// Initialize
initButtons();
setupNameEditing(1);
setupNameEditing(2);
