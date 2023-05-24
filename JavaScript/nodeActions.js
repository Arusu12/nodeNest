// Function to handle node selection
function selectNode(x, y) {
    selectedNode = null;
    connectingNode = null;
    nodes.forEach(node => {
    const textWidth = ctx.measureText(node.name).width;
    const width = textWidth + 20;
    const height = 30;
    const left = node.x - width / 2;
    const right = node.x + width / 2;
    const top = node.y - height / 2;
    const bottom = node.y + height / 2;

  if (x >= left && x <= right && y >= top && y <= bottom) {
    selectedNode = node;
    offset.x = x - node.x;
    offset.y = y - node.y;
    isDragging = true;
  }
    });
    connectingNode = null;
    drawMindChart();
  }

  // Function to handle node dragging
  function dragNode(x, y) {
    if (selectedNode && isDragging) {
    selectedNode.x = x - offset.x;
    selectedNode.y = y - offset.y;
    drawMindChart();
    }
  }

  // Function to handle text editing
  function editText(text) {
  if (selectedNode) {
  selectedNode.name = text;
  drawMindChart();
  }
  }

  // Function to delete a node
// Function to delete a node
function deleteNode(node) {
if (node.id === 1) {
// Prevent deleting the core node
return;
}

const index = nodes.findIndex(n => n.id === node.id);
if (index !== -1) {
nodes.splice(index, 1);

// Remove connections to the deleted node
nodes.forEach(node => {
  const connections = node.connections;
  const connectionIndex = connections.indexOf(node.id);
  if (connectionIndex !== -1) {
  connections.splice(connectionIndex, 1);
  }
});

drawMindChart();
}
}
  // Function to add a new node connected to the selected node
  function addNode() {
    if (selectedNode) {
      const newNodeId = Math.max(...nodes.map(n => n.id)) + 1;
      const newNode = { id: newNodeId, x: selectedNode.x + 100, y: selectedNode.y + 100, name: 'New Node', connections: [selectedNode.id], note:'New description.', color:'#FFFFFF' };
      nodes.push(newNode);
      selectedNode.connections.push(newNodeId);
      drawMindChart();
    }
  }