/* ----------------------------------------INICIALIZACIÓN GENERAL---------------------------------------- */
const myModalElement = document.getElementById('exampleModal');
const myModal = new bootstrap.Modal(myModalElement);
let validation = false;
let dataArray = [];
let option = 0;
let pos = null;

const animals = [
    { type: "noaplica" || "", src: "img/pregunta.avif" },
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

/* ----------------------------------------GUARDAR CITA (NUEVA O EDITADA)---------------------------------------- */
const saveQuotes = () => {
    dataArray = JSON.parse(localStorage.getItem('citas') || `[]`);
    validations();
    if (validation) {
        if (option == 0) {
            const number = Date.now() + Math.floor(Math.random() * 10000);
            let data = {
                numberQuotes: number,
                namePet: document.getElementById("nombre-mascota").value.toUpperCase(),
                nameowner: document.getElementById("propietario").value.toUpperCase(),
                phone: document.getElementById("telefono").value,
                date: document.getElementById("fecha").value,
                hour: document.getElementById("hora").value,
                pet: document.getElementById("opcion").value,
                symptom: document.getElementById("sintomas").value.toUpperCase(),
                estado: "ABIERTA"
            };
            dataArray.unshift(data);
            localStorage.setItem(`citas`, JSON.stringify(dataArray));
            showQuotes();
            clean();
            myModal.toggle();
        } else if (option == 1) {
            if (option == 1) {
                Swal.fire({
                    title: "¿Confirmar edición?",
                    text: "¿Estás seguro de guardar los cambios?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#008000",
                    cancelButtonColor: "#c30404",
                    confirmButtonText: "Sí, editar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        dataArray[pos].namePet = document.getElementById("nombre-mascota").value.toUpperCase();
                        dataArray[pos].nameowner = document.getElementById("propietario").value.toUpperCase();
                        dataArray[pos].phone = document.getElementById("telefono").value;
                        dataArray[pos].date = document.getElementById("fecha").value;
                        dataArray[pos].hour = document.getElementById("hora").value;
                        dataArray[pos].pet = document.getElementById("opcion").value;
                        dataArray[pos].symptom = document.getElementById("sintomas").value.toUpperCase();
                        localStorage.setItem(`citas`, JSON.stringify(dataArray));
                        showQuotes();
                        clean();
                        option = 0;
                        myModal.hide();
                        document.getElementById("btn-save").textContent = "GUARDAR";

                        Swal.fire({
                            title: "¡Editado!",
                            text: "Los datos han sido actualizados.",
                            icon: "success",
                            confirmButtonColor: "#008000",
                        });
                    }
                });
            }

        }
    } else {
        console.log("error en las validaciones");
    }
}

/* ----------------------------------------MOSTRAR CITAS---------------------------------------- */
const showQuotes = (busca) => {
    const quotes = busca || JSON.parse(localStorage.getItem('citas') || `[]`);
    quotes.sort((a, b) => {
        let date1 = new Date(`${a.date}T${a.hour}`)
        let date2 = new Date(`${b.date}T${b.hour}`)
        return date1 - date2
    });
    document.getElementById("card").textContent = " ";

    quotes.forEach((elemento, i) => {

        let animal = animals.find((element) => element.type === elemento.pet || "")

        document.getElementById("card").innerHTML += `
        <div class="col-md-4">
  <div class="card p-3 mb-4 rounded-4 position-relative">
    <span class="numero-cita">${elemento.numberQuotes}</span>
    <div class="row g-0 align-items-center">
      <div class="col-4 text-center">
        <img src="${animal.src}" alt="Animal" class="img-fluid rounded-start" style="height: 100px; width:100px">
      </div>
      <div class="col-8">
        <div class="card-body p-2">
          <h5 class="mb-1"><strong>NOMBRE:</strong> ${elemento.namePet}</h5>
          <h5 class="mb-2"><strong>PROPIETARIO:</strong> ${elemento.nameowner}</h5>
        </div>
      </div>
    </div>

    <div class="card-body pt-0">
      <p class="mb-1"><strong>TELEFONO:</strong> ${elemento.phone}</p>
      <p class="mb-1"><strong>FECHA:</strong> ${elemento.date}</p>
      <p class="mb-1"><strong>HORA:</strong> ${elemento.hour}</p>
      <p class="mb-1"><strong>MASCOTA:</strong> ${elemento.pet}</p>
      <p class="mb-1"><strong>SINTOMA:</strong> ${elemento.symptom}</p>
     
      <div class="form-floating mb-3">
        <select class="form-select state" id="estado-${elemento.numberQuotes}">
          <option value="ABIERTA">ABIERTA</option>
          <option value="ANULADA">ANULADA</option>
          <option value="TERMINADA">TERMINADA</option>
        </select>
        <label for="estado-${elemento.numberQuotes}">ESTADO</label>
      </div>

      <div class="d-flex justify-content-center gap-3 mb-2">
        <button type="button" class="btn btn-success btn-edit ">EDITAR</button>
        <button type="button" class="btn btn-danger btn-eliminate px-1">ELIMINAR</button>
      </div>
    </div>
  </div>
</div>`

            ;
    });

    /* ----------------------------------------ELIMINAR CITA---------------------------------------- */
    const btnEliminate = document.querySelectorAll(".btn-eliminate");
    btnEliminate.forEach((eliminate, index) => {
        eliminate.addEventListener("click", () => {
            Swal.fire({
                title: "¿Estás seguro?",
                text: "Esta acción eliminará la cita permanentemente.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#008000",
                cancelButtonColor: "#c30404",
                confirmButtonText: "Sí, eliminar"
            }).then((result) => {
                if (result.isConfirmed) {
                    const quoteToDelete = quotes[index];
                    const id = quoteToDelete.numberQuotes;
                    const allQuotes = JSON.parse(localStorage.getItem('citas') || '[]');
                    const updatedQuotes = allQuotes.filter(q => q.numberQuotes !== id);
                    localStorage.setItem("citas", JSON.stringify(updatedQuotes));
                    showQuotes();
                    clean();
                    Swal.fire({
                        title: "¡Eliminado!",
                        text: "La cita ha sido eliminada.",
                        icon: "success",
                        confirmButtonColor: "#008000",
                    });
                }
            });
        });
    });


    /* ----------------------------------------EDITAR CITA---------------------------------------- */
    const btnEdit = document.querySelectorAll(".btn-edit");
    btnEdit.forEach((edit, h) => {
        edit.addEventListener("click", () => {
            const allQuotes = JSON.parse(localStorage.getItem('citas') || `[]`);
            const quoteNumber = quotes[h].numberQuotes;
            pos = allQuotes.findIndex(q => q.numberQuotes === quoteNumber);
            let quote = quotes[h];
            document.getElementById("nombre-mascota").value = quote.namePet;
            document.getElementById("propietario").value = quote.nameowner;
            document.getElementById("telefono").value = quote.phone;
            document.getElementById("fecha").value = quote.date;
            document.getElementById("hora").value = quote.hour;
            document.getElementById("opcion").value = quote.pet;
            document.getElementById("sintomas").value = quote.symptom;
            document.getElementById("btn-save").textContent = "EDITAR";
            option = 1;
            myModal.toggle();
            return pos;
        });
    });

    /* ----------------------------------------CAMBIAR ESTADO DE CITA---------------------------------------- */
    document.querySelectorAll(".state").forEach((element, p) => {
        const id = quotes[p].numberQuotes;
        element.value = quotes[p].estado;
        element.addEventListener("change", () => {
            const allQuotes = JSON.parse(localStorage.getItem("citas") || "[]");
            const realIndex = allQuotes.findIndex(q => q.numberQuotes === id);
            if (realIndex !== -1) {
                allQuotes[realIndex].estado = element.value;
                localStorage.setItem("citas", JSON.stringify(allQuotes));
                filterByState();
            }
        });
    });
}

