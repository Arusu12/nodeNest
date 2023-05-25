function formatTextForDisplay(text) {
  // Format code blocks ```codes here```
  text = text.replace(/```([\s\S]*?)```/g, function (match, code) {
    code = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return '<pre class="codeblock"><code>' + code + '</code></pre>';
  });

  // Format in-line codes `code here`
  text = text.replace(/`([\s\S]*?)`/g, function (match, code) {
    code = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return '<code class="inline-code">' + code + '</code>';
  });

  // Format spoiler text ||spoiler here||
  text = text.replace(/\|\|([\s\S]*?)\|\|/g, function (match, code) {
    code = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return '<code class="spoiler">' + code + '</code>';
  });

  text = text.replace(/(\d+)\. (.+)/g, '<div class="markdown">$1. $2</div>');
  text = text.replace(/\- (.+)/g, '<li class="markdown">$1</li>');

  // Format deleted text ~text here~
  text = text.replace(/~([\s\S]*?)~/g, '<del>$1</del>');

  // Format underline text _text here_
  text = text.replace(/\_([\s\S]*?)\_/g, function (match, code) {
    code = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return '<u>' + code + '</u>';
  });

  // Format bold-italic text ***text here***
  text = text.replace(/\*\*\*([\s\S]*?)\*\*\*/g, '<span style="font-style: italic; font-weight: bold;">$1</span>');

  // Format bold text **text here**
  text = text.replace(/\*\*([\s\S]*?)\*\*/g, '<span style="font-weight: bold;">$1</span>');

  // Format italic text *text here*
  text = text.replace(/\*([\s\S]*?)\*/g, '<span style="font-style: italic;">$1</span>');

  // Format headers #Header 1# ##Header 2## ###Header 3###
  text = text.replace(/###([\s\S]*?)###/g, '<h3>$1</h3>');
  text = text.replace(/##([\s\S]*?)##/g, '<h2>$1</h2>');
  text = text.replace(/#([\s\S]*?)#/g, '<h1>$1</h1>');

  // Format image !!width-pixel[alt text](URL)
  text = text.replace(/\!\!([\s\S]*?)\[(.*?)\]\((.*?)\)/g, '<img src="$3" class="note-hyperlink" style="max-width: $1px " alt="$2">');

  // Format images ![alt text](URL)
  text = text.replace(/\!\[(.*?)\]\((.*?)\)/g, '<img src="$2" class="note-hyperlink-image" alt="$1">');

  // Format links [link text](URL)
  text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

  // Preserve line breaks
  text = text.replace(/\n/g, '<br>');

  return text;
}

  
  
  function formatTextForEdit(text) {
    // Preserve line breaks
    text = text.replace(/<br>/g, '\n');
  
    // Restore special characters
    text = text.replace(/&amp;/g, '&');
    text = text.replace(/&lt;/g, '<');
    text = text.replace(/&gt;/g, '>');
    text = text.replace(/&quot;/g, '"');
    text = text.replace(/&#39;/g, "'");
  
    return text;
  }
  
  
  function displayNoteBox() {
    if (selectedNode) {
      const note = selectedNode.note;
  
      // Create the modal overlay
const overlay = document.createElement('div');
overlay.setAttribute('id', 'overlay');
overlay.classList.add('overlay');

// Create the modal content container
const modalContent = document.createElement('div');
modalContent.setAttribute('id', 'modalContent');
modalContent.classList.add('modal-content');
modalContent.style.backgroundColor = selectedNode.color;

// Create the left section
const leftSection = document.createElement('div');
leftSection.classList.add('left-section');

// Create the node name
const nodeName = document.createElement('div');
nodeName.innerHTML = selectedNode.name;
nodeName.classList.add('node-name');

// Create the note text
const noteText = document.createElement('div');
noteText.innerHTML = formatTextForDisplay(note);
noteText.classList.add('note-text');

// Append the node name and note text to the left section
leftSection.appendChild(nodeName);
leftSection.appendChild(noteText);

// Create the right section
const rightSection = document.createElement('div');
rightSection.classList.add('right-section');

// Create the edit button
const editButton = document.createElement('button');
editButton.innerHTML = 'Edit';
editButton.classList.add('edit-button');

// Create the color picker input field
const colorPickerInput = document.createElement('input');
colorPickerInput.type = 'color';
colorPickerInput.value = selectedNode.color || '#ffff'; // Set initial color value
colorPickerInput.style.display = 'none'; // Hide the color picker

// Create the color picker button
const colorPickerButton = document.createElement('button');
colorPickerButton.innerHTML = 'Node Color';
colorPickerButton.classList.add('color-picker-button');

// Create the circle to display the chosen color
const colorCircle = document.createElement('div');
colorCircle.classList.add('color-circle');
colorCircle.style.backgroundColor = selectedNode.color;
colorPickerButton.appendChild(colorCircle);

  
      // Add event listener to show color picker on click
      colorPickerButton.addEventListener('click', () => {
        // Show color picker input field
        colorPickerInput.click();
      });
  
      // Add event listener to handle color change
      colorPickerInput.addEventListener('input', () => {
        const selectedColor = colorPickerInput.value;
        selectedNode.color = selectedColor;
        colorCircle.style.background = selectedColor;
        modalContent.style.background = selectedColor;
      });
  
      // Append the edit button, color picker input field, and color picker button to the right section
      rightSection.appendChild(editButton);
      rightSection.appendChild(colorPickerInput);
      rightSection.appendChild(colorPickerButton);
  
      let editMode = false; // Flag to indicate edit mode
  
      editButton.addEventListener('click', () => {
        // Toggle edit mode
        editMode = !editMode;
      
        if (editMode) {
          // Enter edit mode
          const cancelButton = document.createElement('button');
          cancelButton.innerHTML = 'Cancel';
          cancelButton.classList.add('cancel-button');
          rightSection.appendChild(cancelButton);
      
          cancelButton.addEventListener('click', () => {
            // Exit edit mode when cancel button is clicked
            editMode = false;
      
            // Replace input fields with the original node name and note text
            leftSection.replaceChild(nodeName, leftSection.querySelector('input'));
            leftSection.replaceChild(noteText, leftSection.querySelector('textarea'));
            editButton.innerHTML = 'Edit';
      
            // Reset the selectedNode's name and note to the original values
            selectedNode.name = nodeName.innerHTML;
            selectedNode.note = formatTextForEdit(noteText.innerHTML);
      
            cancelButton.remove(); // Remove the cancel button
      
            drawMindChart();
          });
      
          const nameInput = document.createElement('input');
          nameInput.value = selectedNode.name;
          nameInput.classList.add('name-input');
      
          const noteInput = document.createElement('textarea');
          noteInput.value = formatTextForEdit(selectedNode.note);
          noteInput.classList.add('note-input');
      
          // Replace node name and note text with the input fields
          leftSection.replaceChild(nameInput, nodeName);
          leftSection.replaceChild(noteInput, noteText);
          editButton.innerHTML = 'Save';
        } else {
          // Exit edit mode
          const updatedName = leftSection.querySelector('input').value;
          const updatedNote = leftSection.querySelector('textarea').value;
      
          // Replace input fields with the updated node name and note text
          leftSection.replaceChild(nodeName, leftSection.querySelector('input'));
          leftSection.replaceChild(noteText, leftSection.querySelector('textarea'));
          nodeName.innerHTML = updatedName;
          noteText.innerHTML = formatTextForDisplay(updatedNote);
          editButton.innerHTML = 'Edit';
      
          // Update the selectedNode's name and note
          selectedNode.name = updatedName;
          selectedNode.note = updatedNote;
      
          const cancelButton = rightSection.querySelector('button.cancel-button');
          if (cancelButton) {
            cancelButton.remove(); // Remove the cancel button if it exists
          }
      
          drawMindChart();
        }
      });
      
  
      // Append the left and right sections to the modal content
      modalContent.appendChild(leftSection);
      modalContent.appendChild(rightSection);
  
      // Append the modal content to the overlay
      overlay.appendChild(modalContent);
  
      // Append the overlay to the document body
      document.body.appendChild(overlay);
  
      // Add event listener to close the modal when clicking on the background
      overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
          document.body.removeChild(overlay);
        }
      });
    }
  }
  