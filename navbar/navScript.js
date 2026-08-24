window.navbarReady.then(() => {
const indicator = document.querySelector('#nav-indicator');
const items = document.querySelectorAll('.nav-item');

const getIndicatorPosition = (item) => {
    const navbar = indicator.closest('.navbar');
    const itemBounds = item.getBoundingClientRect();
    const navbarBounds = navbar.getBoundingClientRect();

    return {
        left: itemBounds.left - navbarBounds.left,
        width: itemBounds.width
    };
};

const setIndicatorPosition = (item) => {
    const { left, width } = getIndicatorPosition(item);
    indicator.style.left = `${left}px`;
    indicator.style.width = `${width}px`;
};

// Store the current slider position.
items.forEach(item => {
    item.addEventListener('click', () => {
        // We save the position of the indicator AS IT IS NOW (under the current page's link)
        // This becomes the "start point" for the animation on the next page.
        sessionStorage.setItem('sliderLastLeft', indicator.offsetLeft);
        sessionStorage.setItem('sliderLastWidth', indicator.offsetWidth);
    });
});

// Prevent browser from restoring scroll position
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// On page load, animate from the last position to the new one.
const initializeNavbar = async () => {
    // Force scroll to top on refresh to ensure header is visible
    window.scrollTo(0, 0);
    await document.fonts?.ready;

    const lastLeft = sessionStorage.getItem('sliderLastLeft');
    const lastWidth = sessionStorage.getItem('sliderLastWidth');

    // Find the correct active item for the current page
    const normalizePath = (path) => {
        const decodedPath = decodeURIComponent(path).replace(/\/+/g, '/');
        const withoutIndex = decodedPath.replace(/\/index\.html$/i, '');
        const withoutTrailingSlash = withoutIndex.replace(/\/$/, '');

        return (withoutTrailingSlash || '/').toLowerCase();
    };
    const currentPath = normalizePath(window.location.pathname);
    let activeItem = Array.from(items).find(item => {
        const linkPath = new URL(item.href, window.location.origin).pathname;
        return normalizePath(linkPath) === currentPath;
    });
    if (!activeItem) activeItem = items[0]; // Default to home

    // Set active class on the correct item
    items.forEach(item => item.classList.remove('active'));
    activeItem.classList.add('active');

    if (lastLeft !== null && lastWidth !== null) {
        // 1. Instantly set the slider to the LAST known position with no animation.
        indicator.classList.add('no-transition');
        indicator.style.left = `${lastLeft}px`;
        indicator.style.width = `${lastWidth}px`;

        // 2. Use a timeout to allow the browser to apply the initial state.
        setTimeout(() => {
            // 3. Remove the class to re-enable the slow transition.
            indicator.classList.remove('no-transition');
            // 4. Set the final position, triggering the slow animation.
            setIndicatorPosition(activeItem);
        }, 10);

        // Clear the storage so that a refreshing page doesn't trigger the animation again
        sessionStorage.removeItem('sliderLastLeft');
        sessionStorage.removeItem('sliderLastWidth');

    } else {
        // First visit, just set the indicator immediately.
        setIndicatorPosition(activeItem);
    }

    // Update slider on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        indicator.classList.add('no-transition');
        setIndicatorPosition(activeItem);

        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            indicator.classList.remove('no-transition');
        }, 250);
    });

    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            // Toggle Sidebar
            navLinks.classList.toggle('nav-active');
            
            // Toggle Cross Animation
            hamburger.classList.toggle('toggle');

            // Animate Links
            links.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }
};

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initializeNavbar, { once: true });
} else {
    initializeNavbar();
}
});
