const EQUIPMENT = {
  Cardio: ["Treadmill", "Elliptical", "Stationary Bike", "Rowing Machine"],
  Chest: ["Chest Press", "Pec Deck", "Push-Up Bars", "Cable Crossover"],
  Back: ["Lat Pulldown", "Seated Row", "Pull-Up Bar", "Back Extension"],
  Arms: ["Bicep Curl Machine", "Tricep Pushdown", "Preacher Curl", "Cable Curl"],
  Legs: ["Leg Press", "Leg Extension", "Leg Curl", "Calf Raise"],
  Shoulders: ["Shoulder Press", "Lateral Raise", "Front Raise", "Shrug Machine"],
  Core: ["Ab Crunch", "Russian Twist Bench", "Plank Station", "Captain's Chair"],
  FreeWeights: ["Dumbbells", "Barbells", "Kettlebells", "EZ Curl Bar"],
  Machines: ["Smith Machine", "Cable Machine", "Hack Squat", "Leg Press"],
};

const WORKOUT_TEMPLATES = {
  easy: [
    "10 min Treadmill Walk", "15 Dumbbell Curls (10 lb)", "10 Push-Ups",
    "20 Air Squats", "10 Sit-Ups", "5 Min Bike Ride"
  ],
  medium: [
    "3x12 Lat Pulldown (60 lb)", "3x10 Chest Press (80 lb)", "3x15 Leg Press (120 lb)",
    "3x12 Shoulder Press (50 lb)", "3x10 Bicep Curl Machine (40 lb)"
  ],
  hard: [
    "4x10 Barbell Squats (135 lb)", "4x12 Deadlifts (145 lb)", "4x10 Bench Press (95 lb)",
    "4x15 Cable Crossover (30 lb)", "4x12 Seated Row (90 lb)"
  ]
};

// STREAK REWARDS POPUP
const STREAK_MILESTONES = [3, 5, 10, 50, 100];

function showStreakPopup(streak) {
  const popup = document.createElement("div");
  popup.className = "streak-popup";
  popup.innerHTML = `
    <div class="streak-box">
      <h2>🔥 STREAK UNLOCKED!</h2>
      <p>${streak}-Day Gym Streak!</p>
      <button onclick="this.parentElement.parentElement.remove()">Awesome!</button>
    </div>
  `;
  document.body.appendChild(popup);
}

// Update streak & trigger rewards
function updateStreak() {
  const users = getUsers();
  const user = users[getCurrentUser()];
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (user.lastWorkout === today) return;

  if (user.lastWorkout === yesterday) {
    user.streak = (user.streak || 0) + 1;
  } else {
    user.streak = 1;
  }

  user.lastWorkout = today;

  if (STREAK_MILESTONES.includes(user.streak)) {
    showStreakPopup(user.streak);
  }

  saveUsers(users);
}
