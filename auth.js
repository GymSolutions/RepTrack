const usersKey = 'reptrackUsers';
const currentUserKey = 'currentUser';

function getUsers() { return JSON.parse(localStorage.getItem(usersKey) || '{}'); }
function saveUsers(u) { localStorage.setItem(usersKey, JSON.stringify(u)); }

function signUp(email, pw) {
  const u = getUsers();
  if (u[email]) return { success: false, message: 'User already exists' };
  u[email] = { password: pw, streak: 0, lastWorkout: null, groups: [], weight: null, height: null, goal: null, equipment: [] };
  saveUsers(u);
  localStorage.setItem(currentUserKey, email);
  return { success: true };
}

function login(email, pw) {
  const u = getUsers();
  if (u[email] && u[email].password === pw) {
    localStorage.setItem(currentUserKey, email);
    return { success: true };
  }
  return { success: false, message: 'Invalid credentials' };
}

function logout() { localStorage.removeItem(currentUserKey); }
function getCurrentUser() { return localStorage.getItem(currentUserKey); }
