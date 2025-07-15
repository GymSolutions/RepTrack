function renderGroups() {
  const dynamic = document.getElementById('dynamic-content');
  const groupsDB = getGroupsList();
  const userGroups = getUserGroups();

  let groupsHtml = Object.values(groupsDB).map(g => {
    const isMember = userGroups.includes(g.name);
    return `
      <div style="border:1px solid #444; margin:10px; padding:10px; border-radius:6px;">
        <h4>${g.name}</h4>
        <p>${g.description || ''}</p>
        <p>Members: ${g.members.length}</p>
        <button ${isMember ? 'disabled' : `onclick="joinGroupUI('${g.name}')"`}>${isMember ? 'Member' : 'Join'}</button>
      </div>
    `;
  }).join('');

  dynamic.innerHTML = `
    <h3>Groups & Challenges</h3>
    <div>
      <input type="text" id="newGroupName" placeholder="New group name" />
      <input type="text" id="newGroupDesc" placeholder="Description (optional)" />
      <button onclick="createGroupUI()">Create Group</button>
    </div>
    <div>${groupsHtml || 'No groups yet. Create one!'}</div>
  `;
}
