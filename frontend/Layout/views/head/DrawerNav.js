export function DrawerNav() {
  const draver = document.createElement("div");
  draver.id = "side-drawer";
  draver.classList = "drawer";
  draver.innerHTML = `

    <div class="drawer-content">
    <section class="head-side-menu">
    <img src="../assets/Images/icon/user.png" alt="" width="25px">
       <p>Hello,</p>
       <p>sign in</p>
    </section>
       <section class="trending">
           <h4>Trending</h4>
        <ul>
            <li><a href="#/home">Best Sellers</a></li>
            <li><a href="#/deals">New Releases</a></li>
            <li><a href="#/customer-service">Movers & Shakers</a></li>
        </ul>
     </section>
     <hr>
     <section class="digital-content">
        <h4>Digital Content And Devices</h4>
        <ul>    
            <li><a href="#/digital-content">Kindle E-readers & Books</a></li>
            <li><a href="#/digital-content">Software</a></li>
            <li><a href="#/digital-content">Apps & Games</a></li>
        </ul>
     </section>
     <hr>

       <section class="shop-by-department">
           <h4>Shop By Department</h4>
         <ul>    
             <li><a href="#/shop-by-department">Electronics</a></li>
             <li><a href="#/shop-by-department">Computers</a></li>
             <li><a href="#/shop-by-department">Smart Home</a></li>
         </ul>
     </section>
     <hr>

             <section class="Programs & Features">
               <h4>Programs & Features</h4>
          <ul>    
              <li><a href="#/programs-features">Amazon Business</a></li>
              <li><a href="#/programs-features">Amazon Prime</a></li>
              <li><a href="#/programs-features">Amazon Web Services</a></li>
          </ul>
             </section>
     <hr>

           <section class="help & settings">
               <h4>Help & Settings</h4>
            <ul>
                <li><a href="#/help-settings">Help Center</a></li>
                <li><a href="#/help-settings">Your Orders</a></li>
                <li><a href="#/help-settings">Your Account</a></li>
            </ul>
        </section>  
        </div>
        </div>
        <div class="close-btn-wrapper">
        <button class="close-btn">&times;</button>
        </div>
    `;
  // close drawer on clicking close button

  return draver;
}
