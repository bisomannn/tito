let totalScores = [0, 0];
let isSubtractMode = false;
let playerNames = ['Player 1', 'Player 2']; // متغير لتخزين الأسماء

// Update scores
function updateScore(player, value) {
    const actualValue = isSubtractMode ? -value : value;
    totalScores[player] += actualValue;
    document.getElementById(`player${player + 1}-score`).textContent = totalScores[player];
    addLogEntry(player, actualValue, isSubtractMode); // Add to log
}

// Add entry to log
function addLogEntry(player, value, mode) {
    const logList = document.getElementById("log-list");
    const logEntry = document.createElement("li");
    const action = mode ? "نزل" : "كل";
    logEntry.textContent = `${playerNames[player]}: ${action} ${Math.abs(value)} بونط`; // استخدم الأسماء من المتغير
    logList.appendChild(logEntry);

    // Keep log scrolled to the bottom
    logList.scrollTop = logList.scrollHeight;
}

// Toggle mode
function toggleMode() {
    isSubtractMode = !isSubtractMode;
    const modeIndicator = document.getElementById("mode-indicator");
    modeIndicator.textContent = isSubtractMode ? "وضع النزول مفعل" : "وضع الاكل مفعل";
    modeIndicator.style.color = isSubtractMode ? "red" : "green";
}

// Start the game
function startGame() {
    totalScores = [0, 0];
    document.getElementById("player1-score").textContent = "0";
    document.getElementById("player2-score").textContent = "0";
    isSubtractMode = false;
    document.getElementById("mode-indicator").textContent = "وضع الاكل مفعل";
    document.getElementById("mode-indicator").style.color = "green";

    // Clear the log
    document.getElementById("log-list").innerHTML = "";
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

// Player 1: Change name
document.getElementById('edit-player1-name').addEventListener('click', function () {
    const nameField = document.getElementById('player1-name');
    const inputField = document.getElementById('player1-name-input');

    if (inputField.style.display === 'none') {
        inputField.style.display = 'block';
        inputField.value = nameField.textContent;
    } else {
        // Update the name displayed with the new value
        const newName = inputField.value.trim() || 'Player 1';
        nameField.textContent = newName;
        playerNames[0] = newName;  // تحديث الاسم في المتغير
        inputField.style.display = 'none';
    }
});

// Player 2: Change name
document.getElementById('edit-player2-name').addEventListener('click', function () {
    const nameField = document.getElementById('player2-name');
    const inputField = document.getElementById('player2-name-input');

    if (inputField.style.display === 'none') {
        inputField.style.display = 'block';
        inputField.value = nameField.textContent;
    } else {
        // Update the name displayed with the new value
        const newName = inputField.value.trim() || 'Player 2';
        nameField.textContent = newName;
        playerNames[1] = newName;  // تحديث الاسم في المتغير
        inputField.style.display = 'none';
    }
});

// Event listeners
document.getElementById("start").addEventListener("click", startGame);
document.getElementById("toggle").addEventListener("click", toggleMode);

// Initialize
initButtons();
