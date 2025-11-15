import { ObservableProperty } from './Listener';

type ComponentFn = (...args: any[]) => any;
export function Pragma(tag: string | ComponentFn, props: Record<string, any> | null, ...children: any[]): HTMLElement {
    if (typeof tag === "function") {
        if (children.length === 1) {
            props.children = children[0];
        } else if (children.length > 1) {
            props.children = children;
        }
        return tag(props);
    }
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