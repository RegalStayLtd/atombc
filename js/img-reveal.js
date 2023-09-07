;
(function($) {

    "use strict";

    var imgReveal = function() {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.2
        };

        let revealCallback = (entries, self) => {
            entries.forEach(entry => {
                let container = entry.target;
                let img = entry.target.querySelector("img");
                const easeInOut = "power3.out";
                const revealAnim = gsap.timeline({
                    ease: easeInOut
                });

                if (entry.isIntersecting) {
                    revealAnim.set(container, {
                        visibility: "visible"
                    });
                    revealAnim.fromTo(
                        container, {
                            clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
                            webkitClipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)"
                        }, {
                            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                            webkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                            duration: 1,
                            ease: easeInOut
                        }
                    );
                    revealAnim.from(img, 4, {
                        scale: 1.5,
                        ease: easeInOut,
                        delay: -5
                    });
                    self.unobserve(entry.target);
                }
            });
        };

        let revealObserver = new IntersectionObserver(revealCallback, options);

        document.querySelectorAll(".ht-img-effect .ht-img-effect-image").forEach(reveal => {
            revealObserver.observe(reveal);
        });

    }
    jQuery(function() {
        imgReveal();
    });

})(jQuery);