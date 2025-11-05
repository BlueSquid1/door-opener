export function h(tag: string, props: Record<string, any> | null, ...children: any[]): HTMLElement {
  const el = document.createElement(tag);
  if (props) {
    for (const [key, value] of Object.entries(props)) {
      if (key.startsWith("on") && typeof value === "function") {
        el.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        el.setAttribute(key, String(value));
      }
    }
  }
  for (const child of children) {
    if (typeof child === "string") el.appendChild(document.createTextNode(child));
    else if (child instanceof Node) el.appendChild(child);
  }
  return el;
}

export const Fragment = (props: { children?: any[] }) => {
  const frag = document.createDocumentFragment();
  for (const child of props.children || []) {
    frag.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
  }
  return frag;
};