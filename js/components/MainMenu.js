export const openMainMenu = () => {
    const mainMenuBtn = document.querySelector('.header__catalog-btn');
    const closeBtn = document.querySelector('.main-menu__close');
    const mainMenuEl = document.querySelector('.main-menu');

    const toggleMenu = () => {
        mainMenuEl.classList.toggle('main-menu--active');
    };

    mainMenuBtn.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);
};