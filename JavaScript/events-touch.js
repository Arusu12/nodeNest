document.addEventListener('DOMContentLoaded', function() {
    // Event listener for touch start
    canvas.addEventListener('touchstart', event => {
      const rect = canvas.getBoundingClientRect();
      const x = event.touches[0].clientX - rect.left;
      const y = event.touches[0].clientY - rect.top;
      selectNode(x, y);
    });
    
    // Event listener for touch move
    canvas.addEventListener('touchmove', event => {
      const rect = canvas.getBoundingClientRect();
      const x = event.touches[0].clientX - rect.left;
      const y = event.touches[0].clientY - rect.top;
      dragNode(x, y);
    });
    
    // Event listener for touch end
    canvas.addEventListener('touchend', () => {
      isDragging = false;
    });

})