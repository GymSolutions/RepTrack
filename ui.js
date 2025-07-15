// ui.js

function renderGroups() {
  const dynamic = document.getElementById('dynamic-content');
  const groupsDB = getGroupsList();
  const userGroups = getUserGroups();

  let groupsHtml = Object.values(groupsDB).map(g => {
    const isMember = userGroups.includes(g.name);
    return `
      <div style="border:1px solid #444; margin:10px; padding:10px; border-radius:6px; background: #222;">
        <h4 style="color: #ff2c2c;">${g.name}</h4>
        <p>${g.description || ''}</p>
        <p>Members: ${g.members.length}</p>
        <button ${isMember ? 'disabled style="opacity:0.6;"' : `onclick="joinGroupUI('${g.name}')"`}>
          ${isMember ? 'Member' : 'Join'}
        </button>
      </div>
    `;
  }).join('');

  dynamic.innerHTML = `
    <h3 style="color: #ff2c2c;">Groups & Challenges</h3>
    <div style="margin-bottom:15px;">
      <input type="text" id="newGroupName" placeholder="New group name" style="padding:8px; margin-right:10px; border-radius:6px; border:none;"/>
      <input type="text" id="newGroupDesc" placeholder="Description (optional)" style="padding:8px; margin-right:10px; border-radius:6px; border:none;"/>
      <button onclick="createGroupUI()" style="background:#ff2c2c; color:#fff; border:none; padding:8px 15px; border-radius:6px; cursor:pointer;">Create Group</button>
    </div>
    <div>${groupsHtml || '<p>No groups yet. Create one!</p>'}</div>
  `;
}

function renderDashboard() {
  const dynamic = document.getElementById('dynamic-content');
  const user = getCurrentUser();

  const schedule = localStorage.getItem(`${localStorage.getItem('currentUser')}-schedule`) || '';
  const workoutHTML = localStorage.getItem(`${localStorage.getItem('currentUser')}-workoutHTML`) || '';

  dynamic.innerHTML = `
    <h3>Weekly Plan</h3>
    <pre style="white-space: pre-wrap; background: var(--card-bg); padding: 10px; border-radius: 8px;">${schedule}</pre>
    
    <h3>Today's Workout</h3>
    <select id="difficulty" style="margin-bottom:10px;">
      <option value="easy">Easy</option>
      <option value="medium" selected>Medium</option>
      <option value="hard">Hard</option>
    </select>
    <button onclick="generateWorkout()">Generate Workout</button>

    <div id="workout">${workoutHTML}</div>
  `;
}
