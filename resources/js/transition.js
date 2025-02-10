document.addEventListener('DOMContentLoaded', () => {
    const transitionDuration = 300;

    // Set initial state
    document.body.style.opacity = '0';
    document.body.style.visibility = 'hidden';

    // Fade in on initial load
    requestAnimationFrame(() => {
        document.body.style.transition = `opacity ${transitionDuration}ms ease, visibility ${transitionDuration}ms ease`;
        document.body.style.opacity = '1';
        document.body.style.visibility = 'visible';
    });

    document.querySelectorAll('a[href*="pages/"], a[href*="index.html"]').forEach(link => {
        link.addEventListener('click', e => {
            if (link.getAttribute('target') === '_blank' || link.getAttribute('href').startsWith('#')) {
                return;
            }

            e.preventDefault();
            const target = e.currentTarget.href;

            // Fade out current page
            document.body.style.opacity = '0';
            document.body.style.visibility = 'hidden';

            // Navigate after fade out
            setTimeout(() => {
                window.location.href = target;
            }, transitionDuration);
        });
    });
});
