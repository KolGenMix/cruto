document.addEventListener('DOMContentLoaded', () => {

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

});