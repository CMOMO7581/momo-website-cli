function selectNode(node: Node) {
  const r = document.createRange(); r.selectNodeContents(node);
  const s = getSelection(); if (!s) return;
  s.removeAllRanges(); s.addRange(r);
}

// Copies text; if the clipboard is unavailable, selects `node` so the visitor can copy it by hand.
export function copyText(text: string, button: HTMLElement, node: Node, copied: string, selected: string) {
  const orig = button.textContent;
  const done = () => { button.textContent = copied; setTimeout(() => { button.textContent = orig; }, 1400); };
  const fail = () => { selectNode(node); button.textContent = selected; };
  try { navigator.clipboard.writeText(text).then(done, fail); } catch { fail(); }
}
