import { AuthService } from "../../../services/Auth.service.js";

export default function RegisterView() {
  const rigester = document.createElement("div");
  rigester.classList = "form";
  rigester.innerHTML = `
   <form action="">
      <div class="container-form">
        <div class="header-form">
          <img src="/assets/Images/icon/amazon_logo.png" alt="logo" />
          <p>Create account</p>
        </div>
        <div class="name">
          <label for="ame">Your name</label>
          <input type="text" id="name" />
        </div>

        <div class="username">
          <label for="lastname">LastName</label>
          <input type="text" id="lastname" />
        </div>

        <div class="birthday">
          <label for="BirthDay">BirthDay</label>
          <input type="date" id="BirthDay" />
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
  const form = rigester.querySelector("form");
  form &&
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = rigester.querySelector("#name")?.value || "";
      const lastname = rigester.querySelector("#lastname")?.value || "";
      const birthday = rigester.querySelector("#BirthDay")?.value || "";
      const password = rigester.querySelector("#password")?.value || "";
      const email = rigester.querySelector("#email")?.value || "";

      try {
        const res = await AuthService.register({
          name,
          lastname,
          birthday,
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

  return rigester;
}
