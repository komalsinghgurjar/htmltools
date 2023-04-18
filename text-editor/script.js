function saveFile() {
  var text = document.getElementById("editor").value;

  // get list of available encodings
  var availableEncodings = [
    "UTF-8",
    "UTF-16",
    "ISO-8859-1",
    "ISO-8859-2",
    "ISO-8859-3",
    "ISO-8859-4",
    "ISO-8859-5",
    "ISO-8859-6",
    "ISO-8859-7",
    "ISO-8859-8",
    "ISO-8859-9",
    "ISO-8859-10",
    "ISO-8859-11",
    "ISO-8859-13",
    "ISO-8859-14",
    "ISO-8859-15",
    "ISO-8859-16",
    "Windows-1250",
    "Windows-1251",
    "Windows-1252",
    "Windows-1253",
    "Windows-1254",
    "Windows-1255",
    "Windows-1256",
    "Windows-1257",
    "Windows-1258"
  ];

  // create select element for encodings
  var selectEncoding = document.createElement("select");
  for (var i = 0; i < availableEncodings.length; i++) {
    var option = document.createElement("option");
    option.value = availableEncodings[i];
    option.text = availableEncodings[i];
    selectEncoding.appendChild(option);
  }

  // prompt user for encoding
  var div = document.createElement("div");
  div.appendChild(document.createTextNode("Please select an encoding: "));
  div.appendChild(selectEncoding);
  var result = confirm("message", {
    title: "Select Encoding",
    buttons: {
      ok: "OK",
      cancel: "Cancel"
    },
    content: div,
    callback: function (result) {
      if (result) {
        var encoding = selectEncoding.value;
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

        // create blob and download link
        var blob;
        if (encoding.toUpperCase() === "UTF-8") {
          blob = new Blob([text], {type: "text/plain;charset=utf-8"});
        } else {
          blob = new Blob([new TextEncoder(encoding).encode(text)], {type: "text/plain;charset=" + encoding});
        }
        var url = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.href = url;
        link.download = fullName;
        link.click();
      }
    }
  });
}













// check if there's saved text in localStorage
var savedText = localStorage.getItem("editorText");
if (savedText) {
  // if there's saved text, update the editor's value
  document.getElementById("editor").value = savedText;
}

// listen for changes in the editor's value
document.getElementById("editor").addEventListener("input", function(event) {
  // save the editor's value to localStorage
  localStorage.setItem("editorText", event.target.value);
});
