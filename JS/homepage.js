
  document.addEventListener('DOMContentLoaded', function () {
    // Fetch and process tools data asynchronously
    async function fetchAndProcessTools() {
      try {
        const response = await fetch('CONFIG-GLOBAL/global-tools-list.xml');
        const data = await response.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'application/xml');
        const toolsByCategory = {};

        // Organize tools by category
        const tools = xmlDoc.getElementsByTagName('tool');
        for (let i = 0; i < tools.length; i++) {
          const tool = tools[i];
          const toolCategory = tool.getElementsByTagName('category')[0].textContent;

          if (!toolsByCategory[toolCategory]) {
            toolsByCategory[toolCategory] = [];
          }

          toolsByCategory[toolCategory].push(tool);
        }

        // Create and display tools category-wise
        const toolContainer = document.getElementById('toolContainer');
        for (const category in toolsByCategory) {
          const categoryHeader = document.createElement('h2');
          categoryHeader.textContent = category;
          toolContainer.appendChild(categoryHeader);

          const categoryList = document.createElement('ul');

          toolsByCategory[category].forEach(tool => {
            const toolUrl = tool.getElementsByTagName('url')[0].textContent;
            const toolName = tool.getElementsByTagName('name')[0].textContent;
            const toolDescription = tool.getElementsByTagName('description')[0].textContent;

            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${toolName}</strong> - ${toolDescription}<br>
                                 <a href="${toolUrl}" target="_blank">Visit ${toolName}</a><br><br>`;
            categoryList.appendChild(listItem);
          });

          toolContainer.appendChild(categoryList);
        }
      } catch (error) {
        console.error('Error fetching or processing tools data:', error);
      }
    }

    // Run the asynchronous function after a short delay for a smoother experience
    fetchAndProcessTools(); // Adjust the delay (in milliseconds) as needed
  });

