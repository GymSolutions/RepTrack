// main.js

let currentTheme = 'default';

function initApp() {
  if (!currentUserEmail) {
    renderLogin();
  } else {
    const user = getCurrentUser();
    if (!user.weight || !user.height || !user.goal || !user.equipment || user.equipment.length === 0) {
      renderSetup();
    } else {
      renderDashboard();
    }
  }
}

function handleSignUp() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const msg = signUp(email, password);
  alert(msg);
  if (msg.startsWith('Sign up')) {
    renderSetup();
  }
}

function handleLogin() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const msg = login(email, password);
  if (msg === 'Login successful') {
    const user = getCurrentUser();
    if (!user.weight || !user.height || !user.goal || !user.equipment || user.equipment.length === 0) {
      renderSetup();
    } else {
      renderDashboard();
    }
  } else {
    alert(msg);
  }
}

function handleLogout() {
  logout();
  renderLogin();
}

function handleSetupComplete() {
  const weight = parseInt(document.getElementById('weight').value);
  const height = parseInt(document.getElementById('height').value);
  const goal = document.getElementById('goal').value;
  const selectedEquip = [...document.querySelectorAll('.equipment-list input:checked')].map(e => e.value);

  if (!weight || !height) return alert('Please enter valid weight and height.');

  updateCurrentUser({ weight, height, goal, equipment: selectedEquip });
  alert('Profile saved!');
  renderDashboard();
}

function uploadPhoto(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    let user = getCurrentUser();
    if (!user.progressPhotos) user.progressPhotos = [];
    user.progressPhotos.push(e.target.result);
    updateCurrentUser({ progressPhotos: user.progressPhotos });
    renderProfile();
  };
  reader.readAsDataURL(file);
}

function toggleTheme() {
  if (currentTheme === 'default') {
    document.body.classList.add('light');
    currentTheme = 'light';
  } else {
    document.body.classList.remove('light');
    currentTheme = 'default';
  }
}

// Init app on load
window.onload = initApp;
