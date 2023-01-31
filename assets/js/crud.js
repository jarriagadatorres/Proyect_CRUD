function inicia() {
    if (localStorage.getItem('rut') == null) {
        localStorage.setItem('lastId', 0)
        localStorage.setItem('id', '[]');
        localStorage.setItem('rut', '[]');
        localStorage.setItem('nombre', '[]');
        localStorage.setItem('apellido', '[]');
    } else {
        const Encabezado = document.getElementById('Encabezado');
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
        listar();

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
        document.getElementById(idl).innerHTML +=
            `<td>
            <button class="btn btn-eliminar" onclick="eliminaElemento('${idl}')">eliminar</button>
            </td>
            <td>
            <button class="btn btn-editar" onclick="editaElemento('${idl}')">editar</button>
            </td>`
    }
    return;
}
function listar() {  //recibo 4 arreglos obtenidos de Storage
    lastId = JSON.parse(localStorage.getItem('lastId'));
    arr_id = JSON.parse(localStorage.getItem('id'));
    arr_rut = JSON.parse(localStorage.getItem('rut'));
    arr_nombre = JSON.parse(localStorage.getItem('nombre'));
    arr_apellido = JSON.parse(localStorage.getItem('apellido'))
    limpiarListaHtml();
    for (i = 0; i < arr_rut.length; i++) {
        elementTD = [arr_id[i], arr_rut[i], arr_nombre[i], arr_apellido[i]];
        crearLinea(elementTD, arr_id[i]);
    };
    document.getElementById('formulario').innerHTML = ` 
    <input type="number" id="lid" value=0 hidden >
    <label for="rut">RUT : <input type="text" id="lrut" name="lrut" value=""
        required minlength="8" maxlength="8" size="10"></label>
    <label for="nombre">Nombre : <input type="text" id="lnombre" name="lnombre" value=""
        required size="20"></label>
    <label for="apellido">Apellido : <input type="text" id="lapellido"  name="lapellido" value=""
        required size="20"></label>
    <button class="btn btn-guardar" onclick="actualizaElemento()">Guardar</button>
    <button class="btn btn-eliminar" onclick="listar()">Cancelar</button>`
}


function limpiarListaHtml() {               //Limpia la lista HTML de la seccion <tbody> de Id: Lista_Nombres
    const Lista_Nombres = document.getElementById('Lista_Nombres');
    while (Lista_Nombres.firstElementChild) {
        Lista_Nombres.removeChild(Lista_Nombres.firstElementChild);
    }
}

function actualizaElemento(i) {             //actualiso los datos en el Storage con 4 claves (id, rut, nombre, apellido)
    let arr_id = JSON.parse(localStorage.getItem('id'));
    let arr_rut = JSON.parse(localStorage.getItem('rut'));
    let arr_nombre = JSON.parse(localStorage.getItem('nombre'));
    let arr_apellido = JSON.parse(localStorage.getItem('apellido'));

    prut = document.getElementById('lrut').value;
    papellido = document.getElementById('lapellido').value;
    pnombre = document.getElementById('lnombre').value;

    let index = arr_id.indexOf(parseInt(i));

    arr_rut[index] = prut;
    arr_nombre[index] = pnombre;
    arr_apellido[index] = papellido;

    localStorage.setItem('lastId', JSON.stringify(lastId));
    localStorage.setItem('id', JSON.stringify(arr_id));
    localStorage.setItem('rut', JSON.stringify(arr_rut));
    localStorage.setItem('nombre', JSON.stringify(arr_nombre));
    localStorage.setItem('apellido', JSON.stringify(arr_apellido));
    return;
}

function GuardarDatos(lastId, arr_id, arr_rut, arr_nombre, arr_apellido) { //almaceno los datos en el Storage con 5 claves (lastId, id, rut, nombre, apellido)
    localStorage.setItem('lastId', JSON.stringify(lastId));
    localStorage.setItem('id', JSON.stringify(arr_id));
    localStorage.setItem('rut', JSON.stringify(arr_rut));
    localStorage.setItem('nombre', JSON.stringify(arr_nombre));
    localStorage.setItem('apellido', JSON.stringify(arr_apellido));
    return;
}

function eliminaElemento(i) {
    let lastId = JSON.parse(localStorage.getItem('lastId'));
    let arr_id = JSON.parse(localStorage.getItem('id'));
    let arr_rut = JSON.parse(localStorage.getItem('rut'));
    let arr_nombre = JSON.parse(localStorage.getItem('nombre'));
    let arr_apellido = JSON.parse(localStorage.getItem('apellido'));
    let index = arr_id.indexOf(parseInt(i));
    remove = arr_id.splice(index, 1);
    remove = arr_rut.splice(index, 1);
    remove = arr_nombre.splice(index, 1);
    remove = arr_apellido.splice(index, 1);
    GuardarDatos(lastId, arr_id, arr_rut, arr_nombre, arr_apellido);
    listar();
}

function editaElemento(i) {
    let arr_id = JSON.parse(localStorage.getItem('id'));
    let arr_rut = JSON.parse(localStorage.getItem('rut'));
    let arr_nombre = JSON.parse(localStorage.getItem('nombre'));
    let arr_apellido = JSON.parse(localStorage.getItem('apellido'));
    let index = arr_id.indexOf(parseInt(i));
    document.getElementById('formulario').innerHTML = `
        <input type="number" id="lid" value=${arr_id[index]} hidden >
        <label for="rut">RUT : <input type="text" id="lrut" name="lrut" value="${arr_rut[index]}"
            required minlength="8" maxlength="8" size="10"></label>
        <label for="nombre">Nombre : <input type="text" id="lnombre" name="lnombre" value="${arr_nombre[index]}"
            required size="20"></label>
        <label for="apellido">Apellido : <input type="text" id="lapellido"  name="lapellido" value="${arr_apellido[index]}"
            required size="20"></label>
        <button class="btn btn-guardar" onclick="actualizaElemento(${arr_id[index]})">Actualiza</button>
        <button class="btn btn-eliminar" onclick="listar()">Cancelar</button>`
}

function creaElemento() {

    let lastId = JSON.parse(localStorage.getItem('lastId'));
    let arr_id = JSON.parse(localStorage.getItem('id'));
    let arr_rut = JSON.parse(localStorage.getItem('rut'));
    let arr_nombre = JSON.parse(localStorage.getItem('nombre'));
    let arr_apellido = JSON.parse(localStorage.getItem('apellido'));
    i = ++lastId;

    prut = document.getElementById('lrut').value;
    papellido = document.getElementById('lapellido').value;
    pnombre = document.getElementById('lnombre').value;

    arr_rut.push(prut);
    arr_nombre.push(pnombre);
    arr_apellido.push(papellido);
    arr_id.push(i);
    GuardarDatos(lastId, arr_id, arr_rut, arr_nombre, arr_apellido);
    listar();
}


