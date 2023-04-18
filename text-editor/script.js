function saveFile() {
  var text = document.getElementById("editor").value;
  var encoding = "utf-8"; // default encoding
  var extension = ".txt"; // default extension

  // get selected encoding
  var encodingSelect = document.getElementById("encoding");
  if (encodingSelect) {
    encoding = encodingSelect.value;
  }

  // get selected extension
  var extensionSelect = document.getElementById("extension");
  if (extensionSelect) {
    extension = extensionSelect.value;
  }

  // create blob and download link
  var blob = new Blob([text], {type: "text/plain;charset=" + encoding});
  var url = URL.createObjectURL(blob);
  var link = document.createElement("a");
  link.href = url;
  link.download = "file" + extension;
  link.click();
}
