document.addEventListener('DOMContentLoaded', () => {

    // табы


    const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");

    // сначала делаем функцию которая скрывает наши табы .

    // и из табов убираем класс активности tabheader__item_active

    // function hideTabContent() {

    //     tabsContent.forEach((item) => {
    //         item.style.display = 'none';
    //     });

    //     // а в табах убираем класс активности

    //     tabs.forEach(item => {
    //         item.classList.remove('tabheader__item_active');
    //     });
    // }

    // мы в папку css добавили файл style.css.1 где прописали дополнительные классы чтобы их исполдьзовать. 
    // вместо style например вместо style.display='none';.




    function hideTabContent() {

        tabsContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        // а в табах убираем класс активности

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }


    //    теперь создаем функцию которая показывает табы 

    // i это к какому элементу мы будем обращатся


    // в этой функции тоже меняем styly na classList


    // function showTabContent(i) {

    //     tabsContent[i].style.display = 'block';
    //     tabs[i].classList.add('tabheader__item_active');

    // }

    function showTabContent(i) {

        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');

        tabs[i].classList.add('tabheader__item_active');

    }

    hideTabContent();
    showTabContent(0);

    // используем делигирование

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {

            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });


    // Timer


    const deadline = '2022-09-08';

    function getTimeRemaining(endtime) {

        const t = Date.parse(endtime) - Date.parse(new Date());

        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((t / (1000 * 60)) % 60);
        const seconds = Math.floor((t / 1000) % 60);

        // чтобы эти переменные за функцию чтобы они работали используем return и все втаскиваем в обьект

        return {

            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    // напишем функцию если число будет меньше 10 то впереди будет подставлятся 0.
    // И то перенесем в наш updateClock

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // после пишем фуркцию которая будет устанавливать наш таймер на страницу

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');

        //   переменная чтобы каждую секунду показывало время

        const timeInterval = setInterval(updateClock, 1000);

        updateClock();



        function updateClock() {

            // мы записали весь обьект где return вначале в переменную t.
            // То есть переменная  t у нас теперь и есть этот объект

            const t = getTimeRemaining(endtime);

            // теперь используя нашу переменную t на нашу стр помущаем дни часы мин сек
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            // берем с обьекта t.total

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

    }


    setClock('.timer', deadline);


    // Модальное окно

    const modalTrigger = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
    const modalCloseBtn = document.querySelector('[data-close]');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');

        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalTrigger.forEach(btn => {

        btn.addEventListener('click', openModal);

        // btn.addEventListener('click', (e) => {

        //     // modal.classList.add('show');
        //     // modal.classList.remove('hide');

        //     // document.body.style.overflow = 'hidden';

        // });
    });


    // если код повторяется то его обертываем в функцию

    function closeModal() {

        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalCloseBtn.addEventListener('click', closeModal);

    // modalCloseBtn.addEventListener('click', () => {

    //     modal.classList.add('hide');
    //     modal.classList.remove('show');

    //     document.body.style.overflow = "";
    // });

    // пишем обработчики когда мы кликаем на подложку и мщдальное окно закрывается

    modal.addEventListener('click', (e) => {

        if (e.target === modal) {

            closeModal();


            // modal.classList.add('hide');
            // modal.classList.remove('show');

            // document.body.style.overflow = "";

        }

    });

    // если нажимаешь на Escape закрывается окно

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // чтобы модальное окно выходило через какое то время
    const modalTimerId = setTimeout(openModal, 3000);

    // если пользователь долистал страницу и 
    // появляется окно

    // window.addEventListener('scroll', () => {
    //     if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    //         openModal();
    //     }

    // });

    // создадим функцию и поместим верхний функционал showModalByScroll

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();

            // здесь еще закрываем обработчик события

            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

});