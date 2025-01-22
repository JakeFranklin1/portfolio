document.addEventListener('DOMContentLoaded', () => {

    const fadeElements1 = document.querySelectorAll('.fade-in-1');
    const fadeElements2 = document.querySelectorAll('.fade-in-2');
    const fadeElements3 = document.querySelectorAll('.fade-in-3');
    const fadeElements4 = document.querySelectorAll('.fade-in-4');
    const fadeElements5 = document.querySelectorAll('.fade-in-5');
    const fadeElements6 = document.querySelectorAll('.fade-in-6');


    const slideInLeftElements = document.querySelectorAll('.slide-in-left');
    const slideInBottomElements = document.querySelectorAll('.slide-in-bottom');

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback for browsers without IntersectionObserver
        slideInLeftElements.forEach(element => element.classList.add('active'));
        slideInBottomElements.forEach(element => element.classList.add('active'));
    } else {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '50px' // Trigger earlier
        };

        try {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Observe slide elements
            [...slideInLeftElements, ...slideInBottomElements].forEach(element => {
                try {
                    observer.observe(element);
                } catch (error) {
                    console.error('Error observing element:', error);
                    element.classList.add('active'); // Fallback
                }
            });
        } catch (error) {
            console.error('Error creating observer:', error);
            // Fallback if observer creation fails
            slideInLeftElements.forEach(element => element.classList.add('active'));
            slideInBottomElements.forEach(element => element.classList.add('active'));
        }
    }

    // Keep existing fade animations
    setTimeout(() => fadeElements1.forEach(element => element.classList.add('active')), 300);
    setTimeout(() => fadeElements2.forEach(element => element.classList.add('active')), 600);
    setTimeout(() => fadeElements3.forEach(element => element.classList.add('active')), 900);
    setTimeout(() => fadeElements4.forEach(element => element.classList.add('active')), 1200);
    setTimeout(() => fadeElements5.forEach(element => element.classList.add('active')), 1500);
    setTimeout(() => fadeElements6.forEach(element => element.classList.add('active')), 1800);
});
