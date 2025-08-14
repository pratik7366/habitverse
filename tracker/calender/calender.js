const monthSelect = document.getElementById("month");
const yearSelect = document.getElementById("year");
const calendarDays = document.getElementById("calendar-days");

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Get current date in IST
const nowIST = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
const istDate = new Date(nowIST);

const currentYear = istDate.getFullYear();
const currentMonth = istDate.getMonth();
const currentDate = istDate.getDate();

// Populate months
months.forEach((month, i) => {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = month;
  if (i === currentMonth) option.selected = true;
  monthSelect.appendChild(option);
});

// Populate years (past 20 to future 20)
for (let y = currentYear - 20; y <= currentYear + 20; y++) {
  const option = document.createElement("option");
  option.value = y;
  option.textContent = y;
  if (y === currentYear) option.selected = true;
  yearSelect.appendChild(option);
}

function generateCalendar(month, year) {
  calendarDays.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay(); // Sunday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const offset = (firstDay + 6) % 7; // Monday = 0

  for (let i = 0; i < offset; i++) {
    calendarDays.innerHTML += `<div></div>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = day;

    if (day === currentDate && month === currentMonth && year === currentYear) {
      dayDiv.classList.add("active");
    }

    dayDiv.addEventListener("click", () => {
      document.querySelectorAll(".calendar-days div").forEach(d => d.classList.remove("active"));
      dayDiv.classList.add("active");
    });

    calendarDays.appendChild(dayDiv);
  }
}

monthSelect.addEventListener("change", () => {
  generateCalendar(parseInt(monthSelect.value), parseInt(yearSelect.value));
});

yearSelect.addEventListener("change", () => {
  generateCalendar(parseInt(monthSelect.value), parseInt(yearSelect.value));
});

// Initial render
generateCalendar(currentMonth, currentYear);
