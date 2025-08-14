// ====== Elements ======
const filters = document.querySelectorAll(".filter");
const activityCardsContainer = document.getElementById("activity-cards");
const plannedCountBtn = document.getElementById("planned-count-btn");
const plannedActivitiesModal = document.getElementById("planned-activities-modal");
const plannedActivitiesList = document.getElementById("planned-activities-list");
const addActivityMain = document.getElementById("add-activity-main");
const addActivityBtn = document.getElementById("add-activity-btn");

const newActivityTitle = document.getElementById("new-activity-title");
const newActivityTime = document.getElementById("new-activity-time");
const newActivityParticipants = document.getElementById("new-activity-participants");

const cardPopupModal = document.getElementById("card-popup-modal");
const popupTitle = document.getElementById("popup-title");
const popupTime = document.getElementById("popup-time");
const popupNotes = document.getElementById("popup-notes");
const popupParticipants = document.getElementById("popup-participants");
const popupStartTimer = document.getElementById("popup-start-timer");
const popupStopTimer = document.getElementById("popup-stop-timer");
const popupDeleteCard = document.getElementById("popup-delete-card");

const popupAddFriend = document.getElementById("popup-add-friend");
const popupRemoveFriend = document.getElementById("popup-remove-friend");
const popupRemoveAllFriends = document.getElementById("popup-remove-all-friends");

const activityFormModal = document.getElementById("activity-form-modal");

// ====== Close buttons ======
document.querySelector(".close-modal").onclick = () => plannedActivitiesModal.style.display = "none";
document.querySelector(".close-card-modal").onclick = () => cardPopupModal.style.display = "none";

// Make the whole planned activities text clickable
document.querySelector('.my-activities-header span').addEventListener('click', () => {
  document.getElementById('planned-activities-modal').style.display = 'block';
});

// ====== Data ======
let activities = Array.from(document.querySelectorAll(".activity-card")).filter(c => !c.classList.contains("add-activity"));
let timers = {};
let timerIntervals = {};
let currentPopupCard = null;

// ====== Update Planned Count ======
function updatePlannedCount() {
  plannedCountBtn.innerHTML = `<strong>${activities.length}</strong>`;
}
updatePlannedCount();

// ====== Filter Logic ======
filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filterType = btn.dataset.filter;

    let visibleCount = 0;
    activities.forEach(card => {
      const category = card.dataset.category;
      if (filterType === "all" || category === filterType) {
        if (visibleCount < 3) {
          card.style.display = "flex";
          visibleCount++;
        } else {
          card.style.display = "none";
        }
      } else {
        card.style.display = "none";
      }
    });

    if (filterType === "with-friends") {
      activities.forEach(card => {
        if (card.dataset.category === "with-friends") {
          card.querySelector(".timer-display").style.display = "block";
        }
      });
    }
  });
});

// ====== Planned Activities Modal ======
plannedCountBtn.addEventListener("click", () => {
  renderPlannedActivitiesList();
  plannedActivitiesModal.style.display = "block";
});

function renderPlannedActivitiesList() {
  plannedActivitiesList.innerHTML = "";
  activities.forEach((card, index) => {
    const div = document.createElement("div");
    div.classList.add("planned-activity-item");
    div.textContent = `${index + 1}. ${card.querySelector("h4").textContent} - ${card.querySelector("p").textContent}`;
    plannedActivitiesList.appendChild(div);
  });
}

// ====== Add Activity Visibility ======
function updateAddActivityVisibility() {
  const activityCount = activityCardsContainer.querySelectorAll(".activity-card:not(.add-activity)").length;
  if (activityCount >= 4) {
    addActivityMain.style.display = "none";
  } else {
    addActivityMain.style.display = "flex";
  }
}

// ====== Create Activity Card ======
function createActivityCard(title, time, participants) {
  const category = participants === 1 ? "alone" : "with-friends";
  const card = document.createElement("div");
  card.classList.add("activity-card");
  card.dataset.category = category;

  const usersDiv = document.createElement("div");
  usersDiv.classList.add("activity-users");
  for (let i = 0; i < participants; i++) {
    const img = document.createElement("img");
    img.src = "user_default.jpg";
    usersDiv.appendChild(img);
  }

  const h4 = document.createElement("h4");
  h4.textContent = title;

  const p = document.createElement("p");
  p.textContent = time;

  const timer = document.createElement("div");
  timer.classList.add("timer-display");
  timer.textContent = "00:00";

  const arrow = document.createElement("div");
  arrow.classList.add("activity-arrow");
  arrow.textContent = "➔";

  card.appendChild(usersDiv);
  card.appendChild(h4);
  card.appendChild(p);
  card.appendChild(timer);
  card.appendChild(arrow);

  activityCardsContainer.insertBefore(card, addActivityMain);
  activities.push(card);
  attachCardEvents(card);

  updateAddActivityVisibility();
  updatePlannedCount();
}
addActivityMain.addEventListener("click", () => {
  renderPlannedActivitiesList();
  plannedActivitiesModal.style.display = "block";
});


