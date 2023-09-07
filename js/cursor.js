(function($) {
    "use strict";
    if ($("body").hasClass("tt-magic-cursor")) {
        if ($(window).width() > 1024) {
            $(".magnetic-item").wrap('<div class="magnetic-wrap"></div>');
            if ($("a.magnetic-item").length) {
                $("a.magnetic-item").addClass("not-hide-cursor");
            }
            var $mouse = {
                x: 0,
                y: 0
            };
            var $pos = {
                x: 0,
                y: 0
            };
            var $ratio = 0.15;
            var $active = false;
            var $ball = $("#ball");
            var $ballWidth = 15;
            var $ballHeight = 15;
            var $ballOpacity = 1;
            var $ballBorderWidth = 2;
            gsap.set($ball, {
                xPercent: -50,
                yPercent: -50,
                width: $ballWidth,
                height: $ballHeight,
                borderWidth: $ballBorderWidth,
                opacity: $ballOpacity
            });
            document.addEventListener("mousemove", mouseMove);

            function mouseMove(e) {
                $mouse.x = e.clientX;
                $mouse.y = e.clientY;
            }
            gsap.ticker.add(updatePosition);

            function updatePosition() {
                if (!$active) {
                    $pos.x += ($mouse.x - $pos.x) * $ratio;
                    $pos.y += ($mouse.y - $pos.y) * $ratio;
                    gsap.set($ball, {
                        x: $pos.x,
                        y: $pos.y
                    });
                }
            }
            $(".magnetic-wrap").mousemove(function(e) {
                parallaxCursor(e, this, 2);
                callParallax(e, this);
            });

            function callParallax(e, parent) {
                parallaxIt(e, parent, parent.querySelector(".magnetic-item"), 25);
            }

            function parallaxIt(e, parent, target, movement) {
                var boundingRect = parent.getBoundingClientRect();
                var relX = e.clientX - boundingRect.left;
                var relY = e.clientY - boundingRect.top;
                gsap.to(target, {
                    duration: 0.3,
                    x: ((relX - boundingRect.width / 2) / boundingRect.width) * movement,
                    y: ((relY - boundingRect.height / 2) / boundingRect.height) * movement,
                    ease: Power2.easeOut
                });
            }

            function parallaxCursor(e, parent, movement) {
                var rect = parent.getBoundingClientRect();
                var relX = e.clientX - rect.left;
                var relY = e.clientY - rect.top;
                $pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
                $pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / movement;
                gsap.to($ball, {
                    duration: 0.3,
                    x: $pos.x,
                    y: $pos.y
                });
            }
            $("[data-cursor]").each(function() {
                $(this).on("mouseenter", function() {
                    $ball.addClass("ball-view").append('<div class="ball-view-inner"></div>');
                    $(".ball-view-inner").append($(this).attr("data-cursor"));
                    gsap.to($ball, {
                        duration: 0.3,
                        yPercent: -75,
                        width: 85,
                        height: 85,
                        opacity: 1,
                        borderWidth: 0
                    });
                    gsap.to(".ball-view-inner", {
                        duration: 0.3,
                        scale: 1,
                        autoAlpha: 1
                    });
                }).on("mouseleave", function() {
                    gsap.to($ball, {
                        duration: 0.3,
                        yPercent: -50,
                        width: $ballWidth,
                        height: $ballHeight,
                        opacity: $ballOpacity,
                        borderWidth: $ballBorderWidth
                    });
                    $ball.removeClass("ball-view").find(".ball-view-inner").remove();
                });
                $(this).addClass("not-hide-cursor");
            });
            $("[data-cursor2]").each(function() {
                $(this).on("mouseenter", function() {
                    $ball.addClass("ball-drag-slider").append('<div class="ball-view-inner"></div>');
                    $(".ball-view-inner").append($(this).attr("data-cursor2"));
                    gsap.to($ball, {
                        duration: 0.3,
                        yPercent: -75,
                        width: 85,
                        height: 85,
                        opacity: 1,
                        borderWidth: 0
                    });
                    gsap.to(".ball-view-inner", {
                        duration: 0.3,
                        scale: 1,
                        autoAlpha: 1
                    });
                }).on("mouseleave", function() {
                    gsap.to($ball, {
                        duration: 0.3,
                        yPercent: -50,
                        width: $ballWidth,
                        height: $ballHeight,
                        opacity: $ballOpacity,
                        borderWidth: $ballBorderWidth
                    });
                    $ball.removeClass("ball-drag-slider").find(".ball-view-inner").remove();
                });
                $(this).addClass("not-hide-cursor");
            });
            $(".cursor-close").each(function() {
                $(this).addClass("ball-close-enabled");
                $(this).on("mouseenter", function() {
                    $ball.addClass("ball-close-enabled");
                    $ball.append('<div class="ball-close">Close</div>');
                    gsap.to($ball, {
                        duration: 0.3,
                        yPercent: -75,
                        width: 80,
                        height: 80,
                        opacity: 1
                    });
                    gsap.from(".ball-close", {
                        duration: 0.3,
                        scale: 0,
                        autoAlpha: 0
                    });
                }).on("mouseleave click", function() {
                    $ball.removeClass("ball-close-enabled");
                    gsap.to($ball, {
                        duration: 0.3,
                        yPercent: -50,
                        width: $ballWidth,
                        height: $ballHeight,
                        opacity: $ballOpacity
                    });
                    $ball.find(".ball-close").remove();
                });
                $(".cursor-close a, .cursor-close button, .cursor-close .tt-btn, .cursor-close .hide-cursor").not(".not-hide-cursor").on("mouseenter", function() {
                    $ball.removeClass("ball-close-enabled");
                }).on("mouseleave", function() {
                    $ball.addClass("ball-close-enabled");
                });
            });

            $(document).on("mouseleave", function() {
                gsap.to("#magic-cursor", {
                    duration: 0.3,
                    autoAlpha: 0
                });
            }).on("mouseenter", function() {
                gsap.to("#magic-cursor", {
                    duration: 0.3,
                    autoAlpha: 1
                });
            });
            $(document).mousemove(function() {
                gsap.to("#magic-cursor", {
                    duration: 0.3,
                    autoAlpha: 1
                });
            });
        }
    }
}(jQuery));