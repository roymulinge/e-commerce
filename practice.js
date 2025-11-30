

document.addEventListener("DOMContentLoaded", () => {
  
  let users = JSON.parse(localStorage.getItem("users")) || [];

  
  const $ = id => document.getElementById(id);

  // --- SIGNUP
  const signupBtn = $("signupBtn");
  if (signupBtn) {
    signupBtn.addEventListener("click", () => {
      const name = $("signupName").value.trim();
      const email = $("signupEmail").value.trim();
      const password = $("signupPassword").value.trim();

      if (name === "" || email === "" || password === "") {
        $("signupOutput").innerText = "All fields required";
        return;
      }

      const exists = users.find(user => user.email === email);
      if (exists) {
        $("signupOutput").innerText = "Email already registered";
        return;
      }

      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      $("signupOutput").innerText = "Account created successfully!";
    });
  }

  // --- CONTACT 
  const sendBtn = $("sendBtn");
  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      const name = $("name").value.trim();
      const email = $("email").value.trim();
      const message = $("message").value.trim();

      if (name === "" || email === "" || message === "") {
        $("output").innerText = "All fields are required";
        return;
      }

      const contact = { name, email, message };
      localStorage.setItem("contactData", JSON.stringify(contact));

      const saved = JSON.parse(localStorage.getItem("contactData"));
      $("output").innerText = `
Name: ${saved.name}
Email: ${saved.email}
Message: ${saved.message}
      `;
    });
  }

  // --- LOGIN
  const loginBtn = $("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const email = $("loginEmail").value.trim();
      const password = $("loginPassword").value.trim();

      if (email === "" || password === "") {
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

      $("loginOutput").innerText = "Login successful!";
      //  save logged in user
      localStorage.setItem("loggedInUser", JSON.stringify({ email: user.email, name: user.name }));
    });
  }

  
});
