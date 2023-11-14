// analytics.js

// Include Google Tag Manager script
var gtagScript = document.createElement('script');
gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-FBL87273FY';
gtagScript.async = true;
document.head.appendChild(gtagScript);

// Your Google Analytics code
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-FBL87273FY');


alert('test');
