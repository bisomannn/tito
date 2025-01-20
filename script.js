let round = 0;
const players = ["Player 1", "Player 2"]; // أسماء اللاعبين
const totalScores = [0, 0]; // مصفوفة لتخزين إجمالي النقاط لكل لاعب
let subtractMode = false; // وضع الخصم (true: خصم، false: إضافة)

// وظيفة لعرض لوحة النتائج الكبيرة
function updateTotalScore() {
  const totalScoreBoard = document.querySelector("#totalScore");
  totalScoreBoard.innerHTML = ""; // تفريغ اللوحة لإعادة بنائها

  players.forEach((player, playerIndex) => {
    const scoreDiv = document.createElement("div");
    scoreDiv.textContent = `${player}: ${totalScores[playerIndex]} pts`;
    scoreDiv.style.color = playerIndex % 2 === 0 ? "green" : "red";
    scoreDiv.style.fontSize = "24px"; // حجم كبير للنص
    scoreDiv.style.marginBottom = "10px";
    totalScoreBoard.appendChild(scoreDiv);

    // التحقق من تجاوز النقاط 101
    if (totalScores[playerIndex] >= 101) {
      alert(`${player} has reached 101 points! Game over.`);
      totalScores[playerIndex] = 0; // إعادة تعيين النقاط
      updateTotalScore();
    }
  });
}

// وظيفة إضافة جولة جديدة
function addRound() {
  round++;
  const tbody = document.querySelector("#scoreTable tbody");
  const row = document.createElement("tr");

  const roundCell = document.createElement("td");
  roundCell.textContent = `Round ${round}`;
  row.appendChild(roundCell);

  players.forEach((player, playerIndex) => {
    const scoreCell = document.createElement("td");

    // تحديد لون اللاعب (أخضر أو أحمر)
    const playerColor = playerIndex % 2 === 0 ? "green" : "red";

    // أزرار الأرقام من 1 إلى 7
    for (let i = 1; i <= 7; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.style.margin = "0 5px";
      button.style.backgroundColor = playerColor;
      button.style.color = "white";
      button.style.border = "none";
      button.style.padding = "5px 10px";
      button.style.borderRadius = "4px";
      button.style.cursor = "pointer";

      button.onclick = () => {
        const points = subtractMode ? -i : i; // تحديد النقاط بناءً على وضع السالب
        totalScores[playerIndex] += points; // تحديث النقاط
        updateTotalScore(); // تحديث لوحة الإجمالي
      };

      scoreCell.appendChild(button);
    }

    row.appendChild(scoreCell);
  });

  tbody.appendChild(row);
}

// تبديل وضع السالب
function toggleSubtractMode() {
  subtractMode = !subtractMode; // عكس الوضع
  const modeText = document.querySelector("#subtractMode");
  modeText.textContent = subtractMode ? "Subtract Mode ON" : "Add Mode ON";
  modeText.style.color = subtractMode ? "red" : "green"; // تغيير اللون
}
