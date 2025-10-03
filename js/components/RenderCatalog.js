export const renderCatalog = async () => {
  const response = await fetch("./data/data.json");
  const products = await response.json();

  const catalogList = document.querySelector(".catalog__list");
  const checkboxes = document.querySelectorAll(".custom-checkbox__field[name='type']");
  const availabilityRadios = document.querySelectorAll(".custom-radio__field[name='status']");
  const sortSelect = document.querySelector(".catalog__sort-select");

  const isAvailable = (product) => {
    return product.availability.moscow > 0 ||
      product.availability.orenburg > 0 ||
      product.availability.saintPetersburg > 0;
  };

  const sortProducts = (productsToSort) => {
    const sortValue = sortSelect.value;

    switch (sortValue) {
      case 'price-min':
        return [...productsToSort].sort((a, b) => a.price.new - b.price.new);
      case 'price-max':
        return [...productsToSort].sort((a, b) => b.price.new - a.price.new);
      case 'rating-max':
        return [...productsToSort].sort((a, b) => b.rating - a.rating);
      default:
        return productsToSort;
    }
  };

  const filterProducts = () => {
    const selectedTypes = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    const availabilityFilter = document.querySelector(".custom-radio__field[name='status']:checked").value;

    let filtered = products;

    if (selectedTypes.length > 0) {
      filtered = filtered.filter(item =>
        selectedTypes.some(type => item.type.includes(type))
      );
    }

    if (availabilityFilter === 'instock') {
      filtered = filtered.filter(isAvailable);
    }

    return sortProducts(filtered);
  };

  const renderProducts = (items) => {
    catalogList.innerHTML = '';
    items.forEach(product => {
      const productItem = document.createElement('li');
      productItem.classList.add('catalog__item');
      productItem.innerHTML = `
        <div class='product-card'>
          <div class='product-card__visual'>
            <img class='product-card__img' src='${product.image}' height='436' width='290'
                 alt='${product.name}'>
            <div class='product-card__more'>
              <a href='#' class='product-card__link btn btn--icon' data-id='${product.id}'>
                <span class='btn__text'>В корзину</span>
                <svg width='24' height='24' aria-hidden='true'>
                  <use xlink:href='images/sprite.svg#icon-basket'></use>
                </svg>
              </a>
              <a href='#' class='product-card__link btn btn--secondary'>
                <span class='btn__text'>Подробнее</span>
              </a>
            </div>
          </div>
          <div class='product-card__info'>
            <h2 class='product-card__title'>${product.name}</h2>
            <span class='product-card__old'>
              <span class='product-card__old-number'>${product.price.old}</span>
              <span class='product-card__old-add'>₽</span>
            </span>
            <span class='product-card__price'>
              <span class='product-card__price-number'>${product.price.new.toLocaleString('ru-RU')}</span>
              <span class='product-card__price-add'>₽</span>
            </span>
            <div class='product-card__tooltip tooltip'>
              <button class='tooltip__btn' aria-label='Показать подсказку'>
                <svg class='tooltip__icon' width='5' height='10' aria-hidden='true'>
                  <use xlink:href='images/sprite.svg#icon-i'></use>
                </svg>
              </button>
              <div class='tooltip__content'>
                <span class='tooltip__text'>Наличие товара по городам:</span>
                <ul class='tooltip__list'>
                  <li class='tooltip__item'>
                    <span class='tooltip__text'>Москва: <span class='tooltip__count'>${product.availability.moscow}</span></span>
                  </li>
                  <li class='tooltip__item'>
                    <span class='tooltip__text'>Оренбург: <span class='tooltip__count'>${product.availability.orenburg}</span></span>
                  </li>
                  <li class='tooltip__item'>
                    <span class='tooltip__text'>Санкт-Петербург: <span class='tooltip__count'>${product.availability.saintPetersburg}</span></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      `;
      catalogList.append(productItem);
    });
  };

  const updateCounters = () => {
    checkboxes.forEach(checkbox => {
      const value = checkbox.value;
      const countElement = checkbox.nextElementSibling.querySelector(".custom-checkbox__count");
      const count = products.filter(item =>
        item.type.includes(value) &&
        (document.querySelector(".custom-radio__field[name='status']:checked").value === 'all-item' || isAvailable(item))
      ).length;
      countElement.textContent = count;
    });
  };

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      renderProducts(filterProducts());
    });
  });

  availabilityRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      renderProducts(filterProducts());
    });
  });

  sortSelect.addEventListener('change', () => {
    renderProducts(filterProducts());
  });

  renderProducts(filterProducts());
  updateCounters();
};
