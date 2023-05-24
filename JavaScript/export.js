// Function to export nodes as JSON
function exportNodesAsJSON() {
  const exportedNodes = JSON.stringify(nodes);
  const downloadLink = document.createElement('a');
  downloadLink.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(exportedNodes));
  downloadLink.setAttribute('download', 'nodes.json');
  downloadLink.click();
}

function exportNodesAsCSV() {
  // Define the CSV header
  const csvHeader = 'name,note,color,id,x,y,connections\n';

  // Generate the CSV content
  let csvContent = csvHeader;
  for (const node of nodes) {
    const name = node.name.replace(/"/g, '""'); // Escape double quotes
    const note = node.note.replace(/"/g, '""'); // Escape double quotes
    const color = node.color.replace(/"/g, '""'); // Escape double quotes
    const id = node.id || ''; // Handle empty id value
    const x = node.x || ''; // Handle empty x value
    const y = node.y || ''; // Handle empty y value
    const connections = node.connections || ''; // Handle empty connections value
    const row = `"${name}","${note}","${color}",${id},${x},${y},${connections}\n`;
    csvContent += row;
  }

  // Create the download link
  const downloadLink = document.createElement('a');
  const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const csvURL = URL.createObjectURL(csvBlob);
  downloadLink.setAttribute('href', csvURL);
  downloadLink.setAttribute('download', 'nodes.csv');
  downloadLink.click();
}



function saveCanvasImage() {
  // Create a hidden off-screen canvas with higher dimensions
  const offscreenCanvas = document.createElement('canvas');
  const offscreenCtx = offscreenCanvas.getContext('2d');
  
  // Set the dimensions of the off-screen canvas to a higher resolution
  const scaleFactor = 4; // Adjust the scale factor as needed for higher resolution
  offscreenCanvas.width = canvas.width * scaleFactor;
  offscreenCanvas.height = canvas.height * scaleFactor;
  
  // Scale the off-screen canvas to match the higher resolution
  offscreenCtx.scale(scaleFactor, scaleFactor);
  
  // Draw the contents of the main canvas onto the off-screen canvas
  offscreenCtx.drawImage(canvas, 0, 0);
  
  // Create a temporary link element
  const link = document.createElement('a');
  
  // Set the href attribute to the data URL of the off-screen canvas image
  link.href = offscreenCanvas.toDataURL();
  
  // Set the download attribute with a desired filename
  link.download = 'canvas_image.png';
  
  // Simulate a click on the link element to trigger the download
  link.click();
}