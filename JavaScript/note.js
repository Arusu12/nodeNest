function formatTextForDisplay(text) {
    // Format code blocks
    text = text.replace(/```(.*?)```/g, '<code>$1</code>');
  
    // Format deleted text
    text = text.replace(/~(.*?)~/g, '<del>$1</del>');
  
    // Format bold-italic text
    text = text.replace(/\*\*\*(.*?)\*\*\*/g, '<span style="font-style: italic; font-weight: bold;">$1</span>');
  
    // Format bold text
    text = text.replace(/\*\*(.*?)\*\*/g, '<span style="font-weight: bold;">$1</span>');
  
    // Format italic text
    text = text.replace(/\*(.*?)\*/g, '<span style="font-style: italic;">$1</span>');
  
    // Format headers
    text = text.replace(/###(.*?)###/g, '<h3>$1</h3>');
    text = text.replace(/##(.*?)##/g, '<h2>$1</h2>');
    text = text.replace(/#(.*?)#/g, '<h1>$1</h1>');
  
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
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      overlay.style.display = 'flex';
      overlay.style.justifyContent = 'center';
      overlay.style.alignItems = 'center';
      overlay.style.zIndex = '9999';
  
      // Create the modal content container
      const modalContent = document.createElement('div');
      modalContent.setAttribute('id', 'modalContent');
      modalContent.style.background = '#fff';
      modalContent.style.padding = '20px';
      modalContent.style.borderRadius = '4px';
      modalContent.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
      modalContent.style.fontFamily = 'Arial, sans-serif';
      modalContent.style.fontSize = '14px';
      modalContent.style.color = 'black';
      modalContent.style.backgroundColor = selectedNode.color;
      modalContent.style.position = 'relative';
      modalContent.style.width = '700px'; // Adjust the width as desired
      modalContent.style.overflow = 'scroll';
      modalContent.style.height = '500px';
      modalContent.style.display = 'flex';
  
      // Create the left section
      const leftSection = document.createElement('div');
      leftSection.style.flex = '4';
  
      // Create the node name
      const nodeName = document.createElement('div');
      nodeName.innerHTML = selectedNode.name;
      nodeName.style.marginBottom = '20px';
      nodeName.style.fontWeight = 'bold';
      nodeName.style.fontSize = '20px';
  
      // Create the note text
      const noteText = document.createElement('div');
      noteText.innerHTML = formatTextForDisplay(note);
      noteText.style.marginBottom = '20px';
  
      // Append the node name and note text to the left section
      leftSection.appendChild(nodeName);
      leftSection.appendChild(noteText);
  
      // Create the right section
      const rightSection = document.createElement('div');
      rightSection.style.flex = '1';
      rightSection.style.display = 'flex';
      rightSection.style.flexDirection = 'column';
      rightSection.style.marginLeft = '20px';
  
      // Create the edit button
      const editButton = document.createElement('button');
      editButton.innerHTML = 'Edit';
      editButton.style.padding = '8px 12px';
      editButton.style.background = '#007bff';
      editButton.style.color = '#fff';
      editButton.style.border = 'none';
      editButton.style.borderRadius = '4px';
      editButton.style.cursor = 'pointer';
      editButton.style.marginBottom = '10px';
  
      // Create the color picker input field
      const colorPickerInput = document.createElement('input');
      colorPickerInput.type = 'color';
      colorPickerInput.value = selectedNode.color || '#ffff'; // Set initial color value
      colorPickerInput.style.display = 'none'; // Hide the color picker
  
      // Create the color picker button
      const colorPickerButton = document.createElement('button');
      colorPickerButton.innerHTML = 'Pick Node Color';
      colorPickerButton.style.padding = '8px 12px';
      colorPickerButton.style.background = '#007bff';
      colorPickerButton.style.color = '#dfff';
      colorPickerButton.style.border = 'none';
      colorPickerButton.style.borderRadius = '4px';
      colorPickerButton.style.cursor = 'pointer';
      colorPickerButton.style.display = 'flex';
      colorPickerButton.style.alignItems = 'center';
  
      // Create the circle to display the chosen color
      const colorCircle = document.createElement('div');
      colorCircle.style.width = '20px';
      colorCircle.style.height = '20px';
      colorCircle.style.borderRadius = '50%';
      colorCircle.style.marginRight = '10px';
      colorCircle.style.background = selectedNode.color;
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
        colorCircle.style.background = selectedColor; // Update the color circle
        // Update the node color in your data model or perform any other desired actions
        console.log('Selected color:', selectedColor);
      });
  
      // Append the edit button, color picker input field, and color picker button to the right section
      rightSection.appendChild(editButton);
      rightSection.appendChild(colorPickerInput);
      rightSection.appendChild(colorPickerButton);
  
      let editMode = false; // Flag to indicate edit mode
  
      // Add event listener for the edit button
      editButton.addEventListener('click', () => {
        // Toggle edit mode
        editMode = !editMode;
  
        if (editMode) {
          // Enter edit mode
          const nameInput = document.createElement('input');
          nameInput.value = selectedNode.name;
          nameInput.style.width = '100%';
          nameInput.style.marginBottom = '10px';
  
          const noteInput = document.createElement('textarea');
          noteInput.value = formatTextForEdit(selectedNode.note);
          noteInput.style.width = '100%';
          noteInput.style.minHeight = '100px';
          noteInput.style.resize = 'vertical';
  
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
        }
        drawMindChart();
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
  