// SHOW / HIDE PASSWORD

const passwordButtons = document.querySelectorAll(".show-password");

passwordButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.target);

    if (target.type === "password") {
      target.type = "text";

      button.textContent = "Hide";
    } else {
      target.type = "password";

      button.textContent = "Show";
    }
  });
});

// SIGN UP

const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("signupUsername").value.trim();

    const email = document.getElementById("signupEmail").value.trim();

    const password = document.getElementById("signupPassword").value;

    const confirmPassword = document.getElementById("confirmPassword").value;

    const message = document.getElementById("signupMessage");

    // CHECK PASSWORDS

    if (password !== confirmPassword) {
      message.textContent = "Passwords do not match.";

      message.style.color = "#d64545";

      return;
    }

    // CHECK PASSWORD LENGTH

    if (password.length < 6) {
      message.textContent = "Password must be at least 6 characters.";

      message.style.color = "#d64545";

      return;
    }

    // CREATE USER OBJECT

    const user = {
      username: username,

      email: email,

      password: password,
    };

    // SAVE USER

    localStorage.setItem("resultResolveUser", JSON.stringify(user));

    message.textContent = "Account created successfully!";

    message.style.color = "#1f9d68";

    // SEND USER TO LOGIN

    setTimeout(() => {
      window.location.href = "student.html";
    }, 1000);
  });
}

// LOGIN

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const role = document.getElementById("loginRole").value;

    const email = document.getElementById("loginEmail").value.trim();

    const password = document.getElementById("loginPassword").value;

    const message = document.getElementById("loginMessage");

    // MAKE SURE ROLE IS SELECTED

    if (!role) {
      message.textContent = "Please select your account type.";

      message.style.color = "#d64545";

      return;
    }

    // GET SAVED USER

    const savedUser = JSON.parse(localStorage.getItem("resultResolveUser"));

    if (!savedUser) {
      message.textContent = "Account not found. Please sign up first.";

      message.style.color = "#d64545";

      return;
    }

    // CHECK EMAIL AND PASSWORD

    if (email !== savedUser.email || password !== savedUser.password) {
      message.textContent = "Incorrect email or password.";

      message.style.color = "#d64545";

      return;
    }

    // SAVE LOGIN STATUS

    localStorage.setItem("resultResolveLoggedIn", "true");

    localStorage.setItem("resultResolveRole", role);

    // GO TO CORRECT PAGE

    if (role === "student") {
      window.location.href = "student.html";
    }

    if (role === "administrator") {
      window.location.href = "hod-dashboard.html";
    }
  });
}
// STUDENT PAGE
const studentUsername = document.getElementById("studentUsername");

if (studentUsername) {
  const savedUser = JSON.parse(localStorage.getItem("resultResolveUser"));

  if (savedUser) {
    studentUsername.textContent = savedUser.username;
  }
}

// LOGOUT

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("resultResolveLoggedIn");

    localStorage.removeItem("resultResolveRole");

    window.location.href = "index.html";
  });
}
