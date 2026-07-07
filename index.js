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
'gallery/2c4ed2d6-cdc7-4a9d-8f14-7c1820684ce7.jpg',
'gallery/340795e0-4e27-4a54-b581-6324d7fe0883.jpg',
'gallery/350986a7-1990-40bb-aa82-e121584610b1.jpg',
'gallery/3cabecaf-0af6-4cf4-8ce7-666afbbd5d76.jpg',
'gallery/560a5205-ec52-451c-89da-546bc22f9123.jpg',
'gallery/56ca9d2e-0cc4-41f3-8abd-a02aef19ade3.jpg',
'gallery/5a893cc8-353f-4aa0-9551-bcc4f541ea72.jpg',
'gallery/5a9e6e3e-03ba-49de-a77a-0dcc6e7c6fc6.jpg',
'gallery/5ed08322-d7b0-4e4c-9e53-56ad51909a62.jpg',
'gallery/6037a227-9ed5-428d-9363-a3225946844b.jpg',
'gallery/63d8cd63-7466-498e-a2e5-56613c9ab699.jpg',
'gallery/66384634-fe83-49b7-a63a-627cb1aa7945.jpg',
'gallery/67b9f518-984c-49a0-8baa-32ed2ea79d58.jpg',
'gallery/68b496aa-601c-4c08-8c16-fea470e9c236.jpg',
'gallery/6a47b3cd-7a92-4eec-9db5-8ea6a682bb20.jpg',
'gallery/7414d2c8-0def-4f57-827b-b25780eb1547.jpg',
'gallery/79e1d2e1-17af-4b14-8263-03532c177da2.jpg',
'gallery/7a41f11c-4dee-4df4-82b7-5d8a00921fc1.jpg',
'gallery/7bdb795c-5db8-4846-a4bd-22d36099b651.jpg',
'gallery/7c4a075e-9b01-40b6-a648-d6018e678bc5.jpg',
'gallery/7d4c4de3-9dc7-4f15-baf0-0efb81800cdc.jpg',
'gallery/816d31ce-bd79-4701-aaa3-d61c7b7559b3.jpg',
'gallery/82f4be28-fb79-4de3-b0d5-e37f177da1df.jpg',
'gallery/842204e9-6e73-49bc-9043-5798a61e107f.jpg',
'gallery/84edc092-8e5b-4d93-9138-937cccbbd666.jpg',
'gallery/8635e425-c183-4705-8120-4ee254a9b38b.jpg',
'gallery/86540dba-889e-44c6-b4e1-1e1bdf818c06.jpg',
'gallery/87106308-c2f3-4182-aad3-007bdfd6a06e.jpg',
'gallery/89c73076-c75b-45d1-9c99-cd63caa72ba3.jpg',
'gallery/8ca699bb-6585-4f10-8dda-be84264fcc04.jpg',
'gallery/9473eaa0-a04f-4783-8289-e56c866c690e.jpg',
'gallery/949786f7-2288-442e-ab7b-c7c2e3acdc81.jpg',
'gallery/959e5dd0-4a68-426c-afc8-10c830a7af0c.jpg',
'gallery/96c0e63b-a766-4730-bc9c-f7d789b8a391.jpg',
'gallery/9b15d2b9-0198-45b9-bcbc-d41625796eab.jpg',
'gallery/9b4b41bc-f7c4-44e1-b307-e8e4e4272549.jpg',
'gallery/9f06a608-4c76-4a44-ac10-178d620f6503.jpg',
'gallery/9f75de2a-cbc4-4d4f-aabf-ffff576d1180.jpg',
'gallery/9fc055bd-8cb1-4f09-9ac3-e56c62081377.jpg',
'gallery/IMG-20260706-WA0005.jpg',
'gallery/IMG-20260706-WA0006.jpg',
'gallery/IMG-20260706-WA0007.jpg',
'gallery/IMG-20260706-WA0008.jpg',
'gallery/IMG-20260706-WA0009.jpg',
'gallery/IMG-20260706-WA0010.jpg',
'gallery/IMG-20260706-WA0011.jpg',
'gallery/IMG-20260706-WA0012.jpg',
'gallery/IMG-20260706-WA0013.jpg',
'gallery/IMG-20260706-WA0014.jpg',
'gallery/IMG-20260706-WA0015.jpg',
'gallery/IMG-20260706-WA0016.jpg',
'gallery/IMG-20260706-WA0017.jpg',
'gallery/IMG-20260706-WA0018.jpg',
'gallery/IMG-20260706-WA0019.jpg',
'gallery/IMG-20260706-WA0020.jpg',
'gallery/IMG-20260706-WA0021.jpg',
'gallery/IMG-20260706-WA0022.jpg',
'gallery/IMG-20260706-WA0023.jpg',
'gallery/IMG-20260706-WA0024.jpg',
'gallery/IMG-20260706-WA0025.jpg',
'gallery/IMG-20260706-WA0026.jpg',
'gallery/IMG-20260706-WA0027.jpg',
'gallery/IMG-20260706-WA0028.jpg',
'gallery/IMG-20260706-WA0029.jpg',
'gallery/IMG-20260706-WA0030.jpg',
'gallery/IMG-20260706-WA0032.jpg',
'gallery/IMG-20260706-WA0033.jpg',
'gallery/IMG-20260706-WA0034.jpg',
'gallery/IMG-20260706-WA0035.jpg',
'gallery/IMG-20260706-WA0037.jpg',
'gallery/IMG-20260706-WA0038.jpg',
'gallery/IMG-20260706-WA0039.jpg',
'gallery/IMG-20260706-WA0040.jpg',
'gallery/IMG-20260706-WA0041.jpg',
'gallery/IMG-20260706-WA0042.jpg',
'gallery/IMG-20260706-WA0043.jpg',
'gallery/IMG-20260706-WA0046.jpg',
'gallery/IMG-20260707-WA0000.jpg',
'gallery/IMG-20260707-WA0001.jpg',
'gallery/IMG-20260707-WA0002.jpg',
'gallery/IMG-20260707-WA0003.jpg',
'gallery/IMG-20260707-WA0004.jpg',
'gallery/IMG-20260707-WA0005.jpg',
'gallery/IMG-20260707-WA0006.jpg',
'gallery/IMG-20260707-WA0007.jpg',
'gallery/IMG-20260707-WA0008.jpg',
'gallery/IMG-20260707-WA0009.jpg',
'gallery/IMG-20260707-WA0010.jpg',
'gallery/IMG-20260707-WA0011.jpg',
'gallery/IMG-20260707-WA0012.jpg',
'gallery/IMG-20260707-WA0013.jpg',
'gallery/IMG-20260707-WA0014.jpg',
'gallery/IMG-20260707-WA0015.jpg',
'gallery/IMG-20260707-WA0016.jpg',
'gallery/IMG-20260707-WA0017.jpg',
'gallery/IMG-20260707-WA0018.jpg',
'gallery/IMG-20260707-WA0019.jpg',
'gallery/IMG-20260707-WA0020.jpg',
'gallery/IMG-20260707-WA0021.jpg',
'gallery/IMG-20260707-WA0022.jpg',
'gallery/IMG-20260707-WA0023.jpg',
'gallery/IMG-20260707-WA0024.jpg',
'gallery/IMG-20260707-WA0025.jpg',
'gallery/IMG-20260707-WA0026.jpg',
'gallery/IMG-20260707-WA0027.jpg',
'gallery/IMG-20260707-WA0028.jpg',
'gallery/IMG-20260707-WA0029.jpg',
'gallery/IMG-20260707-WA0030.jpg',
'gallery/IMG-20260707-WA0031.jpg',
'gallery/IMG-20260707-WA0032.jpg',
'gallery/IMG-20260707-WA0033.jpg',
'gallery/IMG-20260707-WA0034.jpg',
'gallery/IMG-20260707-WA0035.jpg',
'gallery/IMG-20260707-WA0036.jpg',
'gallery/IMG-20260707-WA0037.jpg',
'gallery/IMG-20260707-WA0038.jpg',
'gallery/IMG-20260707-WA0039.jpg',
'gallery/IMG-20260707-WA0040.jpg',
'gallery/IMG-20260707-WA0041.jpg',
'gallery/IMG-20260707-WA0042.jpg',
'gallery/a2762585-683a-47f8-a69c-c231a193f009.jpg',
'gallery/a2f3450d-d7e4-41f5-aa27-9476dd34f592.jpg',
'gallery/a3e0c941-2e44-421d-bb81-bc42e006a031.jpg',
'gallery/a574ca96-b424-49dc-9198-f743fb8ac032.jpg',
'gallery/a9c619cf-5111-467d-883a-182120469376.jpg',
'gallery/b1109b33-952b-4c71-9342-e99c5ac4fa1e.jpg',
'gallery/b13d115e-11fb-496a-8f2e-645c207c9c9d.jpg',
'gallery/b19e41e7-bd18-4fa2-af72-c713bff2276a.jpg',
'gallery/b3e60e0d-22fe-4de9-86a0-aa502bf31d5b.jpg',
'gallery/b53361c3-1d06-45d5-9e36-5a98e2d3990e.jpg',
'gallery/b7a3f150-2aa1-41cc-bbfd-e1d5333d3529.jpg',
'gallery/b8807e9b-2cc6-49f6-8f04-3cb70a339839.jpg',
'gallery/b8b3c4a9-1a87-4399-8aba-a42e6ba322fa.jpg',
'gallery/b97778e1-27fa-4e59-b326-ab62306efd89.jpg',
'gallery/bd71ffe2-aadd-4b29-bcef-4787bbc0d08d.jpg',
'gallery/bfee1a27-6c21-4bd4-8d68-d19aa4c1be24.jpg',
'gallery/c05b765f-a7fd-43b9-a8a8-c2598a7d8447.jpg',
'gallery/c5f88f52-02ec-4635-b753-ad64ab523b58.jpg',
'gallery/c64c52a5-5b31-4cf4-bb73-42ff690f0b58.jpg',
'gallery/ca523624-12c6-4d8a-a198-63ff6f2a2d08.jpg',
'gallery/cb8df6b0-1c27-4604-955b-5b24f6ba8098.jpg',
'gallery/cd39e757-7d6e-4848-80f2-2afcfcc997f7.jpg',
'gallery/cf11b6f5-1207-4aec-ae93-ed51f365e4bc.jpg',
'gallery/d652622b-6bb9-4b2a-8f3e-6374341978df.jpg',
'gallery/d7d0c9f3-10ce-4c49-8f09-b9839e250e8c.jpg',
'gallery/d956a5f1-c56e-4efe-b8a4-542f19b1a2e6.jpg',
'gallery/da4c6b51-ae9f-47b5-8360-61aa0dc7f6a1.jpg',
'gallery/dae53872-f0d9-47bd-8bba-e9eeb8176b3c.jpg',
'gallery/db14f07f-7b59-4e49-8dd7-c50b76f94328.jpg',
'gallery/db79112f-a8dc-4e0d-b982-24d5cc6c7344.jpg',
'gallery/e30725d3-e379-4483-9e77-f02aaf2869eb.jpg',
'gallery/e3503255-ef51-48d0-98c6-55e2fd51ba4a.jpg',
'gallery/e3590e70-beac-4c8d-ba1b-cac86ef805ae.jpg',
'gallery/e60dc66e-a1b4-41be-af63-d3d8ed96ea06.jpg',
'gallery/e7436289-7c1a-41e5-9acb-6f92f6d4c92e.jpg',
'gallery/e896b47f-52aa-48d6-af9b-4440b9a3aa09.jpg',
'gallery/ea480ccb-cf42-442d-8e4b-1a720c089602.jpg',
'gallery/eaa3ea12-76b1-4aa6-abd0-4402c2822333.jpg',
'gallery/eb620f1f-3d5e-4b50-bc2b-f665f9a1dac8.jpg',
'gallery/ec26ce27-59b8-44e7-bc16-2a819885933b.jpg',
'gallery/ec29c503-6140-4ec4-b74e-94d97ff0c0d1.jpg',
'gallery/ee712097-345f-4169-809e-7a42d35e6329.jpg',
'gallery/ee7bff5d-0cd1-4b0f-8486-7e4665d368f7.jpg',
'gallery/f0d63f3f-0995-4cac-a7cb-56bea4f6c899.jpg',
'gallery/f91e4f33-8168-4397-9475-0dd2b4cd8e62.jpg',
'gallery/fabbc739-682c-4d55-9fdf-8b95e897a3f0.jpg'
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
