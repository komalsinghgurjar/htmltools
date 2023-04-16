const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const zoomInBtn = document.getElementById('zoom-in-btn');
const zoomOutBtn = document.getElementById('zoom-out-btn');
const pageInput = document.getElementById('page-input');
const pdfFileInput = document.getElementById('pdf-file');
const canvas = document.getElementById('pdf-canvas');
const ctx = canvas.getContext('2d');

let pdf = null;
let currentPage = 1;
let zoom = 1;

prevBtn.addEventListener('click', showPrevPage);
nextBtn.addEventListener('click', showNextPage);
zoomInBtn.addEventListener('click', zoomIn);
zoomOutBtn.addEventListener('click', zoomOut);
pageInput.addEventListener('keydown', jumpToPage);
pdfFileInput.addEventListener('change', loadPDF);

function showPrevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
  }
}

function showNextPage() {
  if (currentPage < pdf.numPages) {
    currentPage++;
    renderPage(currentPage);
  }
}

function jumpToPage(event) {
  if (event.key === 'Enter') {
    const pageNumber = parseInt(pageInput.value);
    if (pageNumber > 0 && pageNumber <= pdf.numPages) {
      currentPage = pageNumber;
      renderPage(currentPage);
    }
  }
}

function zoomIn() {
  if (zoom < 2) {
    zoom += 0.1;
    renderPage(currentPage);
  }
}

function zoomOut() {
  if (zoom > 0.5) {
    zoom -= 0.1;
    renderPage(currentPage);
  }
}

function loadPDF(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function() {
    const typedarray = new Uint8Array(reader.result);
    PDFJS.getDocument(typedarray).promise.then(function(pdfDoc) {
      pdf = pdfDoc;
      renderPage(currentPage);
    });
  };
  reader.readAsArrayBuffer(file);
}

function renderPage(pageNumber) {
  pdf.getPage(pageNumber).then(function(page) {
    const viewport = page.getViewport({ scale: zoom });
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    page.render(renderContext);
    pageInput.value = currentPage;
  });
}
