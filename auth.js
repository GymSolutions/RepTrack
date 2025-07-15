// auth.js

const usersKey = 'reptrackUsers';
const currentUserKey = 'currentUser';

function getUsers() {
  return JSON.parse(localStorage.getItem(usersKey) || '{}');
}

function saveUsers(users) {
  localStorage.setItem(usersKey, JSON.stringify(users));
}

function signUp(email, password) {
  const users = getUsers();
  if (users[email]) {
    return { success: false, message: 'User already exists!' };
  }
  users[email] = { password };
  saveUsers(users);
  localStorage.setItem(currentUserKey, email);
  return { success: true };
}

function login(email, password) {
  const users = getUsers();
  if (users[email] && users[email].password === password) {
    localStorage.setItem(currentUserKey, email);
    return { success: true };
  }
  return { success: false, message: 'Invalid email or password' };
}

function logout() {
  localStorage.removeItem(currentUserKey);
}

function getCurrentUser() {
  return localStorage.getItem(currentUserKey);
}
