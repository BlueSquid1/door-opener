import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

function appendElement(baseElement: any, elementType: any) {
    const childElement = document.createElement(elementType);
    baseElement.appendChild(childElement);
    return childElement;
}

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
        responseField.textContent = err;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const headerTitle = appendElement(document.head, 'title');
    headerTitle.textContent = "Garage Door Opener";

    document.documentElement.setAttribute('data-bs-theme','dark');

    const app = document.getElementById('app');
    const containerDiv = appendElement(app, 'div');
    containerDiv.className = 'container-sm border rounded p-5 mt-5';
    const firstRow = appendElement(containerDiv, 'div');
    firstRow.className = "row";
    const title = appendElement(firstRow, 'h1');
    title.textContent = "Garage Door:";
    title.className = "col-sm text-center m-3";
    const button = appendElement(firstRow, 'button');
    button.className = "col-sm btn btn-primary m-3";
    button.textContent = 'Trigger Door';
    const secondRow = appendElement(containerDiv, 'div');
    secondRow.className = 'row';
    const responseField = appendElement(secondRow, 'div');
    responseField.className = 'col m-3';
    button.addEventListener("click", () => buttonTriggerImp(responseField));
});