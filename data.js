const STREAK_LEVELS = [3, 5, 10, 50, 100];

function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "{}");
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function getCurrentUser() {
  return localStorage.getItem("currentUser");
}

function setCurrentUser(email) {
  localStorage.setItem("currentUser", email);
}

function logout() {
  localStorage.removeItem("currentUser");
}

function updateStreak() {
  const users = getUsers();
  const cur = getCurrentUser();
  const today = new Date().toDateString();

  if (!users[cur].lastWorkoutDate) {
    users[cur].lastWorkoutDate = today;
    users[cur].streak = 1;
    saveUsers(users);
    showStreakPopup(1);
    return;
  }

  const last = new Date(users[cur].lastWorkoutDate);
  const now = new Date(today);
  const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    users[cur].streak = (users[cur].streak || 0) + 1;
    users[cur].lastWorkoutDate = today;
    saveUsers(users);

    if (STREAK_LEVELS.includes(users[cur].streak)) {
      showStreakPopup(users[cur].streak);
    }
  } else if (diffDays > 1) {
    users[cur].streak = 1;
    users[cur].lastWorkoutDate = today;
    saveUsers(users);
    showStreakPopup(1);
  }
}

function showStreakPopup(day) {
  const popup = document.createElement("div");
  popup.className = "streak-popup";
  popup.innerHTML = `
    <div class="streak-content">
      🔥 <h3>${day}-Day Streak!</h3>
      <p>You’ve worked out ${day} days in a row. Keep it going!</p>
    </div>
  `;
  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 4000);
}

const EQUIPMENT = {
  Cardio: [
    { name: "Treadmill", icon: "🏃‍♂️" },
    { name: "Stationary Bike", icon: "🚴" },
    { name: "Rowing Machine", icon: "🚣" },
    { name: "Elliptical", icon: "🦶" }
  ],
  Chest: [
    { name: "Bench Press", icon: "🛋️" },
    { name: "Chest Fly Machine", icon: "🪽" },
    { name: "Push-up Bars", icon: "🤸" }
  ],
  Arms: [
    { name: "Dumbbells", icon: "🏋️" },
    { name: "Cable Machine", icon: "🔗" },
    { name: "EZ Curl Bar", icon: "💪" }
  ],
  Legs: [
    { name: "Leg Press", icon: "🦵" },
    { name: "Squat Rack", icon: "🧱" },
    { name: "Leg Extension", icon: "🪑" }
  ],
  Back: [
    { name: "Lat Pulldown", icon: "⬇️" },
    { name: "Pull-Up Bar", icon: "🪜" },
    { name: "Seated Row", icon: "🛶" }
  ]
};
