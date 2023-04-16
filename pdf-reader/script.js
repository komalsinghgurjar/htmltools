// PDF.js library should be loaded before this script

// Global variables
let pdfDoc = null;
let pageNum = 1;
const scale = 1.5;
const canvas = document.getElementById('pdf-canvas');
const ctx = canvas.getContext('2d');

// Function to render a page
function renderPage(num) {
    pdfDoc.getPage(num).then(page => {
        const viewport = page.getViewport({ scale });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const renderCtx = {
            canvasContext: ctx,
            viewport: viewport
        };
        page.render(renderCtx);
    });
    document.getElementById('current-page').textContent = num;
}

// Function to go to previous page
function prevPage() {
    if (pageNum <= 1) {
        return;
    }
    pageNum--;
    renderPage(pageNum);
}

// Function to go to next page
function nextPage() {
    if (pageNum >= pdfDoc.numPages) {
        return;
    }
    pageNum++;
    renderPage(pageNum);
}

// Fetch the PDF file
fetch('sample.pdf')
.then(res => res.arrayBuffer())
.then(data => {
    pdfjsLib.getDocument(data).promise.then(doc => {
        pdfDoc = doc;
        document.getElementById('total-pages').textContent = pdfDoc.numPages;
        renderPage(pageNum);
    });
})
.catch(err => console.error('Error loading PDF:', err));
