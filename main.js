function initApp() {
  const current = getCurrentUser();
  if (!current) {
    _show('auth');
  } else {
    const user = getUsers()[current];
    if (!user.weight || !user.height || !user.goal) {
      _show('setup');
      buildEquipmentList();
    } else {
      _show('main');
      renderDashboard();
    }
  }
}

function handleSignUp() {
  const email = prompt('Email:');
  const pw = prompt('Password:');
  const res = signUp(email, pw);
  if (res.success) initApp();
  else alert(res.message);
}

function handleLogin() {
  const email = prompt('Email:');
  const pw = prompt('Password:');
  const res = login(email, pw);
  if (res.success) initApp();
  else alert(res.message);
}

function handleLogout() {
  logout();
  initApp();
}

function handleSetupComplete() {
  const weight = +document.getElementById('weight').value;
  const height = +document.getElementById('height').value;
  const goal = document.getElementById('goal').value;
  const equip = Array.from(document.querySelectorAll('.equipment-selector input:checked')).map(i => i.value);
  const users = getUsers();
  const cur = getCurrentUser();
  users[cur] = { ...users[cur], weight, height, goal, equipment: equip };
  saveUsers(users);
  localStorage.setItem(`${cur}-schedule`, `Plan for ${cur}`);
  initApp();
}

function buildEquipmentList() {
  const container = document.getElementById('equipmentSelector');
  container.innerHTML = Object.entries(EQUIPMENT).map(([section,list]) => `
    <strong>${section}</strong><br>` + list.map(item => `
      <label>
        <input type="checkbox" value="${item}" />
        ${item}
      </label>`
  ).join('')).join('');
}

function handleCreateGroup() {
  const name = document.getElementById('newGroup').value.trim();
  const desc = document.getElementById('newGroupDesc').value.trim();
  const msg = createGroup(name, desc);
  alert(msg);
  renderGroups();
}

function handleJoinGroup(name) {
  const msg = joinGroup(name);
  alert(msg);
  renderGroups();
}

window.onload = initApp;
