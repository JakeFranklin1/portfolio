document.addEventListener('DOMContentLoaded', () => {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    const footer = document.querySelector('.footer');
    const scrollToTopBtn = document.querySelector('#scroll-to-top');
    const offset = 80;

    // Internal links click handler
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = targetPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll event handler
    window.addEventListener('scroll', () => {
        const footerRect = footer.getBoundingClientRect();
        const scrollBtnRect = scrollToTopBtn.getBoundingClientRect();
        const isOverFooter = footerRect.top <= (window.innerHeight - scrollBtnRect.height);

        requestAnimationFrame(() => {
            if (window.pageYOffset > 300 && !isOverFooter) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
    });

    // Scroll-to-top button click handler
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
