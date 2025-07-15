// workout.js

function generateWorkout() {
  const diff = document.getElementById('difficulty').value;
  const user = getCurrentUser();
  if (!user) return alert('No user logged in!');
  const selectedEquip = user.equipment || [];

  // Simplified workout generation based on difficulty & equipment
  let baseWorkouts = WORKOUTS[diff] || [];
  if (selectedEquip.length) {
    // Filter workouts by equipment if possible (simple match)
    baseWorkouts = baseWorkouts.filter(w => {
      for (let eq of selectedEquip) {
        if (w.toLowerCase().includes(eq.toLowerCase())) return true;
      }
      return false;
    });
    if (baseWorkouts.length === 0) baseWorkouts = WORKOUTS[diff]; // fallback
  }

  const workoutDiv = document.getElementById('workout-result');
  workoutDiv.innerHTML = baseWorkouts.length
    ? baseWorkouts.map(w => `<div class="workout-box">${w}</div>`).join('')
    : '<p>No suitable workouts found for your equipment.</p>';

  // Mark achievement for first workout done
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

// Simple AI Coach stub (returns random tip)
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
