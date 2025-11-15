import { PasswordModel } from './password-model';

export class PasswordController {
    model: PasswordModel;

    constructor(model: PasswordModel) {
        this.model = model;

        this.model.password.subscribe((newValue) => this.handlePasswordChange(newValue));
    }

    handlePasswordChange(newValue: string) : void {
        if ( newValue.length < 8 ) {
            this.model.hintText.value = "password too short";
            this.model.satificatory.value = false;
        } else {
            this.model.hintText.value = "password is a good length";
            this.model.satificatory.value = true;
        }
    }
}