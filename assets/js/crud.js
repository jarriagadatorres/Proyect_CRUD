function prueba() {
    elementsTD = [
        "Campo - RUT",
        "Campoo - Nombre",
        "Campo - Apellido"
    ];
    crearLinea(elementsTD);
    elementsTD2 = [
        "Campo 2 - RUT",
        "Campo 2 - Nombre",
        "Campo 2- Apellido"
    ];
    crearLinea(elementsTD2);
}

function crearLinea(elements) {
    const Lista_Nombres = document.querySelector('#Lista_Nombres');
    if (elements && Array.isArray(elements)) {
        tr = document.createElement('tr');
        Lista_Nombres.appendChild(tr);
        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            const newtd = document.createElement('td');
            newtd.textContent = element;
            Lista_Nombres.appendChild(newtd);

        }
        eliminarbtn = document.createElement('button');
        eliminarbtn.textContent = 'Eliminar';
        eliminarbtn.classList.add('btn', 'btn-eliminar');
        Lista_Nombres.appendChild(eliminarbtn);
        editarbtn = document.createElement('button');
        editarbtn.textContent = 'editar';
        editarbtn.classList.add('btn', 'btn-editar');
        Lista_Nombres.appendChild(editarbtn);

    }
    return;
}
function listar(arr_rut, arr_nombre, arr_apellido) {      //recibo 3 arreglos obtenidos de Storage
    limpiarListaHtml();
    for (i = 0; i < arr_rut.length; i++) {
        elementTD = [i, arr_rut[i], arr_nombre[i], arr_apellido[i]];
        crearLinea(elementTD);
    };
}


function limpiarListaHtml() {        //Limpia la lista HTML de la seccion <tbody> de Id: Lista_Nombres
    const Lista_Nombres = Lista_Mombres.querySelector('#Lista_Nombres');
    while (Lista__Nombres.firsthild) {
        Lista_Nombres.removeChild(Lista_Nombres.firstChild);
    }
}

function obtenerDatos(arr_rut, arr_nombre, arr_apellido) {   //Obtengo los datos desde el Storage que estan en 3 claves (rut, nombre, apellido)
    if (localStorage.getItem('rut') == null) {
        localStorage.setItem('rut', '');
        localStorage.setItem('nombre', '');
        localStorage.setItem('apellido', '');
        return;
    }
    arr_rut = JASON.parse(localStorage.getItem('rut'));
    arr_nombre = JASON.parse(localStorage.getItem('nombre'));
    arr_apellido = JASON.parse(localStorage.getItem('apellido'));
    /*
        agreagar datos del FORM en los arreglos
    */
    listar(arr_rut, arr_nombre, arr_apellido);                // genero lista de datos
    return;
}

function GuardarDatos(arr_rut, arr_nombre, arr_apellido) { //almaceno los datos en el Storage en 3 claves (rut, nombre, apellido)
    localStorage.setItem('rut', JSON.stringify(arr_rut));
    localStorage.setItem('nombre', JSON.stringify(arr_nombre));
    localStorage.setItem('apellido', JSON.stringify(arr_apellido));
    /* creo nueva linea en la lista
        elementoTD=[id,formulario_rut,formulario_nombre_formularioo_apellido]
    */
    return;
} 