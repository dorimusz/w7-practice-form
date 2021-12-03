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

const inputElement = (type, name, label, req = "") => {
    console.log(req);
    /*if (type === "checkbox") {
        return `
        <div class="checkbox">
            <label for="${name}">${label}</label>
            <input type="${type}" name="${name}" id="${name}" ${req}>
        </div>
   `
    } else {
        return `
        <div>
            <label for="${name}">${label}</label>
            <input type="${type}" name="${name}" id="${name}" ${req}>
        </div>
   `
    }*/

    return `
        <div class="${type}">
            <label for="${name}">${label}</label>
            <input type="${type}" name="${name}" id="${name}" ${req}>
        </div>
   `
}

const selectElement = (type, name, label, selectOptions) => {
   let optionElements = "";
    
   for (const option of selectOptions) {
        optionElements += `
            <option>${option}</option>
        `; //+=-vel hozzáadunk az üres stringhez, nem felülírjuk    a ${} meg arra való, hogy valamilyen JS cuccot bejutassunk
   }

    return `
        <div>
            <label>${label}</label>
            <${type} name="${name}">
                ${optionElements}
            </${type}>
        </div>
   `
}

/* Elrettentő példa:
const formElement = '<form id="form>' + inputElement("text", "firstName", "Keresztneved") + inputElement("file", "profilePicture", "Profilképed") + inputElement("email", "personalEmail", "Email címed") + inputElement("checkbox", "newsletter", "Szeretnél-e hírlevelet kapni") + inputElement("checkbox", "terms", "Elfogadod a felhasználási feltételeket?") + selectElement("select", "where", "Hol hallottál rólunk?", ["internetről", "ismerőstől", "egyéb"]) + '<button>Ok</button>' + '</form>
*/

//const nameData =  {
    //     type: "text",
    //     name: "firstName",
    //     label: "Keresztneved"
    //     required: "required"
    // }

const anotherFormFields = [
    {
        type: "text",
        name: "steet",
        label: "Közterület neve"
    },
    {
        type: "text",
        name: "houseNumber",
        label: "Házszám"
    },
    {
        type: "number",
        name: "zipCode",
        label: "Irányítószám"
    },
    {
        type: "text",
        name: "city",
        label: "Település neve"
    }
]

const formFields = [
    {
        type: "text",
        name: "firstName",
        label: "Keresztneved",
        required: "required"
    },
    {
        type: "file",
        name: "profilePicture",
        label: "Profilképed"
    },
    {
        type: "email",
        name: "personalEmail",
        label: "Email címed",
        required: "required"
    },
    {
        type: "checkbox",
        name: "newsletter",
        label: "Szeretnél-e hírlevelet kapni"
    },
    {
        type: "checkbox",
        name: "terms",
        label: "Elfogadod a felhasználási feltételeket?",
        required: "required"
    }
];

const selectFields = {
    type: "select",
    name: "where",
    label: "Hol hallottál rólunk?",
    options: ["internetről", "ismerőstől", "egyéb"]
};

// const temp = fetch("https://restcountries.com/v3.1/all");
// console.log(temp);

const processCountries = async () => {
    const countryRes = await fetch("https://restcountries.com/v3.1/all");
    const countryArr = await countryRes.json();
    //console.log(countryArr[0].name.official);

    //kell egy üres tömb
    let countriesList = [];

    // for ciklussal végig kell menni a country arron és minden országnak a name.officialjét bele kell rakni az üres tömbbe
    for (const country of countryArr) {
        //console.log(country);
        let countryName = country.name.official;
        //console.log(country.name.official);
        countriesList.push(countryName);
        //countriesList += countryName;
        //console.log(countriesList);
    }
    
    //returnölni a tömböt
    return countriesList;
}

const temp = processCountries();
console.log(temp); //nem a terunrt adja vissza, hanem a promise pendinget - innnen fogom tudni!
//processCountries();

