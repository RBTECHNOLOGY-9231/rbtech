// ===== LOADER =====
$(window).on('load', function () {
    gsap.to('#loader', 2, { y: '-100%' });
    gsap.to('#loader', 2, { opacity: 0 });
    gsap.to('#loader', 0, { display: 'none', delay: 2 });
    gsap.to('#header', 0, { display: 'flex', delay: 2 });
});

// ===== MAIN INITIALIZATION =====
$(function () {
    // --- Navigation Open/Close ---
    $('.menubar').on('click', function () {
        $('body').addClass('menu-open');
        gsap.to('#navigation-content', { duration: 0.6, y: '0%', ease: 'expo.inOut' });
    });
    $('.navigation-close').on('click', function () {
        $('body').removeClass('menu-open');
        gsap.to('#navigation-content', { duration: 0.6, y: '-100%', ease: 'expo.inOut' });
    });

    // --- Rotating Text ---
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

    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }

    // --- Page Navigation ---
    function navigateTo(showId) {
        gsap.to('#navigation-content', 0, { display: 'none', delay: 0.7 });
        gsap.to('#navigation-content', 0, { y: '-100%', delay: 0.7 });
        
        // Use jQuery for reliable display toggling
        $('#header, #about, #portfolio, #contact, #gallery').hide();
        
        gsap.to('#breaker', 0, { display: 'block' });
        gsap.to('#breaker-two', 0, { display: 'block', delay: 0.1 });
        gsap.to('#breaker', 0, { display: 'none', delay: 2 });
        gsap.to('#breaker-two', 0, { display: 'none', delay: 2 });
        
        var displayType = (showId === '#header') ? 'flex' : 'block';
        setTimeout(function() {
            $(showId).css('display', displayType);
        }, 700);
        
        if (showId === '#header') {
            setTimeout(function() {
                window.dispatchEvent(new Event('resize'));
            }, 1500);
        }

        gsap.to('#navigation-content', 0, { display: 'flex', delay: 2 });
        window.scrollTo(0, 0);
    }

    $('#home-link').on('click', function (e) { e.preventDefault(); navigateTo('#header'); });
    $('#about-link').on('click', function (e) { e.preventDefault(); navigateTo('#about'); });
    $('#portfolio-link').on('click', function (e) { e.preventDefault(); navigateTo('#portfolio'); });
    $('#gallery-link').on('click', function (e) { e.preventDefault(); navigateTo('#gallery'); });
    $('#contact-link').on('click', function (e) { e.preventDefault(); navigateTo('#contact'); });

    // --- Custom Cursor ---
    $(window).on('mousemove', function (e) {
        gsap.to('.cursor', { x: e.clientX, y: e.clientY, duration: 0.1 });
    });
    $('a, .menubar, .service-card, .portfolio-item, .navigation-close, .view-btn, .carousel-btn, .modal-close').hover(
        function () { gsap.to('.cursor', { width: 60, height: 60, backgroundColor: 'white', opacity: 1 }); },
        function () { gsap.to('.cursor', { width: 20, height: 20, backgroundColor: 'transparent', opacity: 1 }); }
    );

    // --- Image Carousel Modal ---
    var carouselState = {
        currentSlide: 0,
        allImages: []
    };

    function showSlide(index) {
        if (carouselState.allImages.length === 0) return;
        
        var idx = parseInt(index, 10);
        if (isNaN(idx)) return;

        if (idx < 0) idx = carouselState.allImages.length - 1;
        if (idx >= carouselState.allImages.length) idx = 0;
        
        carouselState.currentSlide = idx;
        $('#carouselImage').attr('src', carouselState.allImages[idx]);
        $('#carouselCurrent').text(idx + 1);
        $('#carouselTotal').text(carouselState.allImages.length);
    }

    $('.view-btn').on('click', function (e) {
        e.stopPropagation();
        var imagesStr = $(this).closest('.portfolio-item').attr('data-images');
        if (imagesStr) {
            carouselState.allImages = imagesStr.split(',');
            $('#carouselModal').addClass('active');
            showSlide(0);
        }
    });

    $('.portfolio-item').on('click', function (e) {
        e.stopPropagation();
        var imagesStr = $(this).attr('data-images');
        if (imagesStr) {
            carouselState.allImages = imagesStr.split(',');
            $('#carouselModal').addClass('active');
            showSlide(0);
        }
    });

    $('#modalClose').on('click', function () {
        $('#carouselModal').removeClass('active');
    });

    $('#carouselPrev').on('click', function () {
        showSlide(carouselState.currentSlide - 1);
    });

    $('#carouselNext').on('click', function () {
        showSlide(carouselState.currentSlide + 1);
    });

    $('.modal-overlay').on('click', function (e) {
        if (e.target === this) {
            $(this).removeClass('active');
        }
    });

    $(document).on('keydown', function (e) {
        if (!$('#carouselModal').hasClass('active')) return;
        if (e.keyCode === 27) { $('#carouselModal').removeClass('active'); }
        if (e.keyCode === 37) { showSlide(carouselState.currentSlide - 1); }
        if (e.keyCode === 39) { showSlide(carouselState.currentSlide + 1); }
    });

    // --- Gallery Logic ---
    var galleryImages = [
        'gallery/project-1.jpg', 'gallery/project-2.png', 'gallery/project-3.jpg',
        'gallery/project-4.png', 'gallery/project-5.png', 'gallery/project-6.png',
        'gallery/project-7.png', 'gallery/project-8.jpg', 'gallery/project-9.png'
    ];
    var visibleCount = 6;

    function renderGallery() {
        var grid = $('#galleryGrid');
        grid.empty();
        for (let i = 0; i < Math.min(visibleCount, galleryImages.length); i++) {
            var imgPath = galleryImages[i];
            var item = $('<div class="gallery-item" data-index="' + i + '"><img src="' + imgPath + '"></div>');
            item.on('click', function(e) {
                e.stopPropagation();
                
                // 1. Get all current gallery items
                var items = $('.gallery-item').get();
                
                // 2. Sort them by visual position (top then left)
                items.sort(function(a, b) {
                    var topA = a.offsetTop;
                    var topB = b.offsetTop;
                    if (topA !== topB) return topA - topB;
                    return a.offsetLeft - b.offsetLeft;
                });
                
                // 3. Create a new array of images in this visual order
                var visualImages = [];
                items.forEach(function(item) {
                    var idx = $(item).data('index');
                    visualImages.push(galleryImages[idx]);
                });
                
                // 4. Find the index of the clicked image in the visual list
                var visualIndex = items.indexOf(this);
                
                // 5. Update carousel state with the visually sorted list
                carouselState.allImages = visualImages; 
                $('#carouselModal').addClass('active');
                showSlide(visualIndex);
            });
            grid.append(item);
        }
        if (visibleCount < galleryImages.length) {
            $('#view-more-btn').show();
        } else {
            $('#view-more-btn').hide();
        }
    }

    $('#view-more-btn').on('click', function() {
        visibleCount += 6;
        renderGallery();
    });

    renderGallery();

});
