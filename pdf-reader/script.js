let pdfDoc = null;
let pageNum = 1;
let scale = 1.2;

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

function renderPage(num) {
  pdfDoc.getPage(num).then((page) => {
    const viewport = page.getViewport({scale});
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const renderContext = {canvasContext: ctx, viewport};
    page.render(renderContext);
    document.getElementById('pdfViewer').innerHTML = '';
    document.getElementById('pdfViewer').appendChild(canvas);
  });
}

function zoomIn() {
  if (scale < 2) {
    pageNum = 1;
    scale += 0.1;
    renderPage(pageNum);
  }
}

function zoomOut() {
  if (scale > 0.2) {
    pageNum = 1;
    scale -= 0.1;
    renderPage(pageNum);
  }
}

function nextPage() {
  if (pageNum < pdfDoc.numPages) {
    pageNum++;
    renderPage(pageNum);
  }
}

function prevPage() {
  if (pageNum > 1) {
    pageNum--;
    renderPage(pageNum);
  }
}

function jumpToPage() {
  const input = document.getElementById('jumpToPageInput').value;
  const pageNum = parseInt(input);
  if (pageNum >= 1 && pageNum <= pdfDoc.numPages) {
    pageNum = pageNum;
    renderPage(pageNum);
  } else {
    alert('Invalid page number. Please try again.');
  }
}

document.getElementById('pdfInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = e.target.result;
    pdfjsLib.getDocument({data}).promise.then((pdf) => {
      pdfDoc = pdf;
      renderPage(pageNum);
    });
  };
  reader.readAsArrayBuffer(file);
});

document.getElementById('zoomInBtn').addEventListener('click', zoomIn);
document.getElementById('zoomOutBtn').addEventListener('click', zoomOut);
document.getElementById('prevPageBtn').addEventListener('click', prevPage);
document.getElementById('nextPageBtn').addEventListener('click', nextPage);
document.getElementById('jumpToPageBtn').addEventListener('click', jumpToPage);
