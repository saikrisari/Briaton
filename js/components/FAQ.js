export const openFaq = () => {
  const buttons = document.querySelectorAll('.accordion__btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const isActive = btn.classList.contains('accordion__btn--active');

      buttons.forEach(otherBtn => {
        otherBtn.classList.remove('accordion__btn--active');
        const otherContent = otherBtn.nextElementSibling;
        otherContent.style.display = 'none';
      });

      if (!isActive) {
        btn.classList.add('accordion__btn--active');
        content.style.display = 'block';
      }
    });
  });
};