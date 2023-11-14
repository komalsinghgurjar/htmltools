async function fetchAndAddHeader() {
    try {
        // Check if the header element is already present
        const existingHeader = document.querySelector('header');

        if (!existingHeader) {
            // Fetch content from global-header.html
            const response = await fetch('global-header-component.html');

            if (!response.ok) {
                throw new Error(`Failed to fetch header: ${response.status} ${response.statusText}`);
            }

            const data = await response.text();

            // Create a new header element
            const newHeader = document.createElement('header');

            // Set the fetched content as the inner HTML of the new header element
            newHeader.innerHTML = data;

            // Insert the new header element at the beginning of the body
            document.body.insertBefore(newHeader, document.body.firstChild);
        } else {
            console.log('Header already exists. No action needed.');
        }
    } catch (error) {
        console.error('Error fetching and creating header:', error.message);
    }
}

// Call the function to fetch and add the header
fetchAndAddHeader();

alert("test global-header.js");