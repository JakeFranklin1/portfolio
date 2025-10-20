document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("fade-in");

    const links = document.querySelectorAll("a");

    links.forEach((link) => {
        link.addEventListener("click", function (event) {
            // Skip transition for external links, anchor links, and target="_blank"
            if (link.getAttribute('target') === '_blank' ||
                link.getAttribute('href').startsWith('#') ||
                link.getAttribute('href').startsWith('http')) {
                return;
            }

            event.preventDefault();
            const targetURL = this.getAttribute("href");

            document.body.classList.remove("fade-in");
            document.body.classList.add("fade-out");

            setTimeout(() => {
                window.location.href = targetURL;
            }, 300);
        });
    });

    window.addEventListener("pageshow", function (event) {
        if (event.persisted) {
            document.body.classList.remove("fade-out");
            document.body.classList.add("fade-in");
        }
    });
});
