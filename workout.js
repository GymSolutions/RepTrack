// workout.js

function generateWorkout() {
  const diff = document.getElementById('difficulty').value;
  const user = getCurrentUser();
  if (!user) return alert('No user logged in!');
  const selectedEquip = user.equipment || [];

  let baseWorkouts = WORKOUTS[diff] || [];

  if (selectedEquip.length) {
    // Filter workouts by equipment keywords if possible (simple match)
    const filtered = baseWorkouts.filter(w => {
      for (let eq of selectedEquip) {
        if (w.toLowerCase().includes(eq.toLowerCase())) return true;
      }
      return false;
    });
    if (filtered.length) baseWorkouts = filtered;
  }

  const workoutDiv = document.getElementById('workout-result');
  workoutDiv.innerHTML = baseWorkouts.length
    ? baseWorkouts.map(w => `<div class="workout-box">${w}</div>`).join('')
    : '<p>No suitable workouts found for your equipment.</p>';

  addAchievement('first_workout');
}

function addAchievement(id) {
  let user = getCurrentUser();
  if (!user) return;
  if (!user.achievements) user.achievements = [];
  if (!user.achievements.includes(id)) {
    user.achievements.push(id);
    updateCurrentUser({ achievements: user.achievements });
    alert(`Achievement unlocked: ${ACHIEVEMENTS.find(a => a.id === id)?.title}`);
  }
}

function aiCoachTip() {
  const tips = [
    "Remember to warm up before every workout!",
    "Stay hydrated throughout your session.",
    "Focus on form, not just reps.",
    "Progress takes time; be consistent!",
    "Rest days are as important as workout days."
  ];
  return tips[Math.floor(Math.random() * tips.length)];
}
