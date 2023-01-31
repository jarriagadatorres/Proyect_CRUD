function inicia() {
    if (localStorage.getItem('rut') == null) {
        localStorage.setItem('lastId', 0)
        localStorage.setItem('id', '[]');
        localStorage.setItem('rut', '[]');
        localStorage.setItem('nombre', '[]');
        localStorage.setItem('apellido', '[]');
    } else {
        const Encabezado = document.getElementById('Encabezado');
        tr = document.createElement('tr');
        Encabezado.appendChild(tr);
        th = document.createElement('th');
        th.textContent = 'Id';
        Encabezado.appendChild(th);
        th = document.createElement('th');
        th.textContent = 'RUT';
        Encabezado.appendChild(th);
        th = document.createElement('th');
        th.textContent = 'Nombre';
        Encabezado.appendChild(th);
        th = document.createElement('th');
        th.textContent = 'Apellido';
        Encabezado.appendChild(th);
        th = document.createElement('th');
        Encabezado.appendChild(th);
        th = document.createElement('th');
        Encabezado.appendChild(th);

        lastId = JSON.parse(localStorage.getItem('lastId'));
        arr_id = JSON.parse(localStorage.getItem('id'));
        arr_rut = JSON.parse(localStorage.getItem('rut'));
        arr_nombre = JSON.parse(localStorage.getItem('nombre'));
        arr_apellido = JSON.parse(localStorage.getItem('apellido'));
        listar(arr_id, arr_rut, arr_nombre, arr_apellido);

    }

    return;
}

function crearLinea(elements, idl) {
    const Lista_Nombres = document.getElementById('Lista_Nombres');
    if (elements && Array.isArray(elements)) {
        tr = document.createElement('tr');
        tr.setAttribute("id", idl);
        Lista_Nombres.appendChild(tr);
        const Lista_linea = document.getElementById(idl)
        for (let index = 0; index < elements.length; index++) {

            const element = elements[index];
            const newtd = document.createElement('td');
            newtd.textContent = element;
            Lista_linea.appendChild(newtd);
        }

        btnid1 = 'btn1'.concat(idl);
        newtd = document.createElement('td');
        newtd.setAttribute("id", btnid1);
        Lista_linea.appendChild(newtd);
        btn1 = document.getElementById(btnid1);
        funcEliminar = '() => eliminaElemento('.concat(elements[0]).concat(')')
        eliminarbtn = document.createElement('button');
        eliminarbtn.onclick = () => eliminaElemento();
        eliminarbtn.textContent = 'Eliminar';
        eliminarbtn.classList.add('btn', 'btn-eliminar');
        btn1.appendChild(eliminarbtn);
        newtd = document.createElement('td');
        btnid2 = 'btn2'.concat(idl);
        newtd.setAttribute("id", btnid2);
        Lista_linea.appendChild(newtd);
        btn2 = document.getElementById(btnid2);
        editarbtn = document.createElement('button');
        editarbtn.textContent = 'editar';
        editarbtn.classList.add('btn', 'btn-editar');
        btn2.appendChild(editarbtn);

    }
    return;
}
function listar(arr_id, arr_rut, arr_nombre, arr_apellido) {  //recibo 4 arreglos obtenidos de Storage
    limpiarListaHtml();
    for (i = 0; i < arr_rut.length; i++) {
        elementTD = [arr_id[i], arr_rut[i], arr_nombre[i], arr_apellido[i]];
        crearLinea(elementTD, arr_id[i]);
    };
}


function limpiarListaHtml() {        //Limpia la lista HTML de la seccion <tbody> de Id: Lista_Nombres
    const Lista_Nombres = document.getElementById('Lista_Nombres');
    while (Lista_Nombres.firstElementChild) {
        Lista_Nombres.removeChild(Lista_Nombres.firstElementChild);
    }
}

/*function obtenerDatos(lastId, arr_id, arr_rut, arr_nombre, arr_apellido) {   //Obtengo los datos desde el Storage que estan en 4 claves (ID, rut, nombre, apellido)
    lastId = JSON.parse(localStorage.getItem('lastId'));
    arr_id = JSON.parse(localStorage.getItem('id'));
    arr_rut = JSON.parse(localStorage.getItem('rut'));
    arr_nombre = JSON.parse(localStorage.getItem('nombre'));
    arr_apellido = JSON.parse(localStorage.getItem('apellido'));
    //
        agreagar datos del FORM en los arreglos
    //
    //listar(arr_rut, arr_nombre, arr_apellido);                // despliega lista de datos en HTML
    return;
}*/

function GuardarDatos(lastId, arr_id, arr_rut, arr_nombre, arr_apellido) { //almaceno los datos en el Storage en 3 claves (id, rut, nombre, apellido)
    alert('entro en guardarDatos')
    localStorage.setItem('lastId', JSON.stringify(lastId));
    localStorage.setItem('id', JSON.stringify(arr_id));
    localStorage.setItem('rut', JSON.stringify(arr_rut));
    localStorage.setItem('nombre', JSON.stringify(arr_nombre));
    localStorage.setItem('apellido', JSON.stringify(arr_apellido));
    /* creo nueva linea en la lista
        elementoTD=[id,formulario_rut,formulario_nombre,formularioo_apellido]
    */
    return;
}

function eliminaElemento(i) {
    let arr_id = JSON.parse(localStorage.getItem('id'));
    let arr_rut = JSON.parse(localStorage.getItem('rut'));
    let arr_nombre = JSON.parse(localStorage.getItem('nombre'));
    let arr_apellido = JSON.parse(localStorage.getItem('apellido'));
    let index = arr_id.indexOf(i);
    remove = arr_id.splice(index, 1);
    remove = arr_rut.splice(index, 1);
    remove = arr_nombre.splice(index, 1);
    remove = arr_apellido.splice(index, 1);
    GuardarDatos(lastId, arr_id, arr_rut, arr_nombre, arr_apellido);
    listar(arr_id, arr_rut, arr_nombre, arr_apellido);
}

function editaElemento(i) {
    const formulario = document.getElementById('formulario')
    let index = arr_id.indexOf(i);
    arr_rut[index] = formulario.rut;
    arr_nombre[index] = formulario.nombre;
    arr_apellido[index] = formulario.apellido;
    GuardarDatos(lastId, arr_id, arr_rut, arr_nombre, arr_apellido);
    listar(arr_id, arr_rut, arr_nombre, arr_apellido);
}

function creaElemento() {

    let lastId = JSON.parse(localStorage.getItem('lastId'));
    let arr_rut = JSON.parse(localStorage.getItem('rut'));
    let arr_id = JSON.parse(localStorage.getItem('id'));
    let arr_nombre = JSON.parse(localStorage.getItem('nombre'));
    let arr_apellido = JSON.parse(localStorage.getItem('apellido'));
    i = ++lastId;
    prut = document.getElementById('lrut').value;
    arr_rut.push(prut);
    pnombre = document.getElementById('lnombre').value;
    arr_nombre.push(pnombre);
    papellido = document.getElementById('lapellido').value;
    arr_apellido.push(papellido);
    GuardarDatos(lastId, arr_id, arr_rut, arr_nombre, arr_apellido);
    listar(arr_id, arr_rut, arr_nombre, arr_apellido);
}

function cancelaIngreso() {
    const formulario = document.getElementById('formulario');
    formulario.rut = '';
    formulario.nombre = '';
    formulario.apellido = '';

}
