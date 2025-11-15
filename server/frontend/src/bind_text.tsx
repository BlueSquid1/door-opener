/** @jsx Pragma */
import { Pragma } from "./jsx-runtime";

// Imports to use bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import {ObservableProperty} from "./Listener";

export function BindText( {value, className} : {value: ObservableProperty<string>, className: string}) : HTMLInputElement {
    const inputElement = (<input type="text" class={`text-start ${className}`} value={value.value} onInput={(event) => { value.value = event.target.value }}></input>);

    value.subscribe((newValue) => {
        inputElement.value = newValue;
    });
    return inputElement;
}