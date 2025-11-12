/** @jsx Pragma */
import { Pragma } from "./jsx-runtime";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { PasswordController } from './password-controller';
import { PasswordModel } from './password-model';
import { PasswordView } from './password-view';

document.addEventListener("DOMContentLoaded", () => {
    const model: PasswordModel = new PasswordModel();

    const controller: PasswordController = new PasswordController(model);

    const titleElement = document.createElement('title');
    titleElement.textContent = "Sign Up";
    document.head.appendChild(titleElement);

    document.documentElement.setAttribute('data-bs-theme','dark');

    const app = (
      <div>
        {PasswordView(model)}
      </div>
    );

    document.body.appendChild(app);
});