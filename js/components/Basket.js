export const openBasket = () => {
  if (!localStorage.getItem('basket')) {
    localStorage.setItem('basket', JSON.stringify([]));
  }

  const basket = document.querySelector('.basket');
  const basketBtn = document.querySelector('.header__user-btn');
  const basketCount = document.querySelector('.header__user-count');
  const basketList = document.querySelector('.basket__list');
  const basketEmpty = document.querySelector('.basket__empty-block');
  const basketProceed = document.querySelector('.basket__link.btn');

  let productsData = [];
  let basketItems = JSON.parse(localStorage.getItem('basket')).map(item => Number(item));
  let itemsCount = basketItems.length;

  fetch('./data/data.json')
    .then(res => res.json())
    .then(data => {
      productsData = data;
      updateBasketUI();
    });

  function updateBasketUI() {
    basketCount.textContent = itemsCount;

    if (itemsCount > 0) {
      basketEmpty.style.display = 'none';
    } else {
      basketEmpty.style.display = 'block';
    }

    if (basketProceed) {
      basketProceed.style.display = itemsCount > 0 ? 'block' : 'none';
      basketProceed.style.textAlign = 'center';
    }

    if (basket.classList.contains('basket--active')) {
      renderBasketItems();
    }
  }

  function renderBasketItems() {
    basketList.innerHTML = '';
    basketItems.forEach(id => {
      const product = productsData.find(item => item.id === id);
      if (!product) return;
      const basketItem = document.createElement('li');
      basketItem.className = 'basket__item';
      basketItem.innerHTML = `
        <div class='basket__img'>
          <img src='${product.image}' alt='${product.name}' height='60' width='60'>
        </div>
        <span class='basket__name'>${product.name}</span>
        <span class='basket__price'>${product.price.new} руб</span>
        <button class='basket__close' type='button' data-id='${product.id}' aria-label='Удалить из корзины'>
          <svg width='24' height='24' aria-hidden='true'>
            <use xlink:href='images/sprite.svg#icon-close'></use>
          </svg>
        </button>
      `;
      basketList.appendChild(basketItem);
    });
  }

  function addToBasket(productId) {
    const id = Number(productId);
    if (basketItems.includes(id)) return;
    basketItems.push(id);
    itemsCount++;
    localStorage.setItem('basket', JSON.stringify(basketItems));
    updateBasketUI();
  }

  function removeFromBasket(productId) {
    const id = Number(productId);
    basketItems = basketItems.filter(item => item !== id);
    itemsCount--;
    localStorage.setItem('basket', JSON.stringify(basketItems));
    updateBasketUI();
    const btn = basketList.querySelector(`.basket__close[data-id='${id}']`);
    if (btn) btn.closest('.basket__item').remove();
  }

  document.addEventListener('click', e => {
    const addBtn = e.target.closest('.btn--icon[data-id]');
    if (addBtn) {
      e.preventDefault();
      addToBasket(addBtn.getAttribute('data-id'));
      return;
    }
    const closeBtn = e.target.closest('.basket__close[data-id]');
    if (closeBtn) {
      removeFromBasket(closeBtn.getAttribute('data-id'));
    }
  });

  basketBtn.addEventListener('click', () => {
    basket.classList.toggle('basket--active');
    updateBasketUI();
  });
};
