window.addEventListener('DOMContentLoaded', () => {
    $(document).ready(function(){
        $('.info__slider').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            speed: 600,
            easing: 'ease-in',
            touchThreshold: 50,
            waitForAnimate: false,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                    }
                },
            ]
        });
    });
});