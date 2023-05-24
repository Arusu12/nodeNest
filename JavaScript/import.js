function importNodes(file) {
  const reader = new FileReader();

  reader.onload = function (event) {
    const fileName = file.name.toLowerCase();
    const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);

    if (fileExtension === 'json') {
      // JSON file import
      const importedNodes = JSON.parse(event.target.result);
      nodes = importedNodes;
      drawMindChart();
    } else {
      window.alert('Unsupported file. Please only import JSON or CSV files.');
    }
  };
  reader.readAsText(file);
}

// File input change event handling
const fileInput = document.getElementById('importInput');

fileInput.addEventListener('change', function (event) {
  const file = event.target.files[0];
  importNodes(file);
});
