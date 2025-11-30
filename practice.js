document.addEventListener("DOMContentLoaded", () => {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const $ = id => document.getElementById(id);

  /* -------- SIGNUP -------- */
  if ($("signupBtn")) {
    $("signupBtn").addEventListener("click", () => {
      const name = $("signupName").value.trim();
      const email = $("signupEmail").value.trim();
      const password = $("signupPassword").value.trim();

      if (!name || !email || !password) {
        $("signupOutput").innerText = "All fields required";
        return;
      }

      if (users.find(u => u.email === email)) {
        $("signupOutput").innerText = "Email already registered";
        return;
      }

      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      $("signupOutput").innerText = "Account created successfully!";
      setTimeout(() => window.location.href = "login.html", 1000);
    });
  }

  /* -------- LOGIN -------- */
  if ($("loginBtn")) {
    $("loginBtn").addEventListener("click", () => {
      const email = $("loginEmail").value.trim();
      const password = $("loginPassword").value.trim();

      if (!email || !password) {
        $("loginOutput").innerText = "All fields required";
        return;
      }

      users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(u => u.email === email);

      if (!user) {
        $("loginOutput").innerText = "Email not found";
        return;
      }

      if (user.password !== password) {
        $("loginOutput").innerText = "Incorrect password";
        return;
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      $("loginOutput").innerText = "Login successful!";
      setTimeout(() => window.location.href = "index.html", 800);
    });
  }

  /* -------- ACCOUNT HEADER -------- */
  const accountBox = document.getElementById("accountSection");
  if (accountBox) {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const title = document.getElementById("accTitle");
    const action = document.getElementById("accAction");

    if (user) {
      title.innerText = "Account";
      action.innerText = `Hello, ${user.name}`;
      accountBox.onclick = () => alert("Your account page coming soon!");
    } else {
      title.innerText = "Account";
      action.innerText = "Login | Sign Up";
      accountBox.onclick = () => {
        const choice = confirm("Press OK to Login.\nPress Cancel to Sign Up.");
        if (choice) window.location.href = "login.html";
        else window.location.href = "signup.html";
      };
    }
  }
});
