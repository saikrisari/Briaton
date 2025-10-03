export function validate() {
    const validation = new JustValidate('.questions__form');

    validation
        .addField('#name', [
            { rule: 'required', errorMessage: 'Введите ваше имя' },
            { rule: 'minLength', value: 3, errorMessage: 'Минимальная длина три символа' },
            { rule: 'maxLength', value: 20, errorMessage: 'Максимальная длина двадцать символов' },
        ])
        .addField('#email', [
            { rule: 'required', errorMessage: 'Введите вашу почту' },
            { rule: 'email', errorMessage: 'Почта введена неверно' },
        ])
        .addField('#agree', [
            { rule: 'required', errorMessage: 'Согласие обязательно' },
        ])
        .onSuccess((event) => {
            event.preventDefault();
            const formEL = event.target;
            const overlay = document.createElement('div');

            const result = document.createElement('div');
            result.classList.add('result');
            const resultText = document.createElement('p');
            resultText.classList.add('result__text');
            const resultBtn = document.createElement('button');
            resultBtn.textContent = '×';
            resultBtn.classList.add('result__btn');
            result.append(resultText, resultBtn);


            const formData = new FormData(formEL);
            fetch(formEL.action, { method: 'POST', body: formData, mode: 'no-cors' })
                .then(() => {
                    document.body.append(result);
                    overlay.classList.add('result-bg');
                    document.body.append(overlay);
                    resultText.textContent = 'Благодарим за обращение!';
                })
                .catch(() => {
                    document.body.append(result);
                    overlay.classList.add('result-bg');
                    document.body.append(overlay);
                    resultText.textContent = 'Не удалось отправить обращение';
                });

            resultBtn.addEventListener('click', () => {
                formEL.reset();
                result.remove();
                overlay.remove();
            });
        });
}
