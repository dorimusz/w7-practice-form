/*
Függvény:
function functionName(parameter) {
    parameter === "argumentum as a string"
}
functionName("argumentum as a string"); - ez a meghívása


Változóként létrehozott függvény:
const argument = "argument as a string";
const functionName = function (parameter) {
    parameter === "argument as a string"
}
functionName(argument); - ez a meghívása

Arrow function, metódusként nem tudjuk használni
const functionName = () => {

}
functionName(); - ez a meghívása

amikor befelé küldünk valamit, az argumentum
Amikor 
*/

const input = (type, name, label) => {
   return `
        <div>
            <label>${label}</label>
            <input type="${type}" name="${name}">
        <div>
   `
}
    
const form = `
    <form id="form">
        ${ input("text", "firstName", "Keresztneved") }
        ${ input("file", "profilePicture", "Profilképed") }
        ${ input("email", "personalEmail", "Email címed") }
        ${ input("radio", "newsletter", "Szeretnél-e hírlevelet kapni") }
        ${ input("checkbox", "terms", "Elfogadod a felhasználási feltételeket?") }
    </form>
`

function loadEvent() {
   const root = document.getElementById("root");
   root.insertAdjacentHTML("beforeend", form); //hozzáadtam a formot a HTML-hez
}

window.addEventListener("load", loadEvent);