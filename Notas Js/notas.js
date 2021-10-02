// elementos para agregar las notas
const tituloNota = document.getElementById('titulo')
const textoNota = document.getElementById('texto')
const tipoNota = document.getElementById('tipo')
// elementos del tbody de la tabla
const listadoNotas = document.getElementById('contenidoTabla')
// elemento para ver detalle de la nota con boton ver
const detalleNota = document.getElementById('detalleNota')
// elemento para la edicion
const tituloNotaEditado = document.getElementById('tituloEditado')
const textoNotaEditado = document.getElementById('textoEditado')
const tipoNotaEditado = document.getElementById('tipoEditado')
// elemento para la busqueda
const busquedaInput = document.getElementById('busqueda');


const notaJson = localStorage.getItem('notas');
let notas = JSON.parse(notaJson) || [];

// esta funcion la usaremos para llamar al localStorage en todas las acciones que hagamos.
function guardarNotas() {
    const notasJson = JSON.stringify(notas);
    localStorage.setItem('notas', notasJson);
}
// funcion para crear numeros aleatorios
function ID() {
    return '#' + Math.random().toString(36).substr(2, 9);
}

// AGREGAR NOTAS PARA QUE LUEGO SE GUARDEN
function agregarNota(event) {
    event.preventDefault();
    const titulo = tituloNota.value.toUpperCase();
    const texto = textoNota.value;
    const tipo = tipoNota.value.toUpperCase();

    const nuevaNota = {
        titulo: titulo,
        texto: texto,
        tipo: tipo,
        id: ID(),
        creacion: Date.now(),
    }
    notas.push(nuevaNota);
    guardarNotas();
    event.target.reset();
    mostrarNotas();
}

// LISTAR NOTAS 
function mostrarNotas() {
    function filasDeNotas(nota) {
        const tr = `
        <tr>
    <td><a onclick="verDetalleNota('${nota.id}')" data-bs-toggle="modal" data-bs-target="#modalVerNota">${nota.titulo}</a></td>
    <td><a onclick="verDetalleNota('${nota.id}')" data-bs-toggle="modal" data-bs-target="#modalVerNota">${nota.tipo}</a></td>
    <td>
    <button onclick ="cargarModalEditor('${nota.id}')" class="btn btn-outline-light" data-bs-toggle="modal"
    data-bs-target="#modalEditarNota"><i class="far fa-edit"></i></button>
    <button onclick="eliminarNotas('${nota.id}')" class="btn btn-outline-light"><i class="fas fa-eraser"></i></button>
    </td>
    <tr>
    `;
        return tr;
    }
    const contenido = notas.map(filasDeNotas);
    contenidoTabla.innerHTML = contenido.join('');
}

// Funcion para ELIMINAR NOTAS 
function eliminarNotas(id) {
    function notasFilter(nota) {
        return nota.id != id;
    }
    const notasFiltradas = notas.filter(notasFilter);
    notas = notasFiltradas;
    mostrarNotas();
    guardarNotas();
}

// Funcion para VER DETALLE DE LAS NOTAS
function verDetalleNota(id) {
    const notaEncontrada = notas.find(function (nota) {
        return nota.id === id;
    });
    let fecha = new Date(notaEncontrada.creacion)
    const contenido = `
    <div class="mb-2">
    <h6><b>Fecha: </b>${fecha.toLocaleString()}<h6>
 </div>
 <div>
     <p class="nota-encontrada">${notaEncontrada.texto}</p>
 </div>
 `;
    detalleNota.innerHTML = contenido
}

//--------> PARTE DE EDICION DE NOTA

// definimos la vble auxiliar
let notaEditadaId = '';

// primero creo lo que abriria el onclick de editar -  me muestra el modal con los datos viejos

function cargarModalEditor(id) {
    const notaEncontrada = notas.find(function (nota) {
        return nota.id === id;
    });

    // preestablecemos el valor de la nota que vamos a editar
    tituloNotaEditado.value = notaEncontrada.titulo;
    textoNotaEditado.value = notaEncontrada.texto;
    tipoNotaEditado.value = notaEncontrada.tipo;
    
// ver como asignar valor a input de tipo select
    notaEditadaId = id;
}

function edicionNota(event) {
    event.preventDefault();
    const tituloEditado = tituloNotaEditado.value.toUpperCase();
    const textoEditado = textoNotaEditado.value;
    const tipoEditado = tipoNotaEditado.value.toUpperCase();

    //  guardamos en el objeto lo nuevo, el cual invocamos despues.
    const notaEditada = {
        titulo: tituloEditado,
        texto: textoEditado,
        tipo: tipoEditado,
    }
    // creamos la funcion para usar spread syntax
    function notasActualizadasMap(nota) {
        if (nota.id === notaEditadaId) {
            return { ...nota, ...notaEditada }
        } else {
            return nota;
        }
    }
    //  creamos la vble de la nota actualizada y dentro de ella definimos la funcion que va  arecorrer el array notas y aplica la otra funcion
    const notasActualizadas = notas.map(notasActualizadasMap);
    notas = notasActualizadas;
    mostrarNotas();
    guardarNotas();
}

// FILTRO DE TABLA 

// FORMA DE BUSQEUDA W3S - Create A Filtered Table
function buscarNota() {
    const filter = busquedaInput.value.toUpperCase();
    const table = document.getElementById("miTabla");
    const tr = table.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName("td")[0];
        const td2 =tr[i].getElementsByTagName("td")[1];
        console.log(tr[i].getElementsByTagName("td"))
        if (td) {
            // concatenar las dos celdas, con parentecis reordeno prioridades de las op  
            const txtValue = (td.textContent || td.innerText) + (td2.innerText);
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


// Forma JJ

// function buscarNota(event){
//     event.preventDefault();
//     const busquedaInput = document.getElementById('busqueda');
//     function notasFilter (nota){
//         return nota.titulo.includes(busquedaInput.value.toLowerCase())
//     }
//     const notasFiltradas = notas.filter(notasFilter);
//     // console.log(notasFiltradas)
//     notas = notasFiltradas
//     mostrarNotas()
    
// }

// function limpiarFiltro(){
//     location.reload();
// }

// FORMA DE AGREGAR SELECCIONES DE LA W3S -- Select add() Method
// AGREGAR TIPO EN LA CREACION
function agregarTipo(){
    const newType = document.getElementById("nuevoTipo")
    let x = document.getElementById("tipo");
    let option = document.createElement("option");
    option.text = newType.value;
    x.add(option,x[4]);

    guardarNotas()
}

// AGREGAR TIPO EN LA EDICION 
function agregarTipoEditado(){
    const newTypeEdit = document.getElementById("nuevoTipoEditado")
    let x = document.getElementById("tipoEditado");
    let option = document.createElement("option");
    option.text = newTypeEdit.value;
    x.add(option,x[4]);

    guardarNotas()
}

    mostrarNotas();
