
import { h, Fragment } from "./jsx-runtime";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

async function buttonTriggerImp(responseField: HTMLElement) {
    responseField.textContent = "";
    try {
        const res = await fetch("/api/v1", {
            method: "POST"
        });
        const data = await res.json();
        if (res.status != 200) {
            throw `expected return code 200 but got: ${res.status} with message: ${data.message}`
        }
        responseField.className = 'text-success m-2';
        responseField.textContent = data.message;
    } catch (err) {
        console.error(err);
        responseField.className = 'text-danger m-2';
        responseField.textContent = err instanceof Error ? err.message : String(err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const titleElement = document.createElement('title');
    titleElement.textContent = "Garage Door Opener";
    document.head.appendChild(titleElement);

    document.documentElement.setAttribute('data-bs-theme','dark');

    const responseField = (
        <div class="col m-3"></div>
    )

    const app = (
      <div class="container-sm border rounded p-5 mt-5">
        <div class="row">
            <h1 class="col-sm text-center m-3">Garage Door:</h1>
            <button onClick={() => buttonTriggerImp(responseField)} class="col-sm btn btn-primary m-3">Trigger Door</button>
        </div>
        <div class="row">
            {responseField}
        </div>
      </div>
    );

    document.body.appendChild(app);
});