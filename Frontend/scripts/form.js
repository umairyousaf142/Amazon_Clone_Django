let isLogin = true;

function toggleForm() {
  const formTitle = document.getElementById('form-title');
  const nameFields = document.getElementById('name-fields');
  const toggleText = document.querySelector('.toggle-text');

  isLogin = !isLogin;

  if (isLogin) {
    formTitle.textContent = 'Login';
    nameFields.style.display = 'none';
    toggleText.innerHTML = `Don’t have an account? <span class="toggle-link" onclick="toggleForm()">Sign up</span>`;
  } else {
    formTitle.textContent = 'Sign Up';
    nameFields.style.display = 'block';
    toggleText.innerHTML = `Already have an account? <span class="toggle-link" onclick="toggleForm()">Log in</span>`;
  }
}

async function submitForm() {
  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password || (!isLogin && (!firstName || !lastName))) {
    alert('Please fill in all required fields.');
    return;
  }

  const endpoint = isLogin
    ? 'http://127.0.0.1:8000/api/login/'
    : 'http://127.0.0.1:8000/api/register/';

  const payload = isLogin
    ? { email, password }
    : { first_name: firstName, last_name: lastName, email, password };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || data.message || 'Something went wrong');
    }

    // if (isLogin) {
    //   alert(`Login successful. Welcome, ${data.user?.first_name || email}!`);
    // } else {
    //   alert(`Signup successful. Welcome, ${data.user?.first_name || firstName}!`);
    //   toggleForm(); 
    // }

    if (isLogin) {
    // ✅ Store tokens returned from backend
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);
    localStorage.setItem('isLoggedIn', 'true');

    alert(`Login successful. Welcome, ${data.user?.first_name || email}!`);
    window.location.href = 'amazon.html'; // redirect to homepage
  } else {
    alert(`Signup successful. Welcome, ${data.user?.first_name || firstName}!`);
    toggleForm();
  }
  } catch (error) {
    console.error('Error occurred:', error); 
    alert(`Error: ${error.message}`);
  }
}
