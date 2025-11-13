/** @jsx Pragma */
import { Pragma } from "./jsx-runtime";

// Imports to use bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { PasswordModel } from './password-model';

export function PasswordView(model: PasswordModel): any {  
    const hintField : Element = (<p class="text-start"></p>)
    model.satificatory.subscribe((newValue, oldValue) => {
        if (newValue) {
            hintField.className = "text-start text-success";
            hintField.textContent = "meets expectations";
        } else {
            hintField.className = "text-start text-danger";
            hintField.textContent = "not long enough";
        }
    });

    return (
        <div>
            <p class="text-start">Password:</p>
            <input type="text" class="text-start" bind={model.password}></input>
            {hintField}
        </div>
    );
}