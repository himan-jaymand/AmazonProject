export function Nav() {
  const nav = document.createElement("nav");
  nav.classList = "nav";
  nav.innerHTML = `
          <div>
              <img src="../assets/Images/icon/menu_icon.png" alt="" width="25px">
              <p>All</p>
       </div>
       <div class="contury">
          <ul>
               <a>Today's Deals</a>
               <a>Customer Servive</a>
               <a>Registry</a>
               <a>Gift Cards</a>
               <a>Sell</a>
          </ul>
       </div>

    `;
  return nav;
}
