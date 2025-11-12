/** @jsx Pragma */
import { Pragma } from "./jsx-runtime";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { PasswordModel } from './password-model';

export function PasswordView(model: PasswordModel): any {
    
    const passwordField = (<input type="text" id="fname" value={model.password} onInput={(event) => { model.password = event.target.value }}></input>);

    model.onPasswordChange((newValue, oldValue) => {
        passwordField.value = newValue;
    });

    return passwordField;
}