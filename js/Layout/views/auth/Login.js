import { AuthService } from "../../../services/Auth.service.js";

export default function Login() {
  const login = document.createElement("div");
  login.classList = "form";
  login.innerHTML = ` 
    <form action="">
  <div class="container-form">
  <div class="header-form">
    <img src="/assets/Images/icon/amazon_logo.png" alt="logo" />
    <p>Wellcome<p />
  </div>

      <div class="email">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="Email" />
      </div>

        <div class="pass">
          <label for="password">Password (at least 6 characters)</label>
          <input type="password" id="password" placeholder="Password" />
        </div>

        <button type="submit">Verify email</button>
        <div class="bottom-section">
          <p>
            Create a free business account
            <a href="#/register" id="show-login"> Sign up</a>
          </p>
          <p>
          By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
          </p>
        </div>
      </div>
    </form>
     `;
  // attach submit handler
  const form = login.querySelector("form");
  form &&
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = login.querySelector("#email")?.value || "";
      const password = login.querySelector("#password")?.value || "";
      try {
        const res = await AuthService.login({ email, password });
        console.log("Login success", res);
        window.location.hash = "#/";
      } catch (err) {
        console.error("Login failed", err);
        alert(err.message || "Login failed");
      }
    });

  return login;
}