// const anotherSelectFields = {
    // type: "select",
    // name: "countries",
    // label: "Ország",
    // options: ["Luxembourg", "Jamaica"]
    //options: processCountries()

// }
const anotherSelectFields = async () => { //3. promise
    return {
        type: "select",
        name: "countries",
        label: "Ország",
        options: await processCountries()
    }
}

/*Még mielőtt kiszerveztem volna külön függvénybe, ami alatta található
const formElement = `
    <div id="container"> 
        <form id="form">
            ${inputElement(nameData.type, nameData.name, nameData.label, "required")}
            ${inputElement("file", "profilePicture", "Profilképed")}
            ${inputElement("email", "personalEmail", "Email címed", "required")}
            ${inputElement("checkbox", "newsletter", "Szeretnél-e hírlevelet kapni")}
            ${inputElement("checkbox", "terms", "Elfogadod a felhasználási feltételeket?", "required")}
            ${selectElement("select", "where", "Hol hallottál rólunk?", ["internetről", "ismerőstől", "egyéb"])}
            <button>Ok</button>
        </form>
    </div>
`;
*/

const formElement = (ffs, id, sel) => {
    let toForm = "";

    for (const ff of ffs) {
        toForm += inputElement(ff.type, ff.name, ff.label, ff.required);
    }

    return `
        <form id="${id}">
            ${toForm}
            ${selectElement(sel.type, sel.name, sel.label, sel.options)}
            <button>Ok</button>
        </form>
    `
}

const formSubmit = (event) => {
    event.preventDefault(); //az alapértelmezett működése ennek az eseménynek ne fusson le
    console.log(event);
    const et = event.target;
    et.classList.add("submitted");

    const etValue = et.querySelector(`select[name="where"]`).value;
    console.log(etValue);
}

const inputEvent = (event) => {
    console.log(event.target.name);
    //console.log(event);
    const fName = document.querySelector(`input[name="firstName"]`);

    //Hogyan érhető el a form
    let tryForm = event.target.closest('#form'); //let tryForm = fName.closest('#form');
    console.log(tryForm);
    //console.log(fName);
    //console.log(event.target.value);
    if (/*event.target.name */  event.target.getAttribute("name") === "firstName") {
        document.getElementById("inputValueContent").innerHTML = event.target.value;
    }

    if (event.target.getAttribute("name") === "profilePicture") {
        console.log(event.target.files[0].name);
        console.log(event.target.files);

        //A feltöltött kép megjelenítése
        const image = URL.createObjectURL(event.target.files[0]);
        document.getElementById("inputValueContent").insertAdjacentHTML("beforeend", `
        <img src="${image}">
        `);
        console.log(image);
    }
}

const formTitle = `
    <div class="titleContainer">
        <h1>Iratkozz fel hírlevelünkre</h1>
    </div>
`;

async function loadEvent() {
    const waitAnotherSelectFields = await anotherSelectFields(); //ezért kellett asyncké tenni a függvényt, mert az await nem működik az async nélkül - stringnek nem tudok adni
   const root = document.getElementById("root");
   root.insertAdjacentHTML("beforeend", formTitle);
   root.insertAdjacentHTML("beforeend", formElement(formFields, "form", selectFields)); //hozzáadtam a formot a HTML-hez
   root.insertAdjacentHTML("beforeend", formElement(anotherFormFields, "form2", waitAnotherSelectFields));
   root.insertAdjacentHTML("beforeend", `
    <div id="inputValueContent"></div> 
   `);

   //Eseménykezelés: ne írja be a queryket az url-be
   const form = document.getElementById("form"); //A submit esemény nem a gombon, hanem a formon hívódik le, ezért a formon kell megragadni
   form.addEventListener("submit", formSubmit); //Argumentumként adom le a függvényt, de nem teszek zárójelet, hogy ne fusson le, mert így csak egy undefined return értéket ad vissza

    const inputList = form.querySelectorAll("input");
    for (const input of inputList) {
        input.addEventListener("input", inputEvent)
    }
}

window.addEventListener("load", loadEvent);