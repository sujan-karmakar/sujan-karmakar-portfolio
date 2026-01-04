const form = document.querySelector('.contact-form');
const notification = document.getElementById('notification');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const urlSearchParams = new URLSearchParams(formData);
    urlSearchParams.set('form-name', 'contact');
    
    fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: urlSearchParams.toString()
    })
    .then(() => {
        // Show notification
        notification.classList.add('show');
        form.reset();
         
        // Hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    })
    .catch((error) => alert('Error sending message. Please try again.'));
});