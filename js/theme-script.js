/* ------------------------------------------------
  Project:   Cove - Architecture & Interior WordPress Theme
  Author:    ThemeHt
------------------------------------------------ */
/* ------------------------
    Table of Contents

  1. Predefined Variables
  2. Preloader  
  3. Menu  
  4. Counter
  5. Magnific Popup
  6. Scroll to top
  7. Fixed Header
  8. ProgressBar
  9. Search
  10. Accordion
  11. HT Window load and functions   

------------------------ */

(function($) {

    "use strict";

    /*------------------------------------
      HT Predefined Variables
    --------------------------------------*/
    var jQuerywindow = jQuery(window),
        jQuerydocument = jQuery(document),
        jQuerybody = jQuery('body');

    //Check if function exists
    jQuery.fn.exists = function() {
        return this.length > 0;
    };


    /*------------------------------------
      HT PreLoader
    --------------------------------------*/
    function preloader() {
        jQuery('#ht-preloader').fadeOut();
    };


    /*------------------------------------
      HT Menu
    --------------------------------------*/
    function dropdown() {
        $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
            if (!$(this).next().hasClass('show')) {
                $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
            }
            var $subMenu = $(this).next(".dropdown-menu");
            $subMenu.toggleClass('show');

            $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
                $('.dropdown-submenu .show').removeClass("show");
            });

            return false;
        });
    };


    /*------------------------------------
      HT Counter
    --------------------------------------*/
    function counter() {
        var elementSelector = jQuery('.count-number');
        elementSelector.each(function() {
            elementSelector.appear(function(e) {
                var el = this;
                var updateData = jQuery(el).attr("data-count");
                var od = new Odometer({
                    el: el,
                    format: 'd',
                    duration: 2000
                });
                od.update(updateData);
            });
        });
    };



    /*------------------------------------
      HT Scroll to top
    --------------------------------------*/
    function scrolltop() {
        //Scroll back to top

        var progressPath = document.querySelector('.scroll-top path');
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        var updateProgress = function() {
            var scroll = jQuery(window).scrollTop();
            var height = jQuery(document).height() - jQuery(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        jQuery(window).scroll(updateProgress);
        var offset = 50;
        var duration = 550;
        jQuery(window).on('scroll', function() {
            if (jQuery(this).scrollTop() > offset) {
                jQuery('.scroll-top').addClass('active-progress');
            } else {
                jQuery('.scroll-top').removeClass('active-progress');
            }
        });
        jQuery('.scroll-top').on('click', function(event) {
            event.preventDefault();
            jQuery('html, body').animate({
                scrollTop: 0
            }, duration);
            return false;
        })
    };


    /*------------------------------------
      HT Fixed Header
    --------------------------------------*/
    function fxheader() {
        jQuery(window).on('scroll', function() {
            var sticky = jQuery('#header-wrap'),
                scroll = jQuery(window).scrollTop();

            if (scroll >= 300) sticky.addClass('fixed-header');
            else sticky.removeClass('fixed-header');
        });
    };


    /*------------------------------------
      HT ProgressBar
    --------------------------------------*/
    function progressbar() {
        var progressBar = jQuery('.progress');
        if (progressBar.length) {
            progressBar.each(function() {
                var Self = jQuery(this);
                Self.appear(function() {
                    var progressValue = Self.data('value');

                    Self.find('.progress-bar').animate({
                        width: progressValue + '%'
                    }, 1000);
                });
            })
        }
    };


    /*------------------------------------
      HT Search
    --------------------------------------*/
    function search() {
        // Search Toggle
        jQuery("#search-input-box").hide();
        jQuery("#search, #search-sticky").on("click", function() {
            jQuery("#search-input-box").slideToggle();
            jQuery("#search-input").focus();
        });
        jQuery("#close-search").on("click", function() {
            jQuery('#search-input-box').slideUp(500);
        });
    };

    /*------------------------------------------
      HT Text Color, Background Color And Image
    ---------------------------------------------*/
    function databgcolor() {
        jQuery('[data-bg-color]').each(function(index, el) {
            jQuery(el).css('background-color', jQuery(el).data('bg-color'));
        });
        jQuery('[data-text-color]').each(function(index, el) {
            jQuery(el).css('color', jQuery(el).data('text-color'));
        });
        jQuery('[data-bg-img]').each(function() {
            jQuery(this).css('background-image', 'url(' + jQuery(this).data("bg-img") + ')');
        });
    };


    /*------------------------------------
      HT Image Parallax
    --------------------------------------*/
    function imgeffect() {
        gsap.to(".bg-parallax", {
            backgroundPosition: `50% ${-innerHeight / 2}px`,
            ease: "none",
            scrollTrigger: {
                trigger: ".bg-parallax",
                scrub: true
            },
        });

    };


    /*------------------------------------
      HT Button Hover
    --------------------------------------*/
    function btneffect() {
        var hoverMouse = function(jQueryel) {
            jQueryel.each(function() {
                var jQueryself = jQuery(this);
                var hover = false;
                var offsetHoverMax = jQueryself.attr("offset-hover-max") || 0.7;
                var offsetHoverMin = jQueryself.attr("offset-hover-min") || 0.5;

                var attachEventsListener = function() {
                    jQuery(window).on("mousemove", function(e) {
                        //
                        var hoverArea = hover ? offsetHoverMax : offsetHoverMin;

                        // cursor
                        var cursor = {
                            x: e.clientX,
                            y: e.pageY
                        };

                        // size
                        var width = jQueryself.outerWidth();
                        var height = jQueryself.outerHeight();

                        // position
                        var offset = jQueryself.offset();
                        var elPos = {
                            x: offset.left + width / 2,
                            y: offset.top + height / 2
                        };

                        // comparaison
                        var x = cursor.x - elPos.x;
                        var y = cursor.y - elPos.y;

                        // dist
                        var dist = Math.sqrt(x * x + y * y);

                        // mutex hover
                        var mutHover = false;

                        // anim
                        if (dist < width * hoverArea) {
                            mutHover = true;
                            if (!hover) {
                                hover = true;
                            }
                            onHover(x, y);
                        }

                        // reset
                        if (!mutHover && hover) {
                            onLeave();
                            hover = false;
                        }
                    });
                };

                var onHover = function(x, y) {
                    TweenMax.to(jQueryself, 0.4, {
                        x: x * 0.8,
                        y: y * 0.8,
                        //scale: .9,
                        rotation: x * 0.05,
                        ease: Power2.easeOut
                    });
                };
                var onLeave = function() {
                    TweenMax.to(jQueryself, 0.7, {
                        x: 0,
                        y: 0,
                        scale: 1,
                        rotation: 0,
                        ease: Elastic.easeOut.config(1.2, 0.4)
                    });
                };

                attachEventsListener();
            });
        };

        hoverMouse(jQuery(".rounded-button"));




    };


    /*------------------------------------
      HT Text Animation
    --------------------------------------*/
    function texteffct() {
        if (jQuery(".ht-split-text").length) {
            Splitting();
            var themeht_animation_text = function(container, item) {
                jQuery(window).scroll(function() {
                    var windowBottom = jQuery(this).scrollTop() + jQuery(this).innerHeight();
                    jQuery(container).each(function(index, value) {
                        var objectBottom = jQuery(this).offset().top + jQuery(this).outerHeight() * 0.1;

                        if (objectBottom < windowBottom) {
                            var seat = jQuery(this).find(item);
                            for (var i = 0; i < seat.length; i++) {
                                (function(index) {
                                    setTimeout(function() {
                                        seat.eq(index).addClass('ht-text-animated');
                                    }, 200 * index);
                                })(i);
                            }
                        }
                    });
                }).scroll();
            };

            jQuery(function() {
                themeht_animation_text(".theme-title", ".splitting");
            });
        }

    };


    /*------------------------------------
      HT Countdown
    --------------------------------------*/
    function countdown() {
        jQuery('.countdown').each(function() {
            var jQuerythis = jQuery(this),
                finalDate = jQuery(this).data('countdown');
            jQuerythis.countdown(finalDate, function(event) {
                jQuery(this).html(event.strftime('<li><span>%-D</span><p>Days</p></li>' + '<li><span>%-H</span><p>Hours</p></li>' + '<li><span>%-M</span><p>Minutes</p></li>' + '<li><span>%S</span><p>Seconds</p></li>'));
            });
        });
    };


    /*------------------------------------
      HT btnproduct
    --------------------------------------*/
    function btnproduct() {
        jQuery('.btn-product-up').on('click', function(e) {
            e.preventDefault();
            var numProduct = Number(jQuery(this).next().val());
            if (numProduct > 1) jQuery(this).next().val(numProduct - 1);
        });
        jQuery('.btn-product-down').on('click', function(e) {
            e.preventDefault();
            var numProduct = Number(jQuery(this).prev().val());
            jQuery(this).prev().val(numProduct + 1);
        });
    };



    function swiperslider() {

        var portfolioswiper = new Swiper(".portfolio-swiper", {
            slidesPerView: 2,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 1,
                disableOnInteraction: false
            },
            speed: 30000,
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                640: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                768: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
            },
        });


        var portfolioswiper2 = new Swiper(".portfolio-swiper2", {
            slidesPerView: 3,
            spaceBetween: 30,
            speed: 1500,
            autoplay: {
                delay: 7000,
                disableOnInteraction: false,
            },
            pagination: {
                el: "#portfolio-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: "#portfolio-swiper-button-next",
                prevEl: "#portfolio-swiper-button-prev",
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                640: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });

        var teamswiper = new Swiper(".team-swiper", {
            slidesPerView: 3,
            spaceBetween: 30,
            speed: 1500,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            pagination: {
                el: "#team-pagination",
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                640: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });

        var postswiper = new Swiper(".post-swiper", {
            slidesPerView: 3,
            spaceBetween: 30,
            speed: 1500,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            pagination: {
                el: "#post-pagination",
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                640: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });


        var imgswiper = new Swiper(".verticle-img-swiper", {
            slidesPerView: 1,
            loop: true,
            speed: 1500,
            effect: "cube",
            grabCursor: true,
            cubeEffect: {
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94,
            },
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
        });

        var bannerswiper = new Swiper(".banner-swiper", {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 1500,
            parallax: true,
            autoplay: {
                delay: 7000,
                disableOnInteraction: false,
            },
            pagination: {
                el: "#banner-pagination",
                type: "fraction",
            },
            loop: true,
            navigation: {
                nextEl: "#banner-swiper-button-next",
                prevEl: "#banner-swiper-button-prev",
            },
        });


        var serviceswiper = new Swiper(".service-swiper", {
            slidesPerView: 3,
            spaceBetween: 30,
            speed: 1500,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            pagination: {
                el: "#service-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: "#service-swiper-button-next",
                prevEl: "#service-swiper-button-prev",
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                640: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });


        var marqueeimgswiper = new Swiper(".marquee-img-swiper", {
            slidesPerView: 2,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 1,
                disableOnInteraction: false
            },
            speed: 30000,
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                640: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                768: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
            },
        });

    };

    /*------------------------------------
      HT Contact Form
    --------------------------------------*/
    function contactform() {
        // when the form is submitted
        jQuery('#contact-form, #main-form').on('submit', function(e) {

            // if the validator does not prevent form submit
            if (!e.isDefaultPrevented()) {
                var url = "php/contact.php";

                // POST values in the background the the script URL
                jQuery.ajax({
                    type: "POST",
                    url: url,
                    data: jQuery(this).serialize(),
                    success: function(data) {
                        // data = JSON object that contact.php returns

                        // we recieve the type of the message: success x danger and apply it to the 
                        var messageAlert = 'alert-' + data.type;
                        var messageText = data.message;

                        // let's compose Bootstrap alert box HTML
                        var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';

                        // If we have messageAlert and messageText
                        if (messageAlert && messageText) {
                            // inject the alert to .messages div in our form
                            jQuery('#contact-form, #main-form').find('.messages').html(alertBox).show().delay(2000).fadeOut('slow');
                            // empty the form
                            jQuery('#contact-form, #main-form')[0].reset();
                        }
                    }
                });
                return false;
            }
        })
    };

    /*------------------------------------
      HT Window load and functions
    --------------------------------------*/
    jQuery(document).ready(function() {
        dropdown(),
            counter(),
            scrolltop(),
            fxheader(),
            progressbar(),
            search(),
            databgcolor(),
            imgeffect(),
            btneffect(),
            texteffct(),
            countdown(),
            btnproduct(),
            swiperslider(),
            contactform();
    });

    jQuery(window).on('load', function() {
        preloader();
    });

})(jQuery);