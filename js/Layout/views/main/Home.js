export function Home(data) {
    const productData ={
        id : 1,
        title:"",
        imagePath : [
              "../assets/Images/tech & gaming/imgi_27_HOL25-Peak_10623_HP_DQC_Gifting_Toys_V1_2x_372x232._SY232_CB797242024_.jpg",
              "../assets/Images/kitchen/imgi_28_HOL25-Peak_10619_HP_DQC_Gifting_Home-Kitchen_V1_2x_372x232._SY232_CB797242024_.jpg",
              "../assets/Images/tech & gaming/imgi_29_HOL25-Peak_10624_HP_DQC_Gifting_Electronics_V2._SY232_CB797614722_.jpg",
              "../assets/Images/drees/imgi_30_HOL25-Peak_10625_HP_DQC_Gifting_FitnessFashion_V2._SY232_CB797614722_.jpg"
        ]    
    }

    const imageList = 
    data && Array.isArray(data.imagePath)
    ?  data.imagePath
    : productData.imagePath;


    const imagesHtml =imageList.map((path) =>   `
    
        <img 
         src="${path}"  
         alt="${
            (data && data.title) || productData.title
         }" 
         class="" 
        />    
    `) .join("");

  const home = document.createElement("div");
  home.classList = "home";
  home.innerHTML = `
         <div class="container">

        <div class="box-gird">
              <h3>Shop gifts by category</h3>
               <div class="card-line">
               <a href="#/product">
               ${imagesHtml}
               </a>
               </div>
                 <a href="">See more</a>
              </div>
            

          <div class="box-gird">
              <h3>Shop gifts by category</h3>
               <div class="card-line">
                 <a href="#/product">
               ${imagesHtml}
               </a>
               </div>
                 <a href="#/product">See more</a>
              </div>
            

       <div class="box-gird">
              <h3>Shop gifts by category</h3>
               <div class="card-line">
                  <a href="#/product">
               ${imagesHtml}
               </a>
               </div>
                 <a href="#/product">See more</a>
              </div>
            

        <div class="box-gird">
              <h3>Shop gifts by category</h3>
               <div class="card-line">
                 <a href="#/product">
               ${imagesHtml}
               </a>
               </div>
                 <a href="#/product">See more</a>
              </div>
            
     </div>

            <div class="container">
            <div class="box-gird">
              <h3>Shop gifts by category</h3>
               <div class="card-line">
                    <a href="#/product">
               ${imagesHtml}
               </a>
               </div>
                 <a href="#/product">See more</a>
              </div>
       <div class="box-gird">
              <h3>Shop gifts by category</h3>
               <div class="card-line">
                    <a href="#/product">
               ${imagesHtml}
               </a>
               </div>
                 <a href="#/product">See more</a>
              </div>
            
           <div class="box-gird">
              <h3>Shop gifts by category</h3>
               <div class="card-line">
                    <a href="#/product">
               ${imagesHtml}
               </a>
               </div>
                 <a href="#/product">See more</a>
              </div>
            
          <div class="box-gird">
              <h3>Shop gifts by category</h3>
               <div class="card-line">
                  <a href="#/product">
               ${imagesHtml}
               </a>
               </div>
                 <a href="#/product">See more</a>
              </div>
            
        </div>

`;
  return home;
}

//          <div class="row-one">
//         <div class="box-gird">
//             <h3>Gaming accessories</h3>
//             <div class="card-line">
//             <div><img src="/assets/Images/Backpack_2.jpg" alt=""></div>
//             <div><img src="/assets/Images/TravelBag_2.jpg" alt=""></div>
//             <div><img src="assets/Images/Accessories_2.jpg" alt=""></div>
//             <div><img src="/assets/Images/Handbags_2.jpg" alt=""></div>
//             </div>
//             <a href="#">See more</a>
//         </div>

// <div class="box-gird">
//     <h3>New home arrivals under $50</h3>
//     <div class="card-line">
//             <div><img src="/assets/Backpack_2.jpg" alt=""></div>
//             <div><img src="/assets/Images/TravelBag_2.jpg" alt=""></div>
//             <div><img src="assets/Images/Accessories_2.jpg" alt=""></div>
//             <div><img src="/assets/Images/Handbags_2.jpg" alt=""></div>
//     </div>
//     <a href="#">Shop the lastest Home</a>
// </div>

// <div class="box-gird">
//     <h3>Shop deals in Fashion</h3>
//     <div class="card-line">
//          <div><img src="/assets/Images/Backpack_2.jpg" alt=""></div>
//             <div><img src="/assets/Images/TravelBag_2.jpg" alt=""></div>
//             <div><img src="assets/Images/Accessories_2.jpg" alt=""></div>
//             <div><img src="/assets/Images/Handbags_2.jpg" alt=""></div>
//     </div>
//     <a href="#">See all details</a>
// </div>

//     <div class="box-gird">
//         <h3>Refresh your space</h3>
//         <div class="card-line">
//             <div><img src="/assets/Images/Backpack_2.jpg" alt=""></div>
//             <div><img src="/assets/Images/TravelBag_2.jpg" alt=""></div>
//             <div><img src="assets/Images/Accessories_2.jpg" alt=""></div>
//             <div><img src="/assets/Images/Handbags_2.jpg" alt=""></div>
//         </div>
//         <a href="#">See more</a>
//     </div>
//      export const HEADER_HTML =
//      `

//      `
