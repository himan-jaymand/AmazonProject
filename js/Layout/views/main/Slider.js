export function Slider() {
  const slider = document.createElement("div");
  slider.className = "slider";

  slider.innerHTML = `
            <div class="slider-container">
            <div class="button-slider">
                 <button class="liquid-button"><i class='bx  bx-chevron-left bx-lg'></i> </button>
                 <button class="liquid-button next"><i class='bx  bx-chevron-right bx-lg'></i></button>
             </div>
             
             <ul>
             <img src="../assets/Images/sliderShow/51J6OzC0jpL._SX1500_.jpg" alt="" class="header-img">
             <img src="../assets/Images/sliderShow/51YLFBV0y8L._SX1500_.jpg" alt="" class="header-img">
             <img src="../assets/Images/sliderShow/61em8TnDk1L._SX1500_.jpg" alt="" class="header-img">
             <img src="../assets/Images/sliderShow/61TSnI7zOcL._SX1500_.jpg" alt="" class="header-img">
             <img src="../assets/Images/sliderShow/imgi_2_61Re5OXswrL._SX3000_.jpg" alt="" class="header-img">
             <img src="../assets/Images/sliderShow/imgi_3_71CYld85lDL._SX3000_.jpg" alt="" class="header-img">
             <img src="../assets/Images/sliderShow/imgi_4_81ih8RldNXL._SX3000_.jpg" alt="" class="header-img">
             <img src="../assets/Images/sliderShow/imgi_8_81ZxDRLSIoL._SX3000_.jpg" alt="" class="header-img">
             <img src="../assets/Images/sliderShow/imgi_219_613haBOa+GL._SR3000,600_.jpg" alt="" class="header-img">
             
             </ul>
             </div>
      
`;
  return slider;
}
