// auth.js
const usersDB = JSON.parse(localStorage.getItem('usersDB') || '{}');
let currentUserEmail = null;

function signUp(email, password) {
  if (!email || !password) return 'Please fill all fields.';
  if (usersDB[email]) return 'User already exists.';
  usersDB[email] = { 
    password, 
    achievements: [], 
    progressPhotos: [], 
    workouts: [], 
    moodLog: [], 
    groups: [],
    weight: null,
    height: null,
    goal: null,
    equipment: []
  };
  saveDB();
  currentUserEmail = email;
  return 'Sign up successful! Please complete your profile.';
}

function login(email, password) {
  if (!usersDB[email]) return 'User not found.';
  if (usersDB[email].password !== password) return 'Incorrect password.';
  currentUserEmail = email;
  return 'Login successful';
}

function logout() {
  currentUserEmail = null;
}

function saveDB() {
  localStorage.setItem('usersDB', JSON.stringify(usersDB));
}

function getCurrentUser() {
  if (!currentUserEmail) return null;
  return usersDB[currentUserEmail];
}

function updateCurrentUser(data) {
  if (!currentUserEmail) return;
  usersDB[currentUserEmail] = {...usersDB[currentUserEmail], ...data};
  saveDB();
}
