
  const sleepgoal = 8;

  function updateSleep() {
    const sleepInput = parseFloat(document.getElementById("sleepHours").value);
    const ring = document.getElementById("progressCircle");
    const label = document.getElementById("sleepValue");
    const resultMessage = document.getElementById("resultMessage");

    if (isNaN(sleepInput) || sleepInput < 0 || sleepInput > 24) {
      alert("Please enter a valid number between 0 and 24.");
      return;
    }

    // Calculate percentage
    let percentage = Math.min((sleepInput / sleepgoal) * 100, 100);
    ring.setAttribute("stroke-dasharray", `${percentage}, 100`);

    // Update ring color and text
    label.textContent = `${sleepInput}h`;

    // Handle colors based on sleep
    if (sleepInput < 4) {
      ring.style.stroke = "#ff3b3b"; // red
      resultMessage.textContent = "Severe lack of sleep 🥱";
    } else if (sleepInput < 6) {
      ring.style.stroke = "#ff8c00"; // orange
      resultMessage.textContent = `${Math.round(percentage)}% — Not adequate 😴`;
    } else if (sleepInput < sleepgoal) {
      ring.style.stroke = "#ffd700"; // yellow
      resultMessage.textContent = `${Math.round(percentage)}% — Almost there!`;
    } else if (sleepInput === sleepgoal) {
      ring.style.stroke = "#00ff7f"; // green
      resultMessage.textContent = `✅ Goal completed!`;
    } else {
      ring.style.stroke = "#00bfff"; // blue
      resultMessage.textContent = `😆 ${Math.round((sleepInput / goal) * 100)}% — Lazy bones! Time to get moving!`;
    }
  }

