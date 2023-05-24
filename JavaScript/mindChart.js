function CanvasSize() {
  const canvas = document.getElementById('mindChartCanvas');

  canvas.height = window.innerHeight;
  canvas.width = document.body.scrollWidth;
}

function resizeHandler() {
  CanvasSize();
  drawMindChart();
}

CanvasSize()
// Attach event listeners for window resize and F11 key
window.addEventListener('resize', resizeHandler);
document.addEventListener('fullscreenchange', resizeHandler);
document.addEventListener('webkitfullscreenchange', resizeHandler);

// Get the canvas element
const canvas = document.getElementById('mindChartCanvas');
const ctx = canvas.getContext('2d');

// Variables to store node positions and text
let nodes = [
  { id: 1, x: 400, y: 300, name: 'Node 1', connections: [0], note: 'This is a test note to see if it works.', color:'#FFFFFF' },
  { id: 2, x: 200, y: 100, name: 'Node 2', connections: [1], note: 'note 2', color:'#FFFFFF' },
  { id: 3, x: 600, y: 100, name: 'Node 3', connections: [1], note: 'note 3', color:'#FFFFFF' },
  { id: 4, x: 400, y: 500, name: 'Node 4', connections: [1], note: 'note 4', color:'#FFFFFF' }
];


// Variable to store the currently selected node
let selectedNode = null;
let connectingNode = null;
let isDragging = false;
let offset = { x: 0, y: 0 };

// Function to draw a node
function drawNode(node) {
  // Calculate the size of the node based on the text length
  const textWidth = ctx.measureText(node.name).width;
  const width = textWidth + 20;
  const height = 30;

  // Draw the round-corner rectangular node shape
  ctx.beginPath();
  ctx.moveTo(node.x - width / 2 + 10, node.y - height / 2);
  ctx.lineTo(node.x + width / 2 - 10, node.y - height / 2);
  ctx.quadraticCurveTo(node.x + width / 2, node.y - height / 2, node.x + width / 2, node.y - height / 2 + 10);
  ctx.lineTo(node.x + width / 2, node.y + height / 2 - 10);
  ctx.quadraticCurveTo(node.x + width / 2, node.y + height / 2, node.x + width / 2 - 10, node.y + height / 2);
  ctx.lineTo(node.x - width / 2 + 10, node.y + height / 2);
  ctx.quadraticCurveTo(node.x - width / 2, node.y + height / 2, node.x - width / 2, node.y + height / 2 - 10);
  ctx.lineTo(node.x - width / 2, node.y - height / 2 + 10);
  ctx.quadraticCurveTo(node.x - width / 2, node.y - height / 2, node.x - width / 2 + 10, node.y - height / 2);
  ctx.closePath();

  ctx.fillStyle = node === selectedNode ? 'orange' : node.color;;
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = 'black';
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(node.name, node.x, node.y + 5);
}

// Function to draw a connection between nodes
function drawConnection(node1, node2) {
  ctx.beginPath();
  ctx.moveTo(node1.x, node1.y);
  ctx.lineTo(node2.x, node2.y);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Function to draw the mind chart
function drawMindChart() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw connections first to ensure they are behind nodes
  nodes.forEach((node, index) => {
    const connections = node.connections;
    connections.forEach(connectionIndex => {
      const connectedNode = nodes.find(n => n.id === connectionIndex);
      if (connectedNode) {
        drawConnection(node, connectedNode);
      }
    });
  });

  // Draw nodes
  nodes.forEach(node => {
    drawNode(node);
  });
}