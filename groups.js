// groups.js

function getCurrentUser() {
  const email = localStorage.getItem('currentUser');
  if (!email) return null;
  const users = JSON.parse(localStorage.getItem('reptrackUsers') || '{}');
  return users[email] || null;
}

function updateCurrentUser(data) {
  const email = localStorage.getItem('currentUser');
  if (!email) return;
  const users = JSON.parse(localStorage.getItem('reptrackUsers') || '{}');
  users[email] = { ...users[email], ...data };
  localStorage.setItem('reptrackUsers', JSON.stringify(users));
}

function createGroup(name, desc) {
  if (!name) return 'Group name required.';
  const user = getCurrentUser();
  if (!user) return 'User not logged in.';

  const groupsDB = JSON.parse(localStorage.getItem('groupsDB') || '{}');

  if (groupsDB[name]) return 'Group name already exists.';

  groupsDB[name] = {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    description: desc || '',
    members: [localStorage.getItem('currentUser')]
  };

  localStorage.setItem('groupsDB', JSON.stringify(groupsDB));

  user.groups = user.groups || [];
  if (!user.groups.includes(name)) {
    user.groups.push(name);
    updateCurrentUser({ groups: user.groups });
  }

  return 'Group created successfully!';
}

function joinGroup(name) {
  const user = getCurrentUser();
  if (!user) return 'User not logged in.';

  const groupsDB = JSON.parse(localStorage.getItem('groupsDB') || '{}');
  const group = groupsDB[name];
  if (!group) return 'Group not found.';

  if (!group.members.includes(localStorage.getItem('currentUser'))) {
    group.members.push(localStorage.getItem('currentUser'));
    groupsDB[name] = group;
    localStorage.setItem('groupsDB', JSON.stringify(groupsDB));
  }

  user.groups = user.groups || [];
  if (!user.groups.includes(name)) {
    user.groups.push(name);
    updateCurrentUser({ groups: user.groups });
  }

  return 'Joined group successfully!';
}

function getGroupsList() {
  return JSON.parse(localStorage.getItem('groupsDB') || '{}');
}

function getUserGroups() {
  const user = getCurrentUser();
  return user?.groups || [];
}
