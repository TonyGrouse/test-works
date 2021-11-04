"use strict";
window.addEventListener("DOMContentLoaded", () => {
    new Swiper(".reviews__slider", {
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            pagination: {
                el: ".swiper-pagination",
                type: "bullets",
                clickable: !0
            },
            touchRatio: 1.1,
            grabCursor: !0,
            keyboard: {
                enabled: !0,
                onlyInViewport: !0,
                pageUpDown: !0
            },
            loop: !0,
            autoplay: {
                delay: 5e3
            },
            speed: 700,
            effect: "flip",
            flipEffect: {
                slideShadow: !0,
                limitRotation: !0
            },
            slidesPerView: 1
        }),
        function () {
            const e = document.querySelector(".timer__labels");
            let t = 59,
                n = 29;

            function i(e) {
                return e < 10 ? "0" + e : e
            }
            const o = setInterval(() => {
                e.innerHTML = `\n                <li>Минут: <span>${i(n)}</span></li>\n                <li>Секунд: <span>${i(t)}</span></li>\n            `, 0 === t && 0 === n && clearInterval(o), 0 === t && (t = 59, n--), t--
            }, 1e3)
        }(), $(document).ready((function () {
            $("a[href*='#']").on("click", (function (e) {
                var t = $(this);
                return $("html, body").stop().animate({
                    scrollTop: $(t.attr("href")).offset().top
                }, 777), e.preventDefault(), !1
            }))
        }))
});
