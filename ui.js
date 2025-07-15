function renderGroups() {
  const groups = getAllGroups();
  const current = getUsers()[getCurrentUser()].groups;
  const container = document.getElementById('dynamic-content');
  container.innerHTML = `<h3>Groups</h3>` + groups.map(g => {
    const isMember = current.includes(g.id);
    return `<div style="border:1px solid var(--border); padding:10px; margin:8px; border-radius:6px; text-align:left;">
      <strong>${g.id}</strong><br>
      <small>${g.description}</small><br>
      <em>Members: ${g.members.length}</em><br>
      <button ${isMember ? 'disabled' : `onclick="handleJoinGroup('${g.id}')"`}>${isMember ? 'Joined' : 'Join'}</button>
    </div>`;
  }).join('') + `
    <h4>Create Group</h4>
    <input id="newGroup" placeholder="Group name" />
    <input id="newGroupDesc" placeholder="Description" />
    <button onclick="handleCreateGroup()">Create</button>`;
}

function renderDashboard() {
  const container = document.getElementById('dynamic-content');
  const user = getUsers()[getCurrentUser()];
  const plan = localStorage.getItem(`${user.email}-schedule`) || '';
  container.innerHTML = `
    <h3>Weekly Schedule</h3>
    <pre>${plan}</pre>
    <h3>Today's Workout</h3>
    <select id="difficulty">
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
    <button onclick="generateWorkout()">Generate</button>
    <div id="workout"></div>`;
}
