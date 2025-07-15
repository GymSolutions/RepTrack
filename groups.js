function getGroupsDB() {
  return JSON.parse(localStorage.getItem('groupsDB') || '{}');
}

function saveGroupsDB(g) {
  localStorage.setItem('groupsDB', JSON.stringify(g));
}

function createGroup(name, desc) {
  if (!name) return 'Name required';
  const groups = getGroupsDB();
  if (groups[name]) return 'Group exists';
  const current = getCurrentUser();
  groups[name] = { id: name, description: desc || '', members: [current] };
  saveGroupsDB(groups);
  addUserGroup(name);
  return 'Created';
}

function joinGroup(name) {
  const groups = getGroupsDB();
  const g = groups[name];
  const current = getCurrentUser();
  if (!g) return 'Not found';
  if (!g.members.includes(current)) {
    g.members.push(current);
    saveGroupsDB(groups);
  }
  addUserGroup(name);
  return 'Joined';
}

function addUserGroup(name) {
  const users = getUsers();
  const cur = getCurrentUser();
  if (!users[cur].groups.includes(name)) {
    users[cur].groups.push(name);
    saveUsers(users);
  }
}

function getAllGroups() {
  return Object.values(getGroupsDB());
}
