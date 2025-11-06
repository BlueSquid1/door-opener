import { Pragma, Fragment, render } from "./jsx-runtime";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

async function buttonTriggerImp(responseField: any) {
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
        <div className="col m-3"></div>
    )

    const app = (
      <div className="container-sm border rounded p-5 mt-5">
        <div className="row">
            <h1 className="col-sm text-center m-3">Garage Door:</h1>
            <button onClick={() => buttonTriggerImp(responseField)} className="col-sm btn btn-primary m-3">Trigger Door</button>
        </div>
        <div className="row">
            {responseField}
        </div>
      </div>
    );

    render(app, document.body);
});