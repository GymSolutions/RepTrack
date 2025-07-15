// groups.js

// Simple group data saved inside usersDB
// Each group: { id, name, members: [emails], description }

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
    members: [currentUserEmail]
  };

  localStorage.setItem('groupsDB', JSON.stringify(groupsDB));

  // Add group to user groups
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

  if (!group.members.includes(currentUserEmail)) {
    group.members.push(currentUserEmail);
    groupsDB[name] = group;
    localStorage.setItem('groupsDB', JSON.stringify(groupsDB));
  }

  // Add group to user groups
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
