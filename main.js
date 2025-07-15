function initApp() {
  const cur = getCurrentUser();
  if (!cur) return _show('auth');
  const u = getUsers()[cur];
  if (!u.weight || !u.height || !u.goal) {
    buildEquipmentList();
    return _show('setup');
  }
  renderDashboard();
  _show('main');
}

function handleSignUp() { /* as shown above */ }
function handleLogin() { /* as shown above */ }
function handleLogout() { logout(); initApp(); }

function handleSetupComplete() {
  const u = getUsers(), cur = getCurrentUser();
  u[cur] = { ...u[cur],
    weight: +document.getElementById('weight').value,
    height: +document.getElementById('height').value,
    goal: document.getElementById('goal').value,
    equipment: Array.from(document.querySelectorAll('#equipmentSelector input:checked')).map(el => el.value)
  };
  saveUsers(u);
  localStorage.setItem(`${cur}-schedule`, "Your generated plan…");
  initApp();
}

function buildEquipmentList() {
  const parent = document.getElementById('equipmentSelector');
  parent.innerHTML = Object.entries(EQUIPMENT).map(([sec,arr]) => 
    `<strong>${sec}</strong><br>` + arr.map(item => `
      <label><input type="checkbox" value="${item}" /> ${item}</label>`
    ).join('')
  ).join('');
}

function _show(id) {
  ['auth','setup','main'].forEach(i => 
    document.getElementById(i).classList.toggle('hidden', i !== id));
}

window.onload = initApp;
