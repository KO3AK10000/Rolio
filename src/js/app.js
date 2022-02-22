'use srtict';
//импорт ф-ции проверки webP
import * as flsFunctions from "./modules/functions.js";


//импорт функций из node_modules
import '../../node_modules/swiper/swiper-bundle.js';
import '../../node_modules/focus-visible/dist/focus-visible.min.js';

window.addEventListener('DOMContentLoaded', function () {
  //---ф-ция WebP
  flsFunctions.isWebp();

  //---прибивка футера к низу на мобильных(убираем влияние верхней панели)
  flsFunctions.windowHeight();

  window.addEventListener('resize', () => {
    flsFunctions.windowHeight();
  });

  //------------------MODALS-----------------
  let lastFocus;

  class Modal {
    constructor(modal, btn) {
      this.open = document.querySelector(btn);
      this.modal = document.querySelector(modal);
      this.close = this.modal.querySelector('.modal__close');

      this.open.addEventListener('click', () => {
        lastFocus = document.activeElement;
        this.modal.classList.add('modal--active');
        this.modal.setAttribute('tabindex', '0');
        this.modal.focus();
        document.querySelector('body').style.overflow = 'hidden';
      });

      this.close.addEventListener('click', () => {
        this.modal.classList.remove('modal--active');
        lastFocus.focus();
        document.querySelector('body').style.overflow = 'auto';
      });


      document.addEventListener('keydown', (e) => {
        if (e.keyCode == 27) {
          if (this.modal.classList.contains('modal--active')) {
            e.preventDefault();
            this.modal.classList.remove('modal--active');
            lastFocus.focus();
            document.querySelector('body').style.overflow = 'auto';
          }
        }
      });
    }
  }


  const writeUs = new Modal('.modal--write', '.contacts__btn');
  const sended = new Modal('.modal--sended', '.sended-for-class');
  const cart = new Modal('.modal--cart', '.cart');


  //--------------------NAV-MOB--------------------------

  const navBtn = document.querySelector('.nav-btn');

  if (navBtn) {
    const nav = document.querySelector('.nav');
    navBtn.addEventListener('click', (e) => {
      openModal();
      noScroll();
    });

    nav.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav__link')) {
        openModal();
        noScroll();
      }
    });

    const openModal = () => {
      navBtn.classList.toggle('nav-btn--open');
      nav.classList.toggle('nav--open');
    };

    const noScroll = () => {
      const body = document.querySelector('body');
      if (nav.classList.contains('nav--open')) {
        nav.classList.remove('nav--close');
        body.style.overflow = 'hidden';
      } else {
        nav.classList.add('nav--close');
        body.style.overflow = 'auto';
      }
    };
  }

  //---------------------NUMS---------------------------------


  class Num {
    constructor(parrent) {
      parrent.addEventListener('click', (e) => {
        const input = parrent.querySelector('.num__input'),
          target = e.target;

        if (target.classList.contains('num__btn--increase')) {
          const val = parseInt(input.getAttribute('value'));
          input.setAttribute('value', `${val+1}`);
        } else if (target.classList.contains('num__btn--reduse')) {
          const val = parseInt(input.getAttribute('value'));
          if (val > 1) {
            input.setAttribute('value', `${val-1}`);
          }
        }
      });
    }
  }

  const nums = document.querySelectorAll('.num');
  if (nums.length > 0) {
    nums.forEach(num => {
      num = new Num(num);
    });
  }


  //----------productSlider------------------
  const productSlider = document.querySelector('.products-swiper');

  if (productSlider) {
    const productSlider = new Swiper('.products-swiper', {
      slidesPerView: 1,
      speed: 800,
      loop: true,

      navigation: {
        nextEl: ".products__swiper-nav-next",
        prevEl: ".products__swiper-nav-prew",
      },

    });

    const prodctsBtns = document.querySelectorAll('.nav-products__item');

    productSlider.on('slideChange', () => {
      prodctsBtns.forEach(el => {
        el.classList.remove('nav-products__item--active');
        el.setAttribute('data-cat', productSlider.realIndex);
      });
      document.querySelector('.products__title').setAttribute('data-cat', productSlider.realIndex);
      document.querySelector(`.nav-products__item[data-index="${productSlider.realIndex}"]`).classList.add('nav-products__item--active');
    });

    prodctsBtns.forEach((el, index) => {
      el.setAttribute('data-index', index);

      el.addEventListener('click', e => {
        const slideNumber = parseInt(e.target.dataset.index) + 1;

        prodctsBtns.forEach(el => {
          el.classList.remove('nav-products__item--active');
          e.target.classList.add('nav-products__item--active');
        });
        productSlider.slideTo(slideNumber);
      });
    });
  }

  //----------oilSlider------------------
  const oilSlider = document.querySelector('.oil__slider');

  if (oilSlider) {
    const oilSlider = new Swiper('.oil__slider', {
      slidesPerView: 1,
      speed: 800,
      loop: false,
      spaceBetween: 20,
      pagination: {
        el: ".oil__pagination",
        clickable: true,
      },
      breakpoints: {
        600: {
          slidesPerView: 2,

        },
        1366: {
          slidesPerView: 4,
        },

      },

    });
  }

  //----------rewiewsSlider------------------
  const rewiewsSlider = document.querySelector('.rewievs__list');

  if (rewiewsSlider) {
    const rewiewsSlider = new Swiper('.rewievs__list', {
      slidesPerView: 1,
      speed: 800,
      loop: true,
      spaceBetween: 20,
      pagination: {
        el: ".rewiew__pag",
        clickable: true,
      },
      breakpoints: {
        600: {
          slidesPerView: 2,

        },
        1024: {
          slidesPerView: 3,
        },

      },

    });
  }

  //---------------маска для номера теLефона--------------(нашел на просторах)

  [].forEach.call(document.querySelectorAll('[type="tel"]'), function (input) {
    var keyCode;

    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) {
        event.preventDefault();
      }
      var matrix = "\+38\(0__\)___\-__\-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        newValue = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
      i = newValue.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        newValue = newValue.slice(0, i);
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}";
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
        this.value = newValue;
      }
      if (event.type == "blur" && this.value.length < 5) {
        this.value = "";
      }
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);

  });

  //------------------------обработка формы сообщения----------------------
  const modalWrite = document.querySelector('.modal--write');

  if (modalWrite) {
    const sendForm = document.querySelector('.write-us__form'),
      formBtn = sendForm.querySelector('.write-us__btn'),
      formInput = sendForm.querySelectorAll('.form-label__input');


    formBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const tel = String(formInput[1].value.replace(/[^0-9]/g, "")),
        sended = document.querySelector('.modal--sended'),
        name = formInput[0].value;
      let i = 0;
      formInput.forEach(el => {
        if (el.value !== '') {
          i++;
        } else {
          el.classList.add('error');
        }
      });


      if (tel.length == 12) {
        i++;
      } else {
        formInput[1].classList.add('error');
      }

      if (i === 4) {
        sendForm.closest('.modal').classList.remove('modal--active');
        document.querySelector('.write-us-name').textContent = `${name}`;
        lastFocus.focus();
        document.querySelector('body').style.overflow = 'auto';

        lastFocus = document.activeElement;
        sended.classList.add('modal--active');
        sended.setAttribute('tabindex', '0');
        sended.focus();
        document.querySelector('body').style.overflow = 'hidden';
      }
    });

    formInput.forEach(el => {
      el.addEventListener('focus', () => {
        el.classList.remove('error');
      });
    });
  }


  //--------------РАБОТА с КорЗинОй---------------------

  const saleItem = document.querySelectorAll('.sale-item');
  let itemInCart = [];
  let indexInCart = [];
  const cartCount = document.querySelector('.cart__count');

  saleItem.forEach(item => {
    const addToCapt = item.querySelector('.sale-item-cart');
    const cart = document.querySelector('.cart-modal__list');

    addToCapt.addEventListener('click', () => {
      const cartItem = {
        index: item.dataset.sale,
        price: +item.dataset.price,
        name: item.querySelector('.sale-item-name').innerHTML.trim(),
        count: +item.querySelector('.sale-item-count').value,
        cost: (+item.dataset.price) * (+item.querySelector('.sale-item-count').value)
      };



      if (typeof itemInCart === 'object') { //добавление индекса товара в массив
        if (itemInCart.length > 0) {
          itemInCart.forEach(item => {
            const i = item.dataset.sale;
            indexInCart.push(i);
          });
        }
      }
      if (!indexInCart.includes(cartItem.index)) { //проверка, нет ли в корзине такого товара (повторно не добавится)
        cart.insertAdjacentHTML('beforeend',
          `<li class="cart-modal__item cart-item" data-price="${cartItem.price}" data-sale="${cartItem.index}">
        <div class="cart-item__topline">
        <span class="cart-item__name">${cartItem.name}</span>
        <span class="cart-item__volume">250 мл</span>
      </div>
      <div class="cart-item__bottomline">
        <div class="cart-item__img-wrapper">
          <img src="img/product-bottle-${cartItem.index}.png" alt="" class="cart-item__img" height="90">
        </div>
        <div class="cart-item__num-wrapper num num--small">
          <button class="num__btn num__btn--reduse" aria-label="уменьшить количество">-</button>
          <label class="num__label">
            <input class="num__input num__input--1" type="number" value="${cartItem.count}" tabindex="-1">
          </label>
          <button class="num__btn num__btn--increase" aria-label="увеличить количество">+</button>
        </div>
        <div class="cart-item__cost">
          <span class="cart-item__cost-num">${cartItem.cost}</span>
          <span class="cart-item__cost-currency">грн</span>
        </div>
        <button class="cart-item__delete" aria-label="удалить позицию"></button>
      </div>
    </li>`);
      }


      const nums = document.querySelectorAll('.num'); 
      if (nums.length > 0) {
        nums.forEach(num => {
          num = new Num(num);
        });
      }

      itemInCart = document.querySelectorAll('.cart-item'); 


      if (typeof itemInCart === 'object') {
        if (itemInCart.length > 0) {
          cartCount.classList.add('cart__count--full');
          cartCount.textContent = `${itemInCart.length}`;
        } else {
          cartCount.classList.remove('cart__count--full');
        }

        itemInCart.forEach((item) => {
          item.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('num__btn')) {  //расчет стоимости всех едениц товара(при изменении количества)
              const cost = item.querySelector('.cart-item__cost-num');
              const costNum = (+item.dataset.price) * (+item.querySelector('.num__input').value);
              cost.textContent = `${costNum}`;
            } else if (target.classList.contains('cart-item__delete')) { //удаление товаров из корзины
              target.closest('.cart-modal__item.cart-item').remove();
              itemInCart = document.querySelectorAll('.cart-item');
              if (itemInCart.length > 0) {
                cartCount.classList.add('cart__count--full');
                cartCount.textContent = `${itemInCart.length}`;
              } else {
                cartCount.classList.remove('cart__count--full');
                document.querySelector('.cart-modal__list').innerHTML = '<li class="no-item">В корзине нет товаров</li>';
              }
            }
          });
        });
      }
    });
  });

  document.querySelector('.cart').addEventListener('click', () => { //сообщение об отсутствии товаров в корзине
    if (itemInCart.length == 0) {
      document.querySelector('.cart-modal__list').innerHTML = '<li class="no-item">В корзине нет товаров</li>';
    } else {
      const noItem = document.querySelector('.no-item');
      if (noItem) {
        noItem.remove();
      }

    }
  });

  //------------Табы

  const tabs = (e) => {
    if (e.target.classList.contains('tab-item') && !e.target.classList.contains('tab-item--active')) {
      let index;
      e.target.closest('.tab-container').querySelectorAll('.tab-item').forEach(tabBtn => {
        tabBtn.classList.remove('tab-item--active');
      });
      e.target.classList.add('tab-item--active');
      index = e.target.dataset.tabBtn;
      e.target.closest('.tab-container').querySelectorAll('.tab-content__item').forEach(item => {
        item.classList.remove('tab-content__item--active');
        if (item.dataset.tabContent == index) {
          item.classList.add('tab-content__item--active');
        }
      });
    }
  };

  const deliveryTabs = document.querySelector('.cart-delivery__tabs');
  if (deliveryTabs) {
    deliveryTabs.addEventListener('click', tabs);
  }

  const paymentTabs = document.querySelector('.cart-payment__tabs');
  if (paymentTabs) {
    paymentTabs.addEventListener('click', tabs);
  }




});