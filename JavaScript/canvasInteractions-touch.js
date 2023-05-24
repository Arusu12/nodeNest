
// Function to handle canvas panning
function panCanvasTouch(x, y) {
    const dx = x - lastTouchX;
    const dy = y - lastTouchY;
  
    // Update node positions
    nodes.forEach(node => {
      node.x += dx;
      node.y += dy;
    });
  
    // Redraw the mind chart
    drawMindChart();
  
    // Update last touch position
    lastTouchX = x;
    lastTouchY = y;
  }
  
  // Function to handle zooming
  function zoomCanvasTouch(delta) {
    const zoomSpeed = 0.1;
    const zoomFactor = 1 + delta * zoomSpeed;
  
    // Update zoom level
    zoomLevel *= zoomFactor;
  
    // Update node positions
    nodes.forEach(node => {
      node.x = (node.x - lastTouchX) * zoomFactor + lastTouchX;
      node.y = (node.y - lastTouchY) * zoomFactor + lastTouchY;
    });
  
    // Redraw the mind chart
    drawMindChart();
  }
  
  // Event listener for touch start on the canvas
  canvas.addEventListener('touchstart', event => {
    if (!selectedNode) {
      // Update last touch position
      lastTouchX = event.touches[0].clientX;
      lastTouchY = event.touches[0].clientY;
    }
  });
  
  // Event listener for touch move on the canvas
  canvas.addEventListener('touchmove', event => {
    if (!selectedNode) {
      const touch = event.touches[0];
      panCanvasTouch(touch.clientX, touch.clientY);
    }
  });
  
  // Event listener for touch end on the canvas
  canvas.addEventListener('touchend', () => {
    isDragging = false;
  });
  
  // Event listener for touch cancel on the canvas
  canvas.addEventListener('touchcancel', () => {
    isDragging = false;
  });
  
  // Event listener for touch pinch (zoom) on the canvas
  canvas.addEventListener('touchmove', event => {
    if (!selectedNode && event.touches.length === 2) {
      event.preventDefault();
  
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
  
      const prevTouch1 = event.touches[0];
      const prevTouch2 = event.touches[1];
  
      const prevDistance = Math.hypot(
        prevTouch2.clientX - prevTouch1.clientX,
        prevTouch2.clientY - prevTouch1.clientY
      );
  
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
  
      const delta = distance - prevDistance;
      zoomCanvasTouch(delta);
    }
  });
  