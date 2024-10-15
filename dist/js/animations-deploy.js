$(document).ready(function () {

    Splitting();
    var images = document.querySelectorAll(".jsParallaxImg")
    var mainParallax = document.querySelector(".jsMainParallaxImg")


    new Ukiyo(mainParallax, {
        scale: 1.2,
        speed: 3,
        willChange: true,
        externalRAF: false
    })
    new Ukiyo(images)


    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
    ScrollTrigger.normalizeScroll(true)
    ScrollSmoother.create({
        smooth: 2,
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true,
    });



    gsap.to('.first-letter', {
        x: -innerWidth * 3,
        scale: 10,
        ease: 'power2.inOut',
        scrollTrigger: {
            start: 'top top',
            end: () => '+=100%',
            scrub: 1,
        },
    })
    gsap.to('.last-letter', {
        x: innerWidth * 3,
        scale: 10,
        ease: 'power2.inOut',
        scrollTrigger: {
            start: 'top top',
            end: () => '+=100%',
            scrub: 1,
        },

    })

    gsap.to('.main-animation__img', {
        ease: 'power2.inOut',
        scale: 1,
        opacity: 1,
        scrollTrigger: {
            trigger: '.main-animation',
            start: 'top top',
            end: () => '+=100%',
            scrub: 1,
            pin: true,
            scrub: true,
            onUpdate: function (self) {
                if (self.progress >= 0.8) {
                    $('.header-box').addClass('active');

                } else {
                    $('.header-box').removeClass('active');
                }
                if (self.progress >= 0.01) {
                    $('.scroll__info').addClass('hidden');
                } else {
                    $('.scroll__info').removeClass('hidden');
                }

            }
        },
    })
    gsap.to('.main-animation__content', {
        ease: 'power2.inOut',
        opacity: 1,
        x: 0,
        y: 0,
        scrollTrigger: {
            start: 'top top',
            end: () => '+=100%',
            scrub: true,
        },

    })
    gsap.to('.main-advantages__img', {
        ease: 'power2.inOut',
        y: -300,
        scrollTrigger: {
            trigger: '.main-advantages__img',
            start: 'center center',
            end: () => '+=50%',
            scrub: true,
        },

    })


    var textArray = gsap.utils.toArray('h2')
    var advArray = gsap.utils.toArray('.main-advantages__item');
    textArray.forEach(function (item) {
        var splitSymbol = item.querySelectorAll('.char');
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: '100% 100%',
                toggleActions: 'play none none none',

            }
        })
        tl.from(splitSymbol, 1, {
            opacity: 0,
            stagger: 0.04,
            duration: .3,
            ease: 'back.out',
        })
    })
    advArray.forEach(function (item) {
        var tl = gsap.timeline({
            opacity: 1,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: '100% 100%',
            }
        })
        tl.from(item, 1, {
            opacity: 0,
            ease: 'back.out',
        })
    })
})