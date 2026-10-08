(() => {
  const headingSelector = 'h1, h2, h3, h4';
  const cleanHeading = heading => {
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    let node, lastText;
    while ((node = walker.nextNode())) if (node.nodeValue.trim()) lastText = node;
    if (lastText) lastText.nodeValue = lastText.nodeValue.replace(/[.。]+(?=\s*$)/u, '');
  };
  const scan = root => {
    if (root.nodeType !== Node.ELEMENT_NODE) return;
    if (root.matches(headingSelector)) cleanHeading(root);
    root.querySelectorAll(headingSelector).forEach(cleanHeading);
  };
  scan(document.body);
  new MutationObserver(records => {
    for (const record of records) {
      const target = record.target;
      const heading = record.type === 'characterData'
        ? target.parentElement?.closest(headingSelector)
        : (target.nodeType === Node.ELEMENT_NODE ? target.closest(headingSelector) : target.parentElement?.closest(headingSelector));
      if (heading) cleanHeading(heading);
      if (record.type === 'childList') record.addedNodes.forEach(scan);
    }
  }).observe(document.body, {subtree: true, childList: true, characterData: true});
})();