/* ----------------------------------------FILTRAR CITAS POR ESTADO---------------------------------------- */
const filterByState = () => {
    const quotes = JSON.parse(localStorage.getItem('citas') || `[]`);
    let estado = document.getElementById("filtro2").value;
    if (estado === "TODAS") {
        showQuotes(quotes);
    } else {
        const busca = quotes.filter(elemento => elemento.estado == estado);
        showQuotes(busca);
    }
}

/* ----------------------------------------FILTRAR CITAS POR NOMBRE---------------------------------------- */
const filterByName = () => {
    const quotes = JSON.parse(localStorage.getItem('citas') || `[]`);
    let name = document.getElementById("buscador").value;
    const busca = quotes.filter((element) =>
        element.namePet.includes(name.toUpperCase()) || element.nameowner.includes(name.toUpperCase())
    );
    if (busca.length > 0) {
        showQuotes(busca);
    } else {
        console.log("error");
    }
}

/* ----------------------------------------LIMPIAR FORMULARIO---------------------------------------- */
const clean = () => {
    document.getElementById("nombre-mascota").value = "";
    document.getElementById("propietario").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("hora").value = "";
    document.getElementById("opcion").value = "";
    document.getElementById("sintomas").value = "";
}

/* ----------------------------------------VALIDACIONES---------------------------------------- */
const validations = () => {
    let phone = document.getElementById("telefono").value;
    let hour = document.getElementById("hora").value;
    let date = document.getElementById("fecha").value;
    let datetoday = new Date();
    validation = false;

    if (document.getElementById("nombre-mascota").value == "") {
        Swal.fire({ text: "INSERTE EL NOMBRE DE LA MASCOTA", icon: "question", confirmButtonColor: "#008000", });
    } else if (document.getElementById("propietario").value == "") {
        Swal.fire({ text: "INSERTE NOMBRE DEL PROPIETARIO", icon: "question", confirmButtonColor: "#008000", });
    } else if (phone == "" || phone.length > 10 || phone.length < 10) {
        Swal.fire({ text: "POR FAVOR, INGRESE SU NÚMERO DE CELULAR (MÁX. 10 DÍGITOS)", icon: "question", confirmButtonColor: "#008000", });
    } else if (date == "" || new Date(date) < datetoday) {
        Swal.fire({ text: "INSERTE UNA FECHA CORRECTA", icon: "question", confirmButtonColor: "#008000", });
    } else if (hour == "" || hour < "08:00" || hour > "20:00") {
        Swal.fire({ text: "INSERTE UNA HORA DENTRO DEL HORARIO 08:00 AM A 08:00 PM", icon: "question", confirmButtonColor: "#008000", });
    } else if (document.getElementById("sintomas").value == "") {
        Swal.fire({ text: "INSERTE LOS SINTOMAS DE SU MASCOTA", icon: "question", confirmButtonColor: "#008000", });
    }
    else if (document.getElementById("sintomas").value.length > 400) {
        Swal.fire({ text: "SÓLO SE PERMITEN HASTA 400 CARACTERES EN SÍNTOMAS", icon: "warning", confirmButtonColor: "#008000", });
    }
    else {
        validation = true;
    }
}

/* ----------------------------------------EVENTOS DE INTERACCIÓN---------------------------------------- */
document.getElementById("btn-save").addEventListener("click", () => {
    saveQuotes();
});

document.addEventListener("DOMContentLoaded", () => {
    showQuotes();
    filterByState();
});

document.getElementById("buscador").addEventListener("input", filterByName);

document.getElementById("filtro2").addEventListener("input", () => {
    filterByState();
});
