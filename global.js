// analytics.js
var gtagScript = document.createElement('script'); // Include Google Tag Manager script
gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-FBL87273FY';
gtagScript.async = true;
document.head.appendChild(gtagScript);

window.dataLayer = window.dataLayer || []; // Your Google Analytics code
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-FBL87273FY');


// Dynamically including global-header.js
const globalHeaderJs = document.createElement('script');
globalHeaderJs.src = 'global-header.js';
document.head.appendChild(globalHeaderJs);


alert('test global.js');
