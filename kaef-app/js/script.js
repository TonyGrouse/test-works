'use strict';

window.addEventListener('DOMContentLoaded', () => {
    //* Липкий футер===========================================================
    const body = document.querySelector('body'),
          headerRow = document.querySelector('.header__row'),
          headerCol = document.querySelector('#header-col'),
          fixedFooter = document.querySelector('.fixed-footer .container');
    
    const addContentOnFooter = () => {
        if (body.clientWidth < 768) {
            fixedFooter.append(headerCol);
        }else if (body.clientWidth > 768) {
            headerRow.append(headerCol);
        }
    };
    addContentOnFooter();

    window.addEventListener('resize', addContentOnFooter);
    //* Липкий футер===========================================================

    //* Время работы===========================================================
    const headerTime = document.querySelector('.header__time'),
          headerTimeText = document.querySelector('.header__time-text'),
          timetable = document.querySelector('.timetable'),
          timeTableRows = document.querySelectorAll('.timetable__row');

    headerTime.addEventListener('click', () => {
        timetable.classList.toggle('active');
    });
    
    const getTime = (time) => (+time < 10) ? time = `0${time}` : time;
    
    const updateTime = () => {
        const hours = new Date().getHours(),
              minutes = new Date().getMinutes(),
              day = new Date().getDay();


        const days = (body.clientWidth > 768)
            ? ['Воскресение', 'Понедельник', 'Вторник', 'Cреда', 'Четверг', 'Пятница', 'Суббота']
            : ['Вс', 'Пн', 'Вт', 'Cр', 'Чт', 'Пт', 'Сб'];

        timeTableRows.forEach(row => {
            row.classList.remove('active');
        });

        (day === 0)
                ? timeTableRows[6].classList.add('active')
                : timeTableRows[day-1].classList.add('active');

        headerTimeText.innerHTML = `
            <p>
                <span id="underline">Сейчас</span>
                ${getTime(hours)}:${getTime(minutes)},
                <span id="day">${days[day]}</span>
            </p>
            <p><span id="open">Открыто</span> до 22:45</p>
        `;

        setTimeout(updateTime, 1000);
    };
    updateTime();
    
    const footerText = document.querySelector('.footer__text p');
    footerText.innerHTML = `2019 - ${new Date().getFullYear()}`;
    //* Время работы===========================================================

    //* Плавный скролл===========================================================
    $(document).ready(function () {
        $("a[href*='#']").on("click", function (e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top
            }, 777);
            e.preventDefault();
            return false;
        });
    });
    //* Плавный скролл===========================================================
});