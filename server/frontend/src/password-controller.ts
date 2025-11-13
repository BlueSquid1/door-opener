import { PasswordModel } from './password-model';

export class PasswordController {
    model: PasswordModel;

    constructor(model: PasswordModel) {
        this.model = model;

        this.model.password.subscribe((newValue, oldValue) => this.handlePasswordChange(newValue, oldValue));
    }

    handlePasswordChange(newValue: string, oldValue: string) : void {
        this.model.satificatory.value = newValue.length >= 8;
    }
}