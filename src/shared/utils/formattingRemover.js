const handlePastedTextFormatting = (e) => {
  // Prevent the default action
  e.preventDefault();

  // Get the copied text from the clipboard
  let text = '';

  if (e.clipboardData) {
    text = (e.originalEvent || e).clipboardData.getData('text/plain');
  } else if (window.clipboardData) {
    text = window.clipboardData.getData('Text');
  }

  if (document.queryCommandSupported('insertText')) {
    document.execCommand('insertText', false, text);
  } else {
    // Insert text at the current position of caret
    const range = document.getSelection().getRangeAt(0);
    range.deleteContents();

    const textNode = document.createTextNode(text);
    range.insertNode(textNode);
    range.selectNodeContents(textNode);
    range.collapse(false);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

export default handlePastedTextFormatting;
