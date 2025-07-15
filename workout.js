function generateWorkout() {
  const diff = document.getElementById('difficulty').value;
  const u = getUsers()[getCurrentUser()];
  const equip = u.equipment || [];
  let workouts = WORKOUT_TEMPLATES[diff] || [];

  const filtered = workouts.filter(w => equip.some(eq => w.toLowerCase().includes(eq.toLowerCase())));
  workouts = filtered.length ? filtered : workouts;

  document.getElementById('workout').innerHTML =
    workouts.map(w => `<div class="workout-box">${w}</div>`).join('');
  
  updateStreak(); // ← Adds today's streak
}
