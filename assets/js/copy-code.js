/**
 * Copy Code Button Implementation
 * This script adds a single copy button to code blocks that stays fixed
 * in the top-right corner, even during horizontal scrolling.
 */
document.addEventListener('DOMContentLoaded', function() {
  // First, clean up any existing copy buttons to avoid duplicates
  document.querySelectorAll('.copy-button-container').forEach(container => {
    container.remove();
  });
  
  // Process all code blocks
  const codeBlocks = document.querySelectorAll('pre');
  codeBlocks.forEach(addCopyButtonToCodeBlock);
  
  /**
   * Adds a copy button to a code block
   * @param {HTMLElement} pre - The pre element containing code
   */
  function addCopyButtonToCodeBlock(pre) {
    // Skip if already processed
    if (pre.classList.contains('copy-button-added')) {
      return;
    }
    
    // Mark as processed
    pre.classList.add('copy-button-added');
    
    // Get the parent element to position the button container
    const parent = pre.parentElement;
    if (!parent) return;
    
    // Create a container for the button that will be positioned relative to the parent
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'copy-button-container';
    buttonContainer.style.position = 'absolute';
    buttonContainer.style.top = '0';
    buttonContainer.style.right = '0';
    buttonContainer.style.zIndex = '1000';
    buttonContainer.style.padding = '8px';
    buttonContainer.style.pointerEvents = 'none'; // Allow clicks to pass through container
    
    // Create the copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');
    copyButton.style.pointerEvents = 'auto'; // Make button clickable
    
    // Add copy icon
    copyButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      Copy
    `;
    
    // Add click event to copy code
    copyButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Get the code content
      let codeText;
      const codeElement = pre.querySelector('code');
      if (codeElement) {
        codeText = codeElement.textContent;
      } else {
        codeText = pre.textContent;
      }
      
      // Copy to clipboard
      navigator.clipboard.writeText(codeText).then(() => {
        // Show success state
        const originalContent = copyButton.innerHTML;
        copyButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Copied!
        `;
        
        // Reset after 2 seconds
        setTimeout(() => {
          copyButton.innerHTML = originalContent;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy code: ', err);
      });
    });
    
    // Add button to container
    buttonContainer.appendChild(copyButton);
    
    // Add container to parent (not the pre element)
    // This ensures the button stays fixed even during horizontal scrolling
    parent.style.position = 'relative'; // Ensure parent has position relative
    parent.appendChild(buttonContainer);
  }
  
  // Add a mutation observer to handle dynamically added code blocks
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            // Check if it's a pre element
            if (node.tagName === 'PRE') {
              addCopyButtonToCodeBlock(node);
            }
            
            // Check for nested pre elements
            node.querySelectorAll('pre').forEach(pre => {
              addCopyButtonToCodeBlock(pre);
            });
          }
        });
      }
    });
  });
  
  // Start observing the document
  observer.observe(document.body, { childList: true, subtree: true });
});