// ====== Delete Activity ======
function deleteActivity(cardElement) {
  cardElement.remove();
  activities = activities.filter(c => c !== cardElement);
  updateAddActivityVisibility();
  updatePlannedCount();
}

// ====== Open Form from Both Buttons ======
addActivityMain.addEventListener("click", () => {
  activityFormModal.style.display = "block";
});
addActivityBtn.addEventListener("click", () => {
  const title = newActivityTitle.value.trim();
  const time = newActivityTime.value.trim();
  const participants = parseInt(newActivityParticipants.value.trim());

  if (!title || !time || isNaN(participants) || participants < 1) {
    alert("Please enter valid details.");
    return;
  }

  createActivityCard(title, time, participants);

  newActivityTitle.value = "";
  newActivityTime.value = "";
  newActivityParticipants.value = "";
  activityFormModal.style.display = "none";
  renderPlannedActivitiesList();
});

// ====== Card Events ======
function attachCardEvents(card) {
  card.querySelector(".activity-arrow").addEventListener("click", () => openCardPopup(card));
}
activities.forEach(card => attachCardEvents(card));

// ====== Card Popup ======
function openCardPopup(card) {
  currentPopupCard = card;
  popupTitle.textContent = card.querySelector("h4").textContent;
  popupTime.textContent = card.querySelector("p").textContent;
  popupNotes.value = card.dataset.notes || "";
  popupParticipants.innerHTML = "";
  card.querySelectorAll(".activity-users img").forEach(img => {
    const clone = img.cloneNode(true);
    popupParticipants.appendChild(clone);
  });
  cardPopupModal.style.display = "block";
  document.getElementById("friend-controls").style.display =
    card.dataset.category === "with-friends" ? "flex" : "none";
}

// ====== Notes Save ======
popupNotes.addEventListener("input", () => {
  if (currentPopupCard) {
    currentPopupCard.dataset.notes = popupNotes.value;
  }
});

// ====== Delete Card from Popup ======
popupDeleteCard.addEventListener("click", () => {
  if (!currentPopupCard) return;
  currentPopupCard.remove();
  activities = activities.filter(c => c !== currentPopupCard);
  updatePlannedCount();
  updateAddActivityVisibility();
  cardPopupModal.style.display = "none";
  renderPlannedActivitiesList();
});

// ====== Timer Logic ======
function startTimer(card) {
  let time = 0;
  if (!timerIntervals[card]) {
    timerIntervals[card] = setInterval(() => {
      time++;
      const minutes = String(Math.floor(time / 60)).padStart(2, "0");
      const seconds = String(time % 60).padStart(2, "0");
      card.querySelector(".timer-display").textContent = `${minutes}:${seconds}`;
    }, 1000);
  }
}
function stopTimer(card) {
  clearInterval(timerIntervals[card]);
  delete timerIntervals[card];
}
popupStartTimer.addEventListener("click", () => {
  if (currentPopupCard) startTimer(currentPopupCard);
});
popupStopTimer.addEventListener("click", () => {
  if (currentPopupCard) stopTimer(currentPopupCard);
});

// ====== Friend Controls ======
popupAddFriend.addEventListener("click", () => {
  if (!currentPopupCard) return;
  const img = document.createElement("img");
  img.src = "default.jpg";
  currentPopupCard.querySelector(".activity-users").appendChild(img);
  openCardPopup(currentPopupCard);
});
popupRemoveFriend.addEventListener("click", () => {
  if (!currentPopupCard) return;
  const imgs = currentPopupCard.querySelectorAll(".activity-users img");
  if (imgs.length > 0) {
    imgs[imgs.length - 1].remove();
    openCardPopup(currentPopupCard);
  }
});
popupRemoveAllFriends.addEventListener("click", () => {
  if (!currentPopupCard) return;
  currentPopupCard.querySelector(".activity-users").innerHTML = "";
  openCardPopup(currentPopupCard);
});

// ====== Utility ======
function getVisibleCards() {
  return activities.filter(card => card.style.display !== "none");
}
function getHiddenCards() {
  return activities.filter(card => card.style.display === "none");
}

// ====== Close Modals on Outside Click ======
window.addEventListener("click", (e) => {
  if (e.target === plannedActivitiesModal) plannedActivitiesModal.style.display = "none";
  if (e.target === cardPopupModal) cardPopupModal.style.display = "none";
  if (e.target === activityFormModal) activityFormModal.style.display = "none";
});
