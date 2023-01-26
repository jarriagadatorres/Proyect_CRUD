function prueba() {
    a_rut = ['Rut 1', 'Rut 2', 'Rut 3'];
    a_nom = ['Nombre 1', 'Nombre 2', 'Nombre 3'];
    a_app = ['Apellido 1', 'Apellido 2', 'Apellido 3'];
    listar(a_rut, a_nom, a_app);
    alert('Pausa');
    a_rut =a_rut.concat(['Rut 4', 'Rut 5', 'Rut 6']);
    a_nom = a_nom.concat(['Nombre 4', 'Nombre 5', 'Nombre 6']);
    a_app = a_app.concat(['Apellido 4', 'Apellido 5', 'Apellido 6']);
    listar(a_rut, a_nom, a_app);
}

function crearLinea(elements, bandera,id) {
    const Lista_Nombres = document.getElementById('Lista_Nombres');
    if (elements && Array.isArray(elements)) {
        tr = document.createElement('tr');
        Lista_Nombres.appendChild(tr);
        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            const newtd = document.createElement('td');
            if (bandera == 1) {
                newtd.classList.add('bc_1');
            } else {
                newtd.classList.add('bc_2')
            }
            newtd.textContent = element;
            Lista_Nombres.appendChild(newtd);

        }
        eliminarbtn = document.createElement('button');
        eliminarbtn.onclick=() => eliminaElemento(id);
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
    bandera = 0
    for (i = 0; i < arr_rut.length; i++) {
        elementTD = [i, arr_rut[i], arr_nombre[i], arr_apellido[i]];
        crearLinea(elementTD, bandera,i);
        bandera = 1 - bandera;
    };
}


function limpiarListaHtml() {        //Limpia la lista HTML de la seccion <tbody> de Id: Lista_Nombres
    const Lista_Nombres = document.getElementById('Lista_Nombres');
    while (Lista_Nombres.firstElementChild) {
        Lista_Nombres.removeChild(Lista_Nombres.firstElementChild);
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
    //listar(arr_rut, arr_nombre, arr_apellido);                // despliega lista de datos en HTML
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

function eliminaElemento(id){
    obtenerDatos(arr_rut, arr_nombre, arr_apellido)
    remove = arr_rut.splice(id, 1);
    remove = arr_nombre.splice(id, 1);
    remove = arr_apellido.splice(id, 1);
    GuardarDatos(arr_rut, arr_nombre, arr_apellido);
    listar(arr_rut, arr_nombre, arr_apellido);
}