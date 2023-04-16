let pdfFileInput = document.getElementById('pdfFileInput');
let pdfCanvas = document.getElementById('pdfCanvas');
let pdfContainer = document.getElementById('pdfContainer');

pdfFileInput.addEventListener('change', function() {
  let file = this.files[0];
  let reader = new FileReader();
  
  reader.onload = function() {
    let typedArray = new Uint8Array(this.result);
    renderPDF(typedArray);
  };
  
  reader.readAsArrayBuffer(file);
});

function renderPDF(data) {
  pdfContainer.style.display = 'block';
  
  pdfjsLib.getDocument({data: data}).promise.then(function(pdfDoc) {
    let numPages = pdfDoc.numPages;
    
    pdfDoc.getPage(1).then(function(page) {
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
  });
}
