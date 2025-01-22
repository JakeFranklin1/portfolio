/* filepath: /Users/jake/personal-coding/portfolio/src/resources/js/main.js *//* filepath: /Users/jake/personal-coding/portfolio/src/resources/js/main.js */
document.addEventListener('DOMContentLoaded', () => {
    const slideInLeftElements = document.querySelectorAll('.slide-in-left');
    const slideInBottomElements = document.querySelectorAll('.slide-in-bottom');
    const fadeElements1 = document.querySelectorAll('.fade-in-1');
    const fadeElements2 = document.querySelectorAll('.fade-in-2');
    const fadeElements3 = document.querySelectorAll('.fade-in-3');
    const fadeElements4 = document.querySelectorAll('.fade-in-4');
    const fadeElements5 = document.querySelectorAll('.fade-in-5');
    const fadeElements6 = document.querySelectorAll('.fade-in-6');

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    slideInLeftElements.forEach(element => {
        observer.observe(element);
    });

    slideInBottomElements.forEach(element => {
        observer.observe(element);
    });

    // Stagger the animations for hero text
    setTimeout(() => {
        fadeElements1.forEach(element => element.classList.add('active'));
    }, 300);

    setTimeout(() => {
        fadeElements2.forEach(element => element.classList.add('active'));
    }, 600);

    setTimeout(() => {
        fadeElements3.forEach(element => element.classList.add('active'));
    }, 900);

    setTimeout(() => {
        fadeElements4.forEach(element => element.classList.add('active'));
    }, 1200);

    setTimeout(() => {
        fadeElements5.forEach(element => element.classList.add('active'));
    }, 1500);

    setTimeout(() => {
        fadeElements6.forEach(element => element.classList.add('active'));
    }, 1800);

    // Ensure animations only happen once per visit
    if (!localStorage.getItem('animationsPlayed')) {
        setTimeout(() => {
            slideInLeftElements.forEach(element => element.classList.add('active'));
            slideInBottomElements.forEach(element => element.classList.add('active'));
        }, 300);

        localStorage.setItem('animationsPlayed', 'true');
    }
});
