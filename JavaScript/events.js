document.addEventListener('DOMContentLoaded', function() {
    // Event listener for mouse down (click and hold)
    canvas.addEventListener('mousedown', event => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      selectNode(x, y);
    });
  
    // Event listener for mouse move
    canvas.addEventListener('mousemove', event => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      dragNode(x, y);
    });
  
    // Event listener for mouse up (release)
    canvas.addEventListener('mouseup', () => {
      isDragging = false;
    });
  
    let connectingNode = null;
    // Event listener for keydown event
    document.addEventListener('keydown', event => {
      if (event.ctrlKey && selectedNode && event.key === 'e') {
        event.preventDefault()
        const text = prompt('Enter new node text:', selectedNode.name);
        if (text !== null) {
          editText(text);
        }
      } else if (event.ctrlKey && selectedNode && event.key === 'o') {
        event.preventDefault()
        const noteBox = document.getElementById('noteBox');
        if (noteBox) {
          noteBox.parentNode.removeChild(noteBox);
        } else {
          displayNoteBox();
        }
      } else if (!event.ctrlKey && event.key === 'c') {
        if (selectedNode) {
          connectingNode = selectedNode;
        }
      } else if (event.key === 'Escape') {
        connectingNode = null;
      } else if (!event.ctrlKey && event.key === 'v') {
        if (connectingNode && selectedNode && connectingNode !== selectedNode) {
          // Check if the connection already exists
          if (connectingNode.connections.includes(selectedNode.id)) {
            // Remove the connection
            const connectionIndex = connectingNode.connections.indexOf(selectedNode.id);
            connectingNode.connections.splice(connectionIndex, 1);
            drawMindChart();
          } else {
            // Add the connection
            connectingNode.connections.push(selectedNode.id);
            drawMindChart();
          }
          connectingNode = null;
        }
      }
      
    });


    
    // Event listener for clicking outside the note box
    document.addEventListener('click', event => {
      const noteBox = document.getElementById('noteBox');
      if (noteBox && !noteBox.contains(event.target)) {
        noteBox.parentNode.removeChild(noteBox);
      }
    });
    
  
    // Event listener for export button click
    const exportJSONButton = document.getElementById('exportButton')
    const exportAsJSON = document.getElementById('ExportAsJSON')
    const exportAsCSV = document.getElementById('ExportAsCSV')
    exportJSONButton.addEventListener('click', exportNodesAsJSON);
    exportAsJSON.addEventListener('click', exportNodesAsJSON);
    exportAsCSV.addEventListener('click', exportNodesAsCSV);
  
    // Event listener for import input change
    const importInput = document.getElementById('importInput');
    importInput.addEventListener('change', event => {
      const file = event.target.files[0];
      importNodes(file);
    });

    const clearAndNewNode = document.getElementById('newNodeMap')
    clearAndNewNode.addEventListener('click', newNodeMap)

  });
  
const saveImage = document.getElementById('saveImage')
saveImage.addEventListener('click', saveCanvasImage);