
//функция добавления класса Webp 
export function isWebp() {
    function testWebp(callback){
        let webP = new Image();
        webP.onload = webP.onerror = function (){
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    testWebp(function(support){
        if(support==true){
            document.querySelector('html').classList.add('webp');
        }else{
            document.querySelector('html').classList.add('no-webp');
        }
    });
}


//прибивка футера к низу на мобильных(убираем влияние верхней панели)
export const windowHeight = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };