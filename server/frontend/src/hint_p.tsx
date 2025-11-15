/** @jsx Pragma */
import { Pragma } from "./jsx-runtime";

// Imports to use bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import {ObservableProperty} from "./Listener";

export function HintP({ text, satificatory, className }: {text : ObservableProperty<string>, satificatory: ObservableProperty<boolean | null>, className: string} ) : Element {
    const hintField : Element = (<p class={`text-start ${className}`}>{text.value}</p>)

    text.subscribe((newValue) => {
        hintField.textContent = newValue;
    });

    satificatory.subscribe((newValue) => {
        if (newValue) {
            hintField.className = `text-start text-success ${className}`;
        } else {
            hintField.className = `text-start text-danger ${className}`;
        }
    });

    return hintField;
}