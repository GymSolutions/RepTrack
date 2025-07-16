function initApp() {
  const cur = getCurrentUser();
  if (!cur) return _show('auth');

  const user = getUsers()[cur];

  if (!user.weight || !user.height || !user.goal || !user.equipment || !user.age) {
    buildEquipmentList();
    return _show('setup');
  }

  renderDashboard();
  _show('main');
}

function handleSignUp() {
  const email = document.getElementById('email')?.value?.trim();
  const pw = document.getElementById('password')?.value?.trim();
  if (!email || !pw) return alert("Email and password required.");
  const res = signUp(email, pw);
  if (res.success) initApp();
  else alert(res.message);
}

function handleLogin() {
  const email = document.getElementById('email')?.value?.trim();
  const pw = document.getElementById('password')?.value?.trim();
  if (!email || !pw) return alert("Email and password required.");
  const res = login(email, pw);
  if (res.success) initApp();
  else alert(res.message);
}

function handleLogout() {
  logout();
  initApp();
}

function handleSetupComplete() {
  const cur = getCurrentUser();
  const users = getUsers();

  const age = +document.getElementById('age').value;
  const weight = +document.getElementById('weight').value;
  const height = +document.getElementById('height').value;
  const goal = document.getElementById('goal').value;
  const equipment = Array.from(document.querySelectorAll('#equipmentSelector input:checked')).map(el => el.value);

  if (!age || !weight || !height || !goal || equipment.length === 0) {
    alert("Please fill everything out.");
    return;
  }

  users[cur] = {
    ...users[cur],
    age,
    weight,
    height,
    goal,
    equipment
  };

  saveUsers(users);
  localStorage.setItem(`${cur}-schedule`, "Generated schedule pending...");
  initApp();
}

function buildEquipmentList() {
  const container = document.getElementById('equipmentSelector');
  container.innerHTML = `<button onclick="selectAllEquipment()">Select All</button><br/><br/>`;

  container.innerHTML += Object.entries(EQUIPMENT).map(([section, items]) => {
    const checkboxes = items.map(e => `
      <label class="equipment-item">
        <input type="checkbox" value="${e.name}" />
        <span class="icon">${e.icon}</span> ${e.name}
      </label>
    `).join('');
    return `<div class="equipment-section"><h4>${section}</h4>${checkboxes}</div>`;
  }).join('');
}

function selectAllEquipment() {
  document.querySelectorAll('#equipmentSelector input[type="checkbox"]').forEach(cb => cb.checked = true);
}

function _show(id) {
  ['auth', 'setup', 'main'].forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) section.classList.toggle('hidden', sectionId !== id);
  });
}

window.onload = initApp;
