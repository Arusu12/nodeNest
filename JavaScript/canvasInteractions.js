
  // Variables to store mouse position
  let lastMouseX = 0;
  let lastMouseY = 0;
  let zoomLevel = 1;
  
  // Function to handle canvas panning
  function panCanvas(x, y) {
    const dx = x - lastMouseX;
    const dy = y - lastMouseY;
  
    // Update node positions
    nodes.forEach(node => {
      node.x += dx;
      node.y += dy;
    });
  
    // Redraw the mind chart
    drawMindChart();
  
    // Update last mouse position
    lastMouseX = x;
    lastMouseY = y;
  }
  
  // Function to handle zooming
  function zoomCanvas(delta) {
    const zoomSpeed = 0.1;
    const zoomFactor = 1 + delta * zoomSpeed;
  
    // Update zoom level
    zoomLevel *= zoomFactor;
  
    // Update node positions
    nodes.forEach(node => {
      node.x = (node.x - lastMouseX) * zoomFactor + lastMouseX;
      node.y = (node.y - lastMouseY) * zoomFactor + lastMouseY;
    });
  
    // Redraw the mind chart
    drawMindChart();
  }
  
  // Event listener for mouse down (click and hold) on the canvas
  canvas.addEventListener('mousedown', event => {
    if (!selectedNode) {
      // Update last mouse position
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
    }
  });
  
  // Event listener for mouse move on the canvas
  canvas.addEventListener('mousemove', event => {
    if (event.buttons === 1 && !selectedNode) {
      panCanvas(event.clientX, event.clientY);
    }
  });
  
  // Event listener for mouse up (release) on the canvas
  canvas.addEventListener('mouseup', () => {
    isDragging = false;
  });
  
  // Event listener for mouse wheel (scroll) on the canvas
  canvas.addEventListener('wheel', event => {
    if (!selectedNode) {
      event.preventDefault();
      const delta = Math.sign(event.deltaY);
      zoomCanvas(delta);
    }
  });