// Variables to store the context menu and its options
const contextMenu = document.getElementById('contextMenu');
const addNodeOption = document.getElementById('addNode');
const editNodeOption = document.getElementById('editNode');
const deleteNodeOption = document.getElementById('deleteNode');

// Function to position and show the context menu
function showContextMenu(x, y) {
  contextMenu.style.left = `${x}px`;
  contextMenu.style.top = `${y}px`;
  contextMenu.style.display = 'block';
}

// Function to hide the context menu
function hideContextMenu() {
  contextMenu.style.display = 'none';
}

// Event listener for context menu option click
addNodeOption.addEventListener('click', () => {
  hideContextMenu();
  addNode();
});

editNodeOption.addEventListener('click', () => {
  hideContextMenu();
  const text = prompt('Enter new node text:', selectedNode.name);
  if (text !== null) {
    editText(text);
  }
});

deleteNodeOption.addEventListener('click', () => {
  hideContextMenu();
  deleteNode(selectedNode);
});

const noteOption = document.createElement('div');
  noteOption.innerText = 'Note';
  noteOption.style.cursor = 'pointer';
  noteOption.addEventListener('click', () => {
    displayNoteBox();
  });

// Function to hide the context menu when clicking outside
function hideContextMenuOnClick(event) {
  if (!contextMenu.contains(event.target)) {
    hideContextMenu();
  }
}

// Event listener for right mouse button press on the canvas
canvas.addEventListener('contextmenu', event => {
  event.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  if (selectedNode) {
    showContextMenu(x, y);
    document.addEventListener('click', hideContextMenuOnClick);
  }
});

// Function to hide the context menu
function hideContextMenu() {
  contextMenu.style.display = 'none';
  document.removeEventListener('click', hideContextMenuOnClick);
}