document.addEventListener('DOMContentLoaded', async function () {
  // Check if a footer element is present in the current DOM
  const footerExists = document.querySelector('footer');

  // If no footer element is found, add it to the body
  if (!footerExists) {
    const dataLocal = `
      <footer class="global-footer">
        <nav class="footer-nav">
          <a href="RES/privacy-policy.html" class="footer-link">Privacy</a>
          <a href="RES/contact-us.html" class="footer-link">Contact</a>
          <a href="RES/terms-services.html" class="footer-link">Terms</a>
          <!-- Add more links as needed -->
        </nav>
      </footer>
      
      <style>
  .global-footer {
    background-color: #000;
    color: #fff;
    padding: 5px;
    display: flex;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  .footer-nav {
    display: flex;
  }

  .footer-link {
    text-decoration: none;
    color: inherit;
    margin-right: 10px;
    font-size: 90%; 
  }

  .footer-link:last-child {
    margin-right: 0;
  }

  .global-footer.show {
    opacity: 1;
  }
</style>

    `;

    document.body.insertAdjacentHTML('beforeend', dataLocal);

    // Add the 'show' class after a short delay to trigger the transition
    setTimeout(async function () {
      document.querySelector('.global-footer').classList.add('show');
    }, 50); // Adjust the delay (in milliseconds) as needed
  }
});
