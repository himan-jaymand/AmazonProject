import { AuthService } from "../../../services/Auth.service.js";

export default function RegisterView(params, store) {
  const register = document.createElement("div");
  register.classList = "form";
  register.innerHTML = `
   <form action="">
      <div class="container-form">
        <div class="header-form">
          <img src="/assets/Images/icon/amazon_logo.png" alt="logo" />
          <p>Create account</p>
        </div>
        <div class="name">
          <label for="name">Your name</label>
          <input type="text" id="name" />
        </div>
        <div class="username">
          <label for="lastname">LastName</label>
          <input type="text" id="lastname" />
        </div>

        <div class="pass">
          <label for="password">Password (at least 6 characters)</label>
          <input type="password" id="password" />
        </div>

        <div class="email">
          <label for="email">Enter mobile number or email</label>
          <input type="email" id="email" placeholder="enter your email" />
        </div>
        <button type="submit">Verify email</button>
        <div class="bottom-section">
          <p>
            Already have an account?
            <a href="#/login" id="show-login"> Sign in instead </a>
          </p>
          <p>
            By creating an account, you agree to Amazon's Conditions of Use and
            Privacy Notice.
          </p>
        </div>
      </div>
    </form>
  `;
  // attach form submit handler
  const form = register.querySelector("form");
  form &&
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = register.querySelector("#name")?.value || "";
      const lastname = register.querySelector("#lastname")?.value || "";
      const birthday = register.querySelector("#BirthDay")?.value || "";
      const password = register.querySelector("#password")?.value || "";
      const email = register.querySelector("#email")?.value || "";

      try {
        const res = await AuthService.register({
          name,
          lastname,
          email,
          password,
        });
        console.log("Register success", res);
        // on success, navigate to home or show verification
        window.location.hash = "#/login";
      } catch (err) {
        console.error("Register failed", err);
        alert(err.message || "Registration failed");
      }
    });

  return register;
}
