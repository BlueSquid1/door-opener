import { ObservableProperty } from './Listener';

export function Pragma(tag: string, props: Record<string, any> | null, ...children: any[]): HTMLElement {
    const el = document.createElement(tag);
    if (props) {
        for (const [key, value] of Object.entries(props)) {
            if (key.startsWith("on") && typeof value === "function") {
                el.addEventListener(key.slice(2).toLowerCase(), value);
            } else if (key == "bind" && value instanceof ObservableProperty) {
                if ( el instanceof HTMLInputElement ) {
                    el.setAttribute("value", value.value);
                    el.addEventListener("input", (event) => {
                        value.value = el.value;
                    });
                    value.subscribe((newValue, oldValue) => {
                        el.value = newValue;
                    });
                }
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