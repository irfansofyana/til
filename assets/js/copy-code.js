// Add copy button to code blocks
document.addEventListener('DOMContentLoaded', function() {
  // First, remove any existing copy buttons to avoid duplicates
  document.querySelectorAll('.floating-copy-button, .copy-button-container').forEach(button => {
    button.remove();
  });
  
  // Function to create a copy button
  function createCopyButton() {
    const button = document.createElement('button');
    button.className = 'floating-copy-button';
    button.setAttribute('aria-label', 'Copy code to clipboard');
    
    // Create SVG icon
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '14');
    svg.setAttribute('height', '14');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    
    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    path1.setAttribute('x', '9');
    path1.setAttribute('y', '9');
    path1.setAttribute('width', '13');
    path1.setAttribute('height', '13');
    path1.setAttribute('rx', '2');
    path1.setAttribute('ry', '2');
    
    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1');
    
    svg.appendChild(path1);
    svg.appendChild(path2);
    
    button.appendChild(svg);
    button.appendChild(document.createTextNode('Copy'));
    
    return button;
  }
  
  // Function to handle copy action
  function copyCodeContent(button, codeText) {
    navigator.clipboard.writeText(codeText).then(() => {
      // Store original content to restore later
      const originalContent = button.innerHTML;
      
      // Update button to show copied state
      button.innerHTML = '';
      
      // Create check icon
      const checkIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      checkIcon.setAttribute('width', '14');
      checkIcon.setAttribute('height', '14');
      checkIcon.setAttribute('viewBox', '0 0 24 24');
      checkIcon.setAttribute('fill', 'none');
      checkIcon.setAttribute('stroke', 'currentColor');
      checkIcon.setAttribute('stroke-width', '2');
      checkIcon.setAttribute('stroke-linecap', 'round');
      checkIcon.setAttribute('stroke-linejoin', 'round');
      
      const checkPath = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
      checkPath.setAttribute('points', '20 6 9 17 4 12');
      checkIcon.appendChild(checkPath);
      
      button.appendChild(checkIcon);
      button.appendChild(document.createTextNode('Copied!'));
      
      // Reset button after 2 seconds
      setTimeout(() => {
        button.innerHTML = originalContent;
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy code: ', err);
    });
  }
  
  // Create a container for the button to ensure proper positioning
  function createButtonContainer(parent) {
    // First, ensure parent has position relative
    if (window.getComputedStyle(parent).position !== 'relative') {
      parent.style.position = 'relative';
    }
    
    // Create a wrapper for the button that will handle horizontal scrolling
    const wrapper = document.createElement('div');
    wrapper.className = 'copy-button-wrapper';
    wrapper.style.position = 'absolute';
    wrapper.style.top = '0';
    wrapper.style.right = '0';
    wrapper.style.bottom = '0';
    wrapper.style.pointerEvents = 'none';
    wrapper.style.zIndex = '100';
    wrapper.style.overflow = 'visible';
    
    // Create the button container
    const container = document.createElement('div');
    container.className = 'copy-button-container';
    container.style.position = 'sticky';
    container.style.top = '8px';
    container.style.right = '8px';
    container.style.pointerEvents = 'none';
    
    // Add container to wrapper and wrapper to parent
    wrapper.appendChild(container);
    parent.appendChild(wrapper);
    
    return container;
  }
  
  // Process all highlight elements
  const highlights = document.querySelectorAll('.highlight');
  highlights.forEach(highlight => {
    // Ensure highlight has position relative for absolute positioning of button
    if (window.getComputedStyle(highlight).position !== 'relative') {
      highlight.style.position = 'relative';
    }
    
    // Create button container
    const buttonContainer = createButtonContainer(highlight);
    
    // Create copy button
    const copyButton = createCopyButton();
    
    // Add click event
    copyButton.addEventListener('click', function(e) {
      e.stopPropagation();
      
      // Get code content
      let codeText;
      const codeElement = highlight.querySelector('code');
      if (codeElement) {
        codeText = codeElement.textContent;
      } else {
        codeText = highlight.textContent;
      }
      
      copyCodeContent(copyButton, codeText);
    });
    
    // Add button to container
    buttonContainer.appendChild(copyButton);
  });
  
  // Also process pre > code elements that might not be in highlight
  const codeBlocks = document.querySelectorAll('pre > code');
  codeBlocks.forEach(codeBlock => {
    const pre = codeBlock.parentElement;
    
    // Skip if parent is inside a highlight element
    if (pre.closest('.highlight')) {
      return;
    }
    
    // Ensure pre has position relative
    if (window.getComputedStyle(pre).position !== 'relative') {
      pre.style.position = 'relative';
    }
    
    // Create button container
    const buttonContainer = createButtonContainer(pre);
    
    // Create copy button
    const copyButton = createCopyButton();
    
    // Add click event
    copyButton.addEventListener('click', function(e) {
      e.stopPropagation();
      copyCodeContent(copyButton, codeBlock.textContent);
    });
    
    // Add button to container
    buttonContainer.appendChild(copyButton);
  });
  
  // No need for scroll event listeners with sticky positioning
});
