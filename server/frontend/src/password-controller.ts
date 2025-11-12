import { PasswordModel } from './password-model';

export class PasswordController {
    model: PasswordModel;

    constructor(model: PasswordModel) {
        this.model = model;

        setInterval(() => {
            this.model.password = "abc";
            },1000);
    }
}