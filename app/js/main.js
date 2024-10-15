$(document).ready(function () {
    $.fn.maskPhone = function (config) {
        var objMask = this;
        if (!objMask.length) {
            return false;
        }
        let mask = function (event) {
            let pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            let matrix = "+7 (___) ___-__-__",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i);
            }
            let reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || event.keyCode > 47 && event.keyCode < 58) {
                this.value = new_value;
            }
            if (event.type == "blur" && this.value.length < 5) {
                this.value = "";
            }
        }
        objMask.each(function (id) {
            if (!$(this).hasClass('is-masked')) {
                this.addEventListener("input", mask, false);
                this.addEventListener("focus", mask, false);
                this.addEventListener("blur", mask, false);
                this.addEventListener("keydown", mask, false);
                this.classList.add("is-masked");
            }
        });
    };
    $('input[type="tel"]').maskPhone();
    var projectInnerSlider = new Swiper(".project-inner__slider", {
        spaceBetween: 20,
        slidesPerView: 1,
        slidesPerGroup: 1,
        speed: 800,
        watchSlidesProgress: true,
        navigation: {
            nextEl: ".proj-next",
            prevEl: ".proj-prev",
        },
        pagination: {
            el: ".proj-pagination",
        },
        effect: "creative",
        //creativeEffect: {
        //    prev: {
        //        shadow: true,
        //        translate: [0, 0, -800],
        //        rotate: [180, 0, 0],
        //    },
        //    next: {
        //        shadow: true,
        //        translate: [0, 0, -800],
        //        rotate: [-180, 0, 0],
        //    },
        //},
        creativeEffect: {
            prev: {
                shadow: true,
                translate: [0, 0, -400],
            },
            next: {
                translate: ["100%", 0, 0],
            },
        },
    });
    let projectsPagination = "fraction";
    let projectsEffect = "fade";
    if (window.innerWidth <= 1024) {
        projectsPagination = "bullets"
        projectsEffect = "slide"
    }
    var projectGallerySlider = new Swiper(".projects__bottom-slider", {
        spaceBetween: 20,
        slidesPerView: "auto",
        slidesPerGroup: 1,
        speed: 600,
        loop: true,
        allowTouchMove: false,
    });

    var projectSlider = new Swiper(".main-projects__slider", {
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        speed: 600,
        loop: true,
        effect: projectsEffect,
        autoHeight: false,
        allowTouchMove: false,

        thumbs: {
            swiper: projectGallerySlider,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: 'true',
            type: projectsPagination,
        },
        breakpoints: {
            220: {
                allowTouchMove: true,
                autoHeight: true,
            },
            1025: {
                allowTouchMove: false,
                autoHeight: false,
            },
        }
    });

    var blogSlider = new Swiper(".blog-slider", {
        spaceBetween: 20,
        slidesPerView: "auto",
        slidesPerGroup: 1,
        speed: 2000,
        //autoHeight: true,
        autoplay: {
            delay: 0,
        },
        loop: true,
        disableOnInteraction: true,
        grabCursor: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
        },
        on: {
            init() {
                this.el.addEventListener('mouseenter', () => {
                    this.autoplay.stop();
                });

                this.el.addEventListener('mouseleave', () => {
                    this.autoplay.start();
                });
            }
        },
    });
    var reviewsSlider = new Swiper(".reviews-slider", {
        spaceBetween: 20,
        slidesPerView: 1,
        slidesPerGroup: 1,
        speed: 600,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
        },
    });

    var educationSlider = new Swiper(".education-slider", {
        spaceBetween: 20,
        slidesPerView: "auto",
        slidesPerGroup: 1,
        speed: 600,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
        },
    });
    let $grid = $('.masonry-box').masonry({
        itemSelector: '.masonry__item',
        gutter: '.gutter-sizer',
        horizontalOrder: true,
        columnWidth: '.grid-sizer',
        percentPosition: true
    });
    $grid.imagesLoaded().progress(function () {
        $grid.masonry('layout');
    });



    $.fancybox.defaults.backFocus = false;
    $('.jsBodyItem').first().addClass('hidden');
    $('.content-box table').wrap('<div class="table-wrap"></div>')

    $(document).on('click', '.jsSelectHead', function (e) {
        e.stopPropagation();
        $(this).toggleClass('active');
        $(this).next('.jsSelectBody').toggleClass('active');
    })

    $(document).on('click', '.jsBodyItem', function (e) {
        e.stopPropagation();
        $(this).addClass('hidden').siblings().removeClass('hidden');
        $(this).closest('.form-choose').find('.jsHiddenInput').val($(this).text());
        $(this).closest('.jsSelectBody').removeClass('active');
        $(this).closest('.form-choose').find('.jsSelectHead').removeClass('active');
        $(this).closest('.form-choose').find('.jsHeadText').text($(this).text());
    })

    $(document).on('click', function () {
        $('.jsSelectHead, .jsSelectBody').removeClass('active');
    })

    $(document).on('click', '.jsModalOpen', function (e) {
        let objButton = $(this);
        e.preventDefault();
        $.fancybox.open({
            src: objButton.data('url'),
            type: 'ajax',
            opts: {
                touch: false,
                afterLoad: function (instance, current) {
                    var objSource = current.$content;
                    objSource.find('input[type="tel"]').maskPhone();
                }
            }

        });
    });

    $(document).on('click', '.jsSearchBtn', function () {
        $(this).toggleClass('active');
        $('.header-search').toggleClass('active');
    })

    $(document).on('click', '.burger', function () {
        $(this).toggleClass('active');
        $('.header-menu').toggleClass('active');
        $('.header-search').toggleClass('active');
    })
})