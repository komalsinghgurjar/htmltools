let pdfFileInput = document.getElementById('pdfFileInput');
let readButton = document.getElementById('readButton');
let pdfCanvas = document.getElementById('pdfCanvas');
let pdfContainer = document.getElementById('pdfContainer');
let pdfDoc = null;
let currentPage = 1;

pdfFileInput.addEventListener('change', function() {
  let file = this.files[0];
  let reader = new FileReader();
  
  reader.onload = function() {
    let typedArray = new Uint8Array(this.result);
    renderPDF(typedArray);
  };
  
  reader.readAsArrayBuffer(file);
});

readButton.addEventListener('click', function() {
  if (pdfDoc !== null && currentPage > 0 && currentPage <= pdfDoc.numPages) {
    renderPage(pdfDoc, currentPage);
  }
});

function renderPDF(data) {
  pdfContainer.style.display = 'block';
  
  pdfjsLib.getDocument({data: data}).promise.then(function(doc) {
    pdfDoc = doc;
    readButton.disabled = false;
    currentPage = 1;
    renderPage(pdfDoc, currentPage);
  });
}

function renderPage(pdfDoc, pageNum) {
  pdfDoc.getPage(pageNum).then(function(page) {
    let viewport = page.getViewport({scale: 1});
    let canvasContext = pdfCanvas.getContext('2d');
    
    pdfCanvas.height = viewport.height;
    pdfCanvas.width = viewport.width;
    
    let renderContext = {
      canvasContext: canvasContext,
      viewport: viewport
    };
    
    page.render(renderContext);
  });
}
