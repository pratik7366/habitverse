let goal = 0;

window.setGoal = function () {
  const input = prompt("Enter your DSA goal for today (e.g., 5 questions):");
  if (input && !isNaN(input) && Number(input) > 0) {
    goal = Number(input);
    document.getElementById("dsaMessage").textContent = `Goal set: ${goal} questions`;
    document.getElementById("dsaProgressBar").style.display = "block"; // Show bar
    updateProgress(0); // Reset progress
  } else {
    alert("Please enter a valid number greater than 0.");
  }
};

window.updateCompleted = function () {
  if (goal === 0) {
    alert("Please set your goal first.");
    return;
  }

  const input = prompt("Enter how many questions you completed today:");
  if (input && !isNaN(input) && Number(input) >= 0) {
    const completed = Number(input);
    updateProgress(completed);
  } else {
    alert("Please enter a valid number.");
  }
};

function updateProgress(completed) {
  const percent = Math.min(100, Math.round((completed / goal) * 100));
  const fill = document.getElementById("dsaProgressFill");
  const text = document.getElementById("dsaProgressText");
  const msg = document.getElementById("dsaMessage");

  fill.style.width = percent + "%";
  text.textContent = `${percent}% completed`;

  // Color logic
  if (percent < 50) {
    fill.style.background = "#e74c3c"; // red
  } else if (percent < 100) {
    fill.style.background = "#f1c40f"; // yellow
  } else {
    fill.style.background = "#2ecc71"; // green
  }

  // Motivational messages
  if (percent >= 100) {
    msg.textContent = `🎉 Amazing! You've completed or exceeded your goal!`;
  } else if (percent >= 75) {
    msg.textContent = `💪 Almost there! Keep pushing!`;
  } else if (percent >= 50) {
    msg.textContent = `👍 Good progress! Stay focused!`;
  } else if (percent > 0) {
    msg.textContent = `📈 You're getting started! Keep going!`;
  } else {
    msg.textContent = `⏳ Let's begin! Set and achieve your goal today.`;
  }
}
