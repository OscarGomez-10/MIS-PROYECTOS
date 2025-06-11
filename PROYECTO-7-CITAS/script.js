const myModalElement = document.getElementById('exampleModal');
const myModal = new bootstrap.Modal(myModalElement);
let validation = false
let dataArray = []
let option = 0
let pos = null
const animals = [
    { type: "perro", src: "img/perro.jpg" },
    { type: "gato", src: "img/gato.jpg" },
    { type: "cocodrilo", src: "img/cocodrilo.jpg" },
    { type: "hamster", src: "img/hamster.jpg" },
    { type: "loro", src: "img/loro.jpg" },
    { type: "pez", src: "img/pez.jpg" },
    { type: "ardilla", src: "img/ardilla.jpg" },
    { type: "pato", src: "img/pato.jpg" },
    { type: "oveja", src: "img/oveja.jpg" },
    { type: "conejo", src: "img/conejo.jpg" }

]
const saveQuotes = () => {
    dataArray = JSON.parse(localStorage.getItem('citas') || []);
    validations()
    if (validation) {
        if (option == 0) {
            let data = {
                namePet: document.getElementById("nombre-mascota").value,
                nameowner: document.getElementById("propietario").value,
                phone: document.getElementById("telefono").value,
                date: document.getElementById("fecha").value,
                hour: document.getElementById("hora").value,
                pet: document.getElementById("opcion").value,
                symptom: document.getElementById("sintomas").value,
                estado: "abierta"
            }
            dataArray.unshift(data)
            localStorage.setItem(`citas`, JSON.stringify(dataArray))
            showQuotes()
            clean()
        }
        else if (option == 1) {
            dataArray[pos].namePet = document.getElementById("nombre-mascota").value;
            dataArray[pos].nameowner = document.getElementById("propietario").value;
            dataArray[pos].phone = document.getElementById("telefono").value;
            dataArray[pos].date = document.getElementById("fecha").value;
            dataArray[pos].hour = document.getElementById("hora").value;
            dataArray[pos].pet = document.getElementById("opcion").value;
            dataArray[pos].symptom = document.getElementById("sintomas").value;
            localStorage.setItem(`citas`, JSON.stringify(dataArray))
            showQuotes()
            clean()
            option = 0
            document.getElementById("btn-save").textContent = "guardar"
        }
    }
    else {
        console.log("error en las validaciones");
    }
}

const showQuotes = () => {
    const quotes = JSON.parse(localStorage.getItem('citas'));
    document.getElementById("card").textContent = " "
    quotes.forEach((elemento, i) => {
        animals.forEach((item) => {
            if (elemento.pet == item.type) {
                document.getElementById("card").innerHTML += `
                <div  class="card2">
                <div class="nombre-imagen">
                <img class="img-animals" src="${item.src}">
                <div class="nombre-propietario">
                <h4> NOMBRE: ${elemento.namePet}</h4>
                <h4> PROPIETARIO: ${elemento.nameowner}</h4>
                </div>
                </div>
                <h4> TELEFONO:   ${elemento.phone}</h4>
                <h4> FECHA:     ${elemento.date}</h4>
                <h4> HORA:    ${elemento.hour}</h4>
                <h4> MASCOTA:   ${elemento.pet}</h4>
              <div class="form-control" style="height:100px;margin:5px 0 5px 0">SINTOMAS: ${elemento.symptom}</div>
              </textarea>
              <div class="estado-btns">
              <div class="form-floating mb-3">
              <select class="form-select  state" id="filtro" >
              <option value="ABIERTA">ABIERTA</option>
              <option value="ANULADA">ANULADA</option>
              <option value="TERMINADA">TERMINADA</option>
              </select>
              <label for="filtro">ESTADO</label>
              </div>
              <button type="button"  class="btn btn-success btn-edit">EDIT  </button>
              <button type="button" class="btn btn-danger  btn-eliminate">DELETE</button>
              </div>
              
              </div>
              `
            }
        })
        const btnEliminate = document.querySelectorAll(".btn-eliminate");
        btnEliminate.forEach((eliminate, e) => {
            eliminate.addEventListener("click", () => {
                quotes.splice(e, 1)
                localStorage.setItem("citas", JSON.stringify(quotes))
                showQuotes()
                clean()
            })
        })
        const btnEdit = document.querySelectorAll(".btn-edit")
        btnEdit.forEach((edit, h) => {
            edit.addEventListener("click", () => {
                const quote = quotes[h]
                document.getElementById("nombre-mascota").value = quote.namePet,
                    document.getElementById("propietario").value = quote.nameowner,
                    document.getElementById("telefono").value = quote.phone,
                    document.getElementById("fecha").value = quote.date,
                    document.getElementById("hora").value = quote.hour,
                    document.getElementById("opcion").value = quote.pet,
                    document.getElementById("sintomas").value = quote.symptom,
                    document.getElementById("btn-save").textContent = "edit"
                option = 1
                pos = i
                myModal.toggle()

            })
        })


    });
}

const filterr = () => {
    let newestado = document.getElementById("filtro").value;
    console.log(newestado);

}
document.getElementById("")
const clean = () => {
    document.getElementById("nombre-mascota").value = ""
    document.getElementById("propietario").value = ""
    document.getElementById("telefono").value = ""
    document.getElementById("fecha").value = ""
    document.getElementById("hora").value = ""
    document.getElementById("opcion").value = ""
    document.getElementById("sintomas").value = ""
}

const validations = () => {
    validation = false
    if (document.getElementById("nombre-mascota").value == "") {
        Swal.fire({
            text: "INSERTE EL NOMBRE DE LA MASCOTA",
            icon: "question"
        });
    }
    else if (document.getElementById("propietario").value == "") {
        Swal.fire({
            text: "INSERTE NOMBRE DEL PROPIETARIO",
            icon: "question"
        });

    }
    else if (document.getElementById("telefono").value == "") {
        Swal.fire({
            text: "INSERTE SU TELEFONO",
            icon: "question"
        });
    }
    else if (document.getElementById("fecha").value == "") {
        Swal.fire({
            text: "INSERTE UNA FECHA CORRECTA",
            icon: "question"
        });
    }
    else if (document.getElementById("hora").value == "") {
        Swal.fire({
            text: "INSERTE UNA HORA",
            icon: "question"
        });
    }
    else if (document.getElementById("sintomas").value == "") {
        Swal.fire({
            text: "INSERTE LOS SINTOMAS DE SU MASCOTA",
            icon: "question"
        });
    }
    else {
        validation = true
    }
}
document.getElementById("btn-save").addEventListener("click", () => {
    saveQuotes()
})
document.addEventListener("DOMContentLoaded", () => {
    showQuotes()
})




