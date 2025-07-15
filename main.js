function initApp() {
  const cur = getCurrentUser();
  if (!cur) return _show('auth');

  const user = getUsers()[cur];

  if (!user.weight || !user.height || !user.goal || !user.equipment) {
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

  const weight = +document.getElementById('weight').value;
  const height = +document.getElementById('height').value;
  const goal = document.getElementById('goal').value;
  const equipment = Array.from(document.querySelectorAll('#equipmentSelector input:checked')).map(el => el.value);

  if (!weight || !height || !goal || equipment.length === 0) {
    alert("Please fill everything out.");
    return;
  }

  users[cur] = {
    ...users[cur],
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
  container.innerHTML = Object.entries(EQUIPMENT).map(([section, items]) => {
    const checkboxes = items.map(item => `
      <label><input type="checkbox" value="${item}" /> ${item}</label>
    `).join('');
    return `<div class="equipment-section"><h4>${section}</h4>${checkboxes}</div>`;
  }).join('');
}

function _show(id) {
  ['auth', 'setup', 'main'].forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) section.classList.toggle('hidden', sectionId !== id);
  });
}

window.onload = initApp;
