function generateWorkout() {
  const diff = document.getElementById('difficulty').value;
  const user = getUsers()[getCurrentUser()];
  const equipment = user.equipment || [];
  let workouts = WORKOUT_TEMPLATES[diff] || [];
  // Filter by equipment if match keywords
  const filtered = workouts.filter(w => equipment.some(eq => w.toLowerCase().includes(eq.toLowerCase())));
  workouts = filtered.length ? filtered : workouts;
  document.getElementById('workout').innerHTML =
    workouts.map(w => `<div class="workout-box">${w}</div>`).join('');
  addAchievement('first_workout');
}
