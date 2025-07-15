const usersKey = 'reptrackUsers';
const currentUserKey = 'currentUser';

function getUsers() {
  return JSON.parse(localStorage.getItem(usersKey) || '{}');
}

function saveUsers(u) {
  localStorage.setItem(usersKey, JSON.stringify(u));
}

function signUp(email, password) {
  const users = getUsers();
  if (users[email]) return { success: false, message: 'User exists' };
  users[email] = { password, achievements: [], progressPhotos: [], workouts: [], moodLog: [], groups: [], weight: null, height: null, goal: null, equipment: [] };
  saveUsers(users);
  localStorage.setItem(currentUserKey, email);
  return { success: true };
}

function login(email, password) {
  const u = getUsers();
  if (u[email] && u[email].password === password) {
    localStorage.setItem(currentUserKey, email);
    return { success: true };
  }
  return { success: false, message: 'Invalid credentials' };
}

function logout() {
  localStorage.removeItem(currentUserKey);
}

function getCurrentUser() {
  return localStorage.getItem(currentUserKey);
}
