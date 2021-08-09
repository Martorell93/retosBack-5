//Eliminar info
function eliminarInfo() {
    let posicion = document.getElementById("cuerpo");
    posicion.remove();
}

//Método POST
async function postPro() {
    try
    {
        let profesional = new Professional (
            document.getElementById("name").value,
            document.getElementById("age").value, 
            document.getElementById("genre").value,
            document.getElementById("nationality").value,
            document.getElementById("profession").value
        )

        let url ="http://localhost:4000/profesionales";

        let param =
        {
            headers: {"Content-type": "application/json; chasert= UTF-8"},
            body: JSON.stringify(profesional),
            method: "POST"
        }
        let data = await fetch(url, param);
        let result = await data.json();

        console.log(result);
    }
    catch(error) 
    {
        console.log(error);
    }
}

//Método GET y filtro por id
async function getPro() {
    let id = document.getElementById("id").value;
    let cuerpo = document.createElement("tbody");
    cuerpo.setAttribute("id", "cuerpo");
    let posicion = document.getElementById("tabla");
    posicion.appendChild(cuerpo);
    if (id) {
        let url = `http://localhost:4000/profesionales?id=${id}`;
        let param = {
            headers: {
                "Content-type": "application/json; charset= UTF-8"
            },
            method: "GET"
        }

        try {
            let data = await fetch(url, param);
            let result = await data.json();
            let posicion = document.getElementById("cuerpo");
            let row = document.createElement("tr");
            let th = document.createElement("th");
            th.setAttribute("scope", "row");
            th.textContent = result.name;
            let td1 = document.createElement("td");
            td1.textContent = result.age;
            let td2 = document.createElement("td");
            td2.textContent = result.genre;
            let td3 = document.createElement("td");
            td3.textContent = result.nationality;
            let td4 = document.createElement("td");
            td4.textContent = result.profession;
            posicion.appendChild(row);
            row.appendChild(th);
            row.appendChild(td1);
            row.appendChild(td2);
            row.appendChild(td3);
            row.appendChild(td4);   
        }
        catch(error) {
            console.log(error);
        }
    }
    else {
        let url ="http://localhost:4000/profesionales";
        let param = {
            headers: {
                "Content-type": "application/json; charset= UTF-8"
            },
                method: "GET"
        }
        try {
            let data = await fetch(url, param);
            let result = await data.json();
            for (let i = 0; i < result.length; i++) {
                let posicion = document.getElementById("cuerpo");
                let row = document.createElement("tr");
                let th = document.createElement("th");
                th.setAttribute("scope", "row");
                th.textContent = result[i].name;
                let td1 = document.createElement("td");
                td1.textContent = result[i].age;
                let td2 = document.createElement("td");
                td2.textContent = result[i].genre;
                let td3 = document.createElement("td");
                td3.textContent = result[i].nationality;
                let td4 = document.createElement("td");
                td4.textContent = result[i].profession;
                posicion.appendChild(row);
                row.appendChild(th);
                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
                row.appendChild(td4);
            }
        }
        catch(error) {
            console.log(error);
        }
    }
}

//Método PUT
async function putPro() {
    let id = document.getElementById("id").value;
    let nuevoNombre = document.getElementById("name").value;
    let nuevoEdad = document.getElementById("age").value;
    let nuevoGenero = document.getElementById("genre").value;
    let nuevoNation = document.getElementById("nationality").value;
    let nuevoPro = document.getElementById("profession").value;
    try{
        
        let url ="http://localhost:4000/profesionales";
        let param = {
            headers: {
                "Content-type": "application/json; charset= UTF-8"
            },
            body: 
                JSON.stringify({name : nuevoNombre,
                age : nuevoEdad,
                genre: nuevoGenero,
                nationality : nuevoNation,
                profession : nuevoPro,
                posicion : id})
            ,
            method: "PUT"
        }
        let data = await fetch(url, param);
        let result = await data.json();

        console.log(result);
    }
    catch(error) 
    {
        console.log(error);
    }
}

//Método DELETE
async function deletePro() {
    let id = document.getElementById("id").value;
    let body1 = {posicion: id};
    try
    {
        let url ="http://localhost:4000/profesionales";
        let param =
        {
            headers: {"Content-type": "application/json; chasert= UTF-8"},
            body: JSON.stringify(body1),
            method: "DELETE"
        }
        console.log(JSON.stringify(body1))
        let data = await fetch(url, param);
        let result = await data.json();

        console.log(result);
    }
    catch(error) 
    {
        console.log(error);
    }
}