'use srtict';
//импорт ф-ции проверки webP
import * as flsFunctions from "./modules/functions.js";


//импорт функций из node_modules
//import '../../node_modules/swiper/swiper-bundle.js';
import '../../node_modules/focus-visible/dist/focus-visible.min.js';

window.addEventListener('DOMContentLoaded', function () {
  //---ф-ция WebP
  flsFunctions.isWebp();

  //---прибивка футера к низу на мобильных(убираем влияние верхней панели)
  flsFunctions.windowHeight();

  window.addEventListener('resize', () => {
    flsFunctions.windowHeight();
  });

  





});