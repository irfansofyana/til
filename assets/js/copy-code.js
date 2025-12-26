/**
 * Copy Code Button Implementation
 * This script adds a copy button to code block headers
 */
document.addEventListener('DOMContentLoaded', function() {
  // First, clean up any existing copy buttons to avoid duplicates
  document.querySelectorAll('.copy-button').forEach(btn => {
    btn.remove();
  });

  // Process all code blocks
  const codeBlocks = document.querySelectorAll('pre');
  codeBlocks.forEach(addCopyButtonToCodeBlock);

  /**
   * Adds a copy button to a code block's header
   * @param {HTMLElement} pre - The pre element containing code
   */
  function addCopyButtonToCodeBlock(pre) {
    // Skip if already processed
    if (pre.classList.contains('copy-button-added')) {
      return;
    }

    // Mark as processed
    pre.classList.add('copy-button-added');

    // Check if there's a code header (created by post.html)
    const codeHeader = pre.previousElementSibling;
    if (!codeHeader || !codeHeader.classList.contains('code-header')) {
      // No header found, create one
      const newHeader = document.createElement('div');
      newHeader.className = 'code-header';
      pre.parentNode.insertBefore(newHeader, pre);

      // Add copy button to the new header
      addCopyButtonToHeader(newHeader, pre);
      return;
    }

    // Add copy button to existing header
    addCopyButtonToHeader(codeHeader, pre);
  }

  /**
   * Adds a copy button to a code header element
   * @param {HTMLElement} header - The code header element
   * @param {HTMLElement} pre - The pre element containing code
   */
  function addCopyButtonToHeader(header, pre) {
    // Create the copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');

    // Add copy icon
    copyButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
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
        copyButton.classList.add('copied');
        copyButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;

        // Reset after 2 seconds
        setTimeout(() => {
          copyButton.classList.remove('copied');
          copyButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          `;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy code: ', err);
      });
    });

    // Append button to header (flex layout will position it on the right)
    header.appendChild(copyButton);
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
