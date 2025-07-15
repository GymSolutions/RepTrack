function renderDashboard() {
  const u = getUsers()[getCurrentUser()];
  document.getElementById('userName').innerText = getCurrentUser();

  const plan = localStorage.getItem(`${getCurrentUser()}-schedule`) || '';
  document.getElementById('dynamic-content').innerHTML = `
    <h3>Weekly Schedule</h3>
    <pre>${plan}</pre>
    <h4>🔥 Current Streak: ${u.streak || 0} days</h4>
    <h3>Today's Workout</h3>
    <select id="difficulty"><option>easy</option><option selected>medium</option><option>hard</option></select>
    <button onclick="generateWorkout()">Generate</button>
    <div id="workout"></div>`;
}
