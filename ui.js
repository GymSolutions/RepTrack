// ui.js
const appDiv = document.getElementById('app');

function renderLogin() {
  appDiv.innerHTML = `
    <div class="container fade">
      <h1>RepTrack Login</h1>
      <input type="email" id="email" placeholder="Email" required />
      <input type="password" id="password" placeholder="Password" required />
      <button onclick="handleSignUp()">Sign Up</button>
      <button onclick="handleLogin()">Log In</button>
    </div>`;
}

function renderSetup() {
  const equipmentHtml = Object.entries(EQUIPMENT).map(([section, items]) =>
    `<div class="equipment-section">
      <h3>${section.charAt(0).toUpperCase() + section.slice(1)}</h3>
      <div class="equipment-list">
        ${items.map(item => `<label><input type="checkbox" value="${item}">${item}</label>`).join('')}
      </div>
    </div>`).join('');
  
  appDiv.innerHTML = `
    <div class="container fade">
      <h2>Setup Your Profile</h2>
      <label>Weight (lbs): <input type="number" id="weight" /></label><br />
      <label>Height (inches): <input type="number" id="height" /></label><br />
      <label>Goal:
        <select id="goal">
          <option value="lose fat">Lose Fat</option>
          <option value="build muscle">Build Muscle</option>
          <option value="get stronger">Get Stronger</option>
        </select>
      </label>
      <h3>Select Available Equipment</h3>
      ${equipmentHtml}
      <button onclick="handleSetupComplete()">Save & Continue</button>
    </div>`;
}

function renderDashboard() {
  appDiv.innerHTML = `
    <div class="container fade">
      <h2>Welcome, ${currentUserEmail}</h2>
      <button onclick="handleLogout()">Logout</button>
      <button onclick="renderProfile()">Profile & Progress</button>
      <button onclick="renderWorkoutGenerator()">Generate Workout</button>
      <button onclick="renderAchievements()">Achievements</button>
      <button onclick="renderGroups()">Groups & Challenges</button>
      <button onclick="toggleTheme()">Toggle Theme</button>
      <div id="dynamic-content"></div>
    </div>`;
}

function renderWorkoutGenerator() {
  const dynamic = document.getElementById('dynamic-content');
  dynamic.innerHTML = `
    <h3>Generate Workout</h3>
    <label>Difficulty:
      <select id="difficulty">
        <option value="easy">Easy</option>
        <option value="medium" selected>Medium</option>
        <option value="hard">Hard</option>
      </select>
    </label>
    <button onclick="generateWorkout()">Generate</button>
    <div id="workout-result"></div>`;
}

function renderAchievements() {
  const dynamic = document.getElementById('dynamic-content');
  const userAch = getCurrentUser()?.achievements || [];
  const achHtml = ACHIEVEMENTS.map(a => {
    const unlocked = userAch.includes(a.id);
    return `<div style="margin:8px; padding:8px; border:1px solid ${unlocked ? '#39ff14' : '#444'}; border-radius:6px;">
      <strong>${a.title}</strong> ${unlocked ? '✅' : '❌'}<br/>
      <small>${a.desc}</small><br/>
      <em>Reward: ${a.reward}</em>
    </div>`;
  }).join('');
  dynamic.innerHTML = `<h3>Achievements</h3>${achHtml}`;
}

function renderGroups() {
  const dynamic = document.getElementById('dynamic-content');
  dynamic.innerHTML = `
    <h3>Groups & Challenges</h3>
    <p>Coming soon: Create/join groups, chat, compete!</p>`;
}

function renderProfile() {
  const user = getCurrentUser();
  const dynamic = document.getElementById('dynamic-content');
  dynamic.innerHTML = `
    <h3>Your Profile</h3>
    <p><strong>Weight:</strong> ${user.weight || 'Not set'}</p>
    <p><strong>Height:</strong> ${user.height || 'Not set'}</p>
    <p><strong>Goal:</strong> ${user.goal || 'Not set'}</p>
    <h4>Progress Photos</h4>
    <div id="photo-gallery">${(user.progressPhotos || []).map((p, i) =>
      `<img src="${p}" alt="Progress ${i+1}" style="max-width:100px; margin:5px; border-radius:6px;">`).join('')}</div>
    <input type="file" id="photo-upload" accept="image/*" onchange="uploadPhoto(event)" />
  `;
}
