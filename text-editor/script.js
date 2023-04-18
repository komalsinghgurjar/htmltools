function saveFile() {
  var text = document.getElementById("editor").value;

  // prompt user for encoding
  var encoding = prompt("Please select an encoding:", "UTF-8");
  if (!encoding) {
    encoding = "UTF-8"; // default encoding
  }

  // create blob and download link
  var blob;
  if (encoding.toUpperCase() === "UTF-8") {
    blob = new Blob([text], {type: "text/plain;charset=utf-8"});
  } else {
    blob = new Blob([new TextEncoder(encoding).encode(text)], {type: "text/plain;charset=" + encoding});
  }
  
  // prompt user for file name and extension
  var fileName = prompt("Please enter a file name:", "file");
  if (!fileName) {
    fileName = "file"; // default file name
  }
  var extension = prompt("Please enter a file extension (e.g. .txt, .html):", ".txt");
  if (!extension) {
    extension = ".txt"; // default extension
  }
  var fullName = fileName + extension;

  // create download link
  var url = URL.createObjectURL(blob);
  var link = document.createElement("a");
  link.href = url;
  link.download = fullName;
  link.click();
}
