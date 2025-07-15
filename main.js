function handleLogin() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const msg = login(email, password);
  if (msg === 'Login successful') {
    const user = getCurrentUser();
    if (!user.weight || !user.height || !user.goal || !user.equipment) {
      renderSetup();
    } else {
      renderDashboard();
    }
  } else {
    alert(msg);
  }
}

function handleSignUp() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const msg = signUp(email, password);
  alert(msg);
  if (msg.startsWith('Sign up')) {
    // after sign up, immediately render setup page to complete profile
    currentUserEmail = email;  // Set current user so setup can save data
    renderSetup();
  }
}
