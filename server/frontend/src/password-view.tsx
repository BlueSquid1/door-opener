/** @jsx Pragma */
import { Pragma } from "./jsx-runtime";

// Imports to use bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { PasswordModel } from './password-model';
import { BindText } from './bind_text';
import { HintP } from "./hint_p";

export function PasswordView(model: PasswordModel): any {  
    return (
        <div class="container-sm border">
            <div class="row">
                <p class="text-start col-sm">Password:</p>
                <BindText className='col-sm' value={model.password} />
            </div>
            <div class="row">
                <HintP className='col-sm' text={model.hintText} satificatory={model.satificatory} />
            </div>
        </div>
    );
}