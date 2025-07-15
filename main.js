// main.js

// USERS & AUTH (simplified)

const usersKey = 'reptrackUsers';

function signUp() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  const users = JSON.parse(localStorage.getItem(usersKey) || '{}');
  if (users[email]) {
    alert("User already exists!");
    return;
  }
  users[email] = { password };
  localStorage.setItem(usersKey, JSON.stringify(users));
  alert("Signed up successfully!");
  login();
}

function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem(usersKey) || '{}');
  if (users[email] && users[email].password === password) {
    localStorage.setItem('currentUser', email);
    currentUser = email;

    document.getElementById("auth").classList.add("hidden");

    // Check if user has setup info
    const savedWeight = localStorage.getItem(`${email}-weight`);
    const savedGoal = localStorage.getItem(`${email}-goal`);
    const savedHeight = localStorage.getItem(`${email}-height`);
    if (savedWeight && savedGoal && savedHeight) {
      document.getElementById("main").classList.remove("hidden");
      renderDashboard();
      generateAIPlan(savedWeight, savedGoal, savedHeight);
    } else {
      document.getElementById("setup").classList.remove("hidden");
    }
  } else {
    alert("Invalid login");
  }
}

function logout() {
  localStorage.removeItem('currentUser');
  currentUser = null;
  document.getElementById("auth").classList.remove("hidden");
  document.getElementById("setup").classList.add("hidden");
  document.getElementById("main").classList.add("hidden");
  document.getElementById('dynamic-content').innerHTML = '';
}

function submitUserInfo() {
  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value;
  const goal = document.getElementById("goal").value;

  if (!weight || !height) {
    alert("Please enter weight and height.");
    return;
  }

  const selectedEquipment = [...document.querySelectorAll('.equipment-selector input:checked')].map(el => el.value);

  localStorage.setItem(`${currentUser}-weight`, weight);
  localStorage.setItem(`${currentUser}-height`, height);
  localStorage.setItem(`${currentUser}-goal`, goal);
  localStorage.setItem(`${currentUser}-equipment`, JSON.stringify(selectedEquipment));

  document.getElementById("setup").classList.add("hidden");
  document.getElementById("main").classList.remove("hidden");
  renderDashboard();
  generateAIPlan(weight, goal, height);
}

// GROUP UI handlers

function createGroupUI() {
  const name = document.getElementById('newGroupName').value.trim();
  const desc = document.getElementById('newGroupDesc').value.trim();
  if (!name) {
    alert('Please enter a group name.');
    return;
  }
  const msg = createGroup(name, desc);
  alert(msg);
  renderGroups();
}

function joinGroupUI(name) {
  const msg = joinGroup(name);
  alert(msg);
  renderGroups();
}
