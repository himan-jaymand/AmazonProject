import { DrawerNav } from "./DrawerNav.js";
export function Nav() {
  const nav = document.createElement("nav");
  nav.classList = "nav";
  nav.innerHTML = `
          <div class="toggleDrawer-btn">
          <button id="all-btn">
          <img src="../assets/Images/icon/menu_icon.png" alt="" width="25px">All
              </button>
       </div>
       <div class="nav-links">
            <ul>
              <li><a href="#/home">Home</a></li>
              <li><a href="#/deals">Today's Deals</a></li>
              <li><a href="#/customer-service">Customer Service</a></li>  
              <li><a href="#/registry">Registry</a></li>
              <li><a href="#/gift-cards">Gift Cards</a></li>
              <li><a href="#/sell">Sell</a></li>
            </ul>
       </div>

       `;
       const drawerNav = DrawerNav();
        document.body.appendChild(drawerNav);
      // open drawer on clicking all menu button
      const allMenuBtn = nav.querySelector("#all-btn");
      allMenuBtn.addEventListener("click", () => {
        const drawer = document.getElementById("side-drawer");  
        drawer.classList.add("active");
      });
      const closeBtn = drawerNav.querySelector(".close-btn-wrapper");    
      closeBtn.addEventListener("click", () => {
        const drawer = document.getElementById("side-drawer");  
        drawer.classList.remove("active");
      });
 
  return nav;
}