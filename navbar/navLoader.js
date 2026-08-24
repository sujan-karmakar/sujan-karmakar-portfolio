const navbarContainer = document.querySelector('#navbar-container');

window.navbarReady = fetch(navbarContainer.dataset.navbarSrc)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Unable to load navigation: ${response.status}`);
        }

        return response.text();
    })
    .then(markup => {
        navbarContainer.innerHTML = markup;

        const siteRoot = new URL('../', new URL(navbarContainer.dataset.navbarSrc, window.location.href));
        navbarContainer.querySelectorAll('[data-page]').forEach(link => {
            link.href = new URL(link.dataset.page, siteRoot).href;
        });
    })
    .catch(error => {
        console.error(error);
        navbarContainer.remove();
    });
