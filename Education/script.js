document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                card.classList.add('show');

                // Remove transition delay after animation completes to ensure snappy hover
                const delay = parseFloat(card.style.transitionDelay) || 0;
                setTimeout(() => {
                    card.style.transitionDelay = '0s';
                }, (delay * 1000) + 1000);

                observer.unobserve(card);
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.edu-card');
    cards.forEach((card, index) => {
        // Add staggered delay for initial load if they are already in view
        card.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
});