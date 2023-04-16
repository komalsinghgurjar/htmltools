
let pdfFileInput = document.getElementById('pdfFileInput');
let readButton = document.getElementById('readButton');
let pdfCanvas = document.getElementById('pdfCanvas');
let pdfContainer = document.getElementById('pdfContainer');
let prevButton = document.getElementById('prevButton');
let nextButton = document.getElementById('nextButton');
let pageNumInput = document.getElementById('pageNumInput');
let totalPages = document.getElementById('totalPages');
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

prevButton.addEventListener('click', function() {
  if (pdfDoc !== null && currentPage > 1) {
    currentPage--;
    renderPage(pdfDoc, currentPage);
    updateNavigationButtons();
  }
});

nextButton.addEventListener('click', function() {
  if (pdfDoc !== null && currentPage < pdfDoc.numPages) {
    currentPage++;
    renderPage(pdfDoc, currentPage);
    updateNavigationButtons();
  }
});

pageNumInput.addEventListener('input', function() {
  let pageNum = parseInt(this.value);
  if (pdfDoc !== null && pageNum > 0 && pageNum <= pdfDoc.numPages) {
    currentPage = pageNum;
    renderPage(pdfDoc, currentPage);
    updateNavigationButtons();
  }
});

function renderPDF(data) {
  pdfContainer.style.display = 'block';
  
  pdfjsLib.getDocument({data: data}).promise.then(function(doc) {
    pdfDoc = doc;
    readButton.disabled = false;
    prevButton.disabled = false;
    nextButton.disabled = false;
    pageNumInput.disabled = false;
    totalPages.textContent = '/ ' + pdfDoc.numPages;
    currentPage = 1;
    renderPage(pdfDoc, currentPage);
    updateNavigationButtons();
  });
}

function renderPage(pdfDoc, pageNum) {
  pdfDoc.getPage(pageNum).then(function(page) {
    let viewport = page.getViewport({scale: 1});
    let scale = pdfCanvas.offsetWidth / viewport.width;
    viewport = page.getViewport({scale: scale});
    let context = pdfCanvas.getContext('2d');
    pdfCanvas.height = viewport.height;
    pdfCanvas.width = viewport.width;

    let renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    page.render(renderContext);
  });
}

function updateNavigationButtons() {
  prevButton.disabled = currentPage <= 1;
  nextButton.disabled = currentPage >= pdfDoc.numPages;
}
