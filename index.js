// ===== LOADER =====
$(window).on('load', function () {
    gsap.to('#loader', 2, { y: '-100%' });
    gsap.to('#loader', 2, { opacity: 0 });
    gsap.to('#loader', 0, { display: 'none', delay: 2 });
    gsap.to('#header', 0, { display: 'flex', delay: 2 });
});

// ===== NAVIGATION OPEN/CLOSE =====
$(function () {
    $('.menubar').on('click', function () {
        $('body').addClass('menu-open');
        gsap.to('#navigation-content', { duration: 0.6, y: '0%', ease: 'expo.inOut' });
    });
    $('.navigation-close').on('click', function () {
        $('body').removeClass('menu-open');
        gsap.to('#navigation-content', { duration: 0.6, y: '-100%', ease: 'expo.inOut' });
    });
});

// ===== ROTATING TEXT =====
$(function () {
    var TxtRotate = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };
    TxtRotate.prototype.tick = function () {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
        var that = this;
        var delta = 200 - Math.random() * 100;
        if (this.isDeleting) { delta /= 2; }
        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 100;
        }
        setTimeout(function () { that.tick(); }, delta);
    };
    window.onload = function () {
        var elements = document.getElementsByClassName('txt-rotate');
        for (var i = 0; i < elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-rotate');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtRotate(elements[i], JSON.parse(toRotate), period);
            }
        }
    };
});

// ===== PAGE NAVIGATION (with breaker transition) =====
$(function () {
    function navigateTo(showId) {
        gsap.to('#navigation-content', 0, { display: 'none', delay: 0.7 });
        gsap.to('#navigation-content', 0, { y: '-100%', delay: 0.7 });
        gsap.to('#header, #about, #portfolio, #contact', 0, { display: 'none' });
        gsap.to('#breaker', 0, { display: 'block' });
        gsap.to('#breaker-two', 0, { display: 'block', delay: 0.1 });
        gsap.to('#breaker', 0, { display: 'none', delay: 2 });
        gsap.to('#breaker-two', 0, { display: 'none', delay: 2 });
        var displayType = (showId === '#header') ? 'flex' : 'block';
        gsap.to(showId, 0, { display: displayType, delay: 0.7 });
        
        if (showId === '#header') {
            setTimeout(function() {
                window.dispatchEvent(new Event('resize'));
            }, 800);
        }

        gsap.to('#navigation-content', 0, { display: 'flex', delay: 2 });
        window.scrollTo(0, 0);
    }

    $('#home-link').on('click', function (e) { e.preventDefault(); navigateTo('#header'); });
    $('#about-link').on('click', function (e) { e.preventDefault(); navigateTo('#about'); });
    $('#portfolio-link').on('click', function (e) { e.preventDefault(); navigateTo('#portfolio'); });
    $('#contact-link').on('click', function (e) { e.preventDefault(); navigateTo('#contact'); });
});

// ===== CUSTOM CURSOR =====
$(function () {
    $(window).on('mousemove', function (e) {
        gsap.to('.cursor', { x: e.clientX, y: e.clientY, duration: 0.1 });
    });
    $('a, .menubar, .service-card, .portfolio-item, .navigation-close, .view-btn, .carousel-btn, .modal-close').hover(
        function () { gsap.to('.cursor', { width: 60, height: 60, backgroundColor: 'white', opacity: 1 }); },
        function () { gsap.to('.cursor', { width: 20, height: 20, backgroundColor: 'transparent', opacity: 1 }); }
    );
});

// ===== IMAGE CAROUSEL MODAL =====
$(function () {
    var currentSlide = 0;
    var allImages = [];

    function showSlide(index) {
        if (allImages.length === 0) return;
        if (index < 0) index = allImages.length - 1;
        if (index >= allImages.length) index = 0;
        currentSlide = index;
        $('#carouselImage').attr('src', allImages[index]);
        $('#carouselCurrent').text(index + 1);
        $('#carouselTotal').text(allImages.length);
    }

    $('.view-btn').on('click', function (e) {
        e.stopPropagation();
        var imagesStr = $(this).closest('.portfolio-item').attr('data-images');
        allImages = imagesStr.split(',');
        $('#carouselModal').addClass('active');
        showSlide(0);
    });

    $('.portfolio-item').on('click', function () {
        var imagesStr = $(this).attr('data-images');
        allImages = imagesStr.split(',');
        $('#carouselModal').addClass('active');
        showSlide(0);
    });

    $('#modalClose').on('click', function () {
        $('#carouselModal').removeClass('active');
    });

    $('#carouselPrev').on('click', function () {
        showSlide(currentSlide - 1);
    });

    $('#carouselNext').on('click', function () {
        showSlide(currentSlide + 1);
    });

    $('.modal-overlay').on('click', function (e) {
        if (e.target === this) {
            $(this).removeClass('active');
        }
    });

    $(document).on('keydown', function (e) {
        if (!$('#carouselModal').hasClass('active')) return;
        if (e.keyCode === 27) { $('#carouselModal').removeClass('active'); }
        if (e.keyCode === 37) { showSlide(currentSlide - 1); }
        if (e.keyCode === 39) { showSlide(currentSlide + 1); }
    });
});
