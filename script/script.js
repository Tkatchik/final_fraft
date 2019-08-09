window.addEventListener('DOMContentLoaded', () => {
    'use strict';


    // popups

    const popUpCall = () => {
        let popUpCall = document.querySelector('.popup-call');

        let showCall = (display = 'block', overflow = 'hidden') => {
            popUpCall.style.display = display;
            document.body.style.overflow = overflow;
        }; //no scroll

        document.body.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('call-btn')) {
                showCall('block', 'hidden');
            } else if (target.classList.contains('popup-close') ||
                target.classList.contains('popup-call')) {
                showCall('none', '');
            }
        });
    }; // popupcall
    popUpCall();

    const popUpCheck = () => {
        let popUpCheck = document.querySelector('.popup-check');

        document.body.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('check-btn')) {
                popUpCheck.style.display = 'block';
            } else if (target.classList.contains('popup-close') ||
                target.classList.contains('popup-check')) {
                popUpCheck.style.display = ('none', '');
            }
        });
    }; //popupcheck
    popUpCheck();

    const popUpDiscount = () => {
        let discountBtn = document.querySelectorAll('.discount-btn'),
            popUpDiscount = document.querySelector('.popup-discount');

        discountBtn.forEach((elem) => {
            elem.addEventListener('click', (event) => {
                let target = event.target;
                if (target.classList.contains('discount-btn')) {
                    popUpDiscount.style.display = 'block';
                } else if (target.classList.contains('popup-close') ||
                    target.classList.contains('popup-discount')) {
                    popUpDiscount.style.display = ('none', '');
                }
            }); //popUpDiscount
        });
    };
    popUpDiscount();

    // more button

    const moreBtn = () => {

        const btn = document.querySelector('.button');

        document.body.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('shadow-block')) {
                btn.style.display = 'none';
            }
        }); //popUpDiscount
    };


    moreBtn();

    // forms

    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так...',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с Вами свяжемся!';

        const captureForm = document.querySelectorAll('.capture-form');

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem; color: white;';

        captureForm.forEach((item) => {
            item.addEventListener('submit', (event) => {
                event.preventDefault();
                item.appendChild(statusMessage);

                const formData = new FormData(item);
                let body = {};

                formData.forEach((val, key) => {
                    body[key] = val;
                });

                statusMessage.textContent = loadMessage;

                postData(body)
                    .then((response) => {
                        if (response.status !== 200) {
                            throw new Error('Status network not 200');
                        }
                        statusMessage.textContent = successMessage;
                        item.reset();

                    })
                    .catch((error) => {
                        statusMessage.textContent = errorMessage;
                        console.error(error);
                    });

            });

        }); //form

        const postData = (body) => {
            return fetch('./server.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

        };
    }; //sendform

    sendForm();

}); //window