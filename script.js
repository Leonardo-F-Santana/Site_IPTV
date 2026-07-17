document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. HERO VIDEO FADEOUT ON SCROLL
    // ==========================================
    const videoBg = document.getElementById('videoBg');
    const overlay = document.getElementById('heroOverlay');

    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;
        
        // Capping the effect at 600px of scroll
        if(scrollY <= 600) {
            // Calculate opacity for the video (1 to 0)
            let videoOpacity = 1 - (scrollY / 400);
            if(videoOpacity < 0) videoOpacity = 0;
            videoBg.style.opacity = videoOpacity;

            // Calculate opacity for the overlay gradient to make it darker (0.5 to 1)
            let overlayOpacity = 0.5 + (scrollY / 600) * 0.5;
            if(overlayOpacity > 1) overlayOpacity = 1;
            
            overlay.style.background = `linear-gradient(to bottom, rgba(10,10,10,${overlayOpacity}) 0%, rgba(10,10,10,1) 100%)`;
        }
    });

    // ==========================================
    // 2. SCROLL REVEAL ANIMATION
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // ==========================================
    // 3. SMOOTH SCROLLING FOR INTERNAL LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
