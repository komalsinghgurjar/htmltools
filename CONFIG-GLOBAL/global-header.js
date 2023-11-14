document.addEventListener('DOMContentLoaded', async function () {
  // Check if a header element is present in the current DOM
  const headerExists = document.querySelector('header');

  // If no header element is found, add it to the body
  if (!headerExists) {
    const dataLocal = `
      <header class="global-header">
        <a href="index.html" class="header-link">
          <img src="logo.png" class="header-img" alt="LOGO">
          <h2 class="header-text">GURJARTECH TOOLS</h2>
        </a>
      </header>
      
      <style>
        .global-header {
          background-color: #000;
          color: #fff;
          padding: 0px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          transition: opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), max-height 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
          opacity: 0;
          max-height: 0;
        }

        .header-img {
          outline: none;
          border: none;
          height: 0; /* Set initial height to 0 */
          width: auto;
          margin-right: 2px;
          display: inline-block;
          vertical-align: middle;
          transition: height 0.5s cubic-bezier(0.25, 0.1, 0.25, 1); /* Add transition for height */
        }

        .header-text {
          white-space: nowrap;
          display: inline;
          margin: 0;
          vertical-align: middle;
          font-weight: bold;
        }

        .header-link:link,
        .header-link:visited {
          text-decoration: none;
          color: inherit;
        }

        .global-header.show {
          opacity: 1;
          max-height: 100px; /* Adjust the max-height value based on your needs */
        }

        .global-header.show .header-img {
          height: 50px; /* Adjust the final height of the image */
        }
      </style>
    `;

    document.body.insertAdjacentHTML('afterbegin', dataLocal);

    // Add the 'show' class after a short delay to trigger the transition
    setTimeout(async function () {
      document.querySelector('.global-header').classList.add('show');
    }, 50); // Adjust the delay (in milliseconds) as needed
  }
});
