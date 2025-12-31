export function SingleBox() {
  const singleBox = document.createElement("div");
  singleBox.classList = "sianglebox";
  singleBox.innerHTML = `
            <div class="contain ">
                <h3>Get 3 months FREE</h3>
                <div class="productImages">
                    <div><img src="/assets/Images/tech & gaming/imgi_84_US-EN_101725_HOL25_GW_CatCard_D_2x_758x608._SY608_CB779144555_.jpg" alt="3 months free subscription offer"><h6>Premium Subscription</h6></div>
                </div>
                <a href="#">See more</a>
            </div>

            <div class="contain ">
                <h3>Shop deals in Fashion</h3>
                <div class="productImages">
                    <div><img src="/assets/Images/tech & gaming/imgi_36_Gifting_GW_Single_Category_card-758x608._SY608_CB776025639_.jpg" alt="Fashion deals and special offers"><h6>Fashion & Apparel</h6></div>
                </div>
                <a href="#">See more</a>
            </div>

            <div class="contain ">
                <h3>Refresh your space</h3>
                <div class="productImages">
                   <div><img src="/assets/Images/tech & gaming/imgi_307_CyberMonday25-HP-SingleCard-D-Persimmon-Circle2x-v2._SY608_CB779557064_.jpg" alt="Home decor and furniture to refresh your space"><h6>Home & Furniture</h6></div>
                </div>
                <a href="#">See more</a>
            </div>

            <div class="contain ">
                <h3>New home arrivals under $50</h3>
                <div class="productImages">
                    <div><img src="/assets/Images/tech & gaming/imgi_104_LAZU_S1_DashboardCard_758x608_POST_Final_noLocale_PV00047252._SY608_CB799903168_.jpg" alt="New home products available for under $50"><h6>Budget Home Finds</h6></div>
                </div>
                <a href="#">Shop the latest Home</a>
            </div>


`;
  return singleBox;
}
