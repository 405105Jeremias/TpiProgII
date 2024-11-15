// // URL para obtener el stock de autopartes
// const stockUrl = 'https://localhost:7219/api/Autopartes/TodasLasAutopartes';
// // URL para dar de baja una autoparte
// const bajaAutoparteUrl = 'https://localhost:7219/api/Autopartes/';

// // Función para cargar el stock de autopartes en la tabla
// function cargarStock() {
//     fetch(stockUrl)
//         .then(response => response.json())
//         .then(autopartes => {
//             const stockTable = document.getElementById('stockTable');
//             stockTable.innerHTML = ''; // Limpiar la tabla antes de cargar los datos

//             autopartes.forEach(autoparte => {
//                 const row = document.createElement('tr');
                
//                 row.innerHTML = `
//                     <td>${autoparte.idAutoparte}</td>
//                     <td>${autoparte.motivoBaja || ''}</td>
//                     <td>${autoparte.fechaBaja || ''}</td>
//                     <td>${autoparte.estado}</td>
//                     <td>${autoparte.stock}</td>
//                     <td>${autoparte.precio}</td>
//                     <td>${autoparte.descripcion}</td>
                    
//                     <td>
//                         <button onclick="openEditForm(${autoparte.id})">Editar</button>
//                         <button onclick="darDeBajaAutoparte(${autoparte.id})">Dar de Baja</button>
//                     </td>
//                 `;

//                 stockTable.appendChild(row);
//             });
//         })
//         .catch(error => {
//             console.error('Error al cargar el stock:', error);
//         });
// }

// // Función para abrir el formulario de edición de autoparte
// function openEditForm(id) {
//     // Asignar valores al formulario
//     document.getElementById("editMotivoBaja").value = ''; // Motivo de Baja (vacío por defecto)
//     document.getElementById("editFechaBaja").value = ''; // Fecha de Baja (vacío por defecto)
//     document.getElementById("editEstado").value = '';
//     document.getElementById("editStock").value = '';
//     document.getElementById("editPrecio").value = '';
//     document.getElementById("editDescripcion").value = '';   
//     // Abrir el modal
//     document.getElementById("editFormModal").style.display = "block";
// }

// // Función para cerrar el formulario de edición de autoparte
// function closeEditForm() {
//     document.getElementById("editFormModal").style.display = "none";
// }

// // Función para confirmar la edición de autoparte
// function confirmEdit() {
//     if (confirm("¿Está seguro de que desea guardar los cambios?")) {
//         closeEditForm();
//         alert("Cambios guardados exitosamente.");
//         // Aquí se puede añadir la lógica para guardar los cambios en la base de datos
//     }
// }

// // Función para dar de baja una autoparte
// function darDeBajaAutoparte(idAutoparte) {
//     const motivo = prompt("Ingrese el motivo de la baja:");
    
//     if (motivo) {
//         fetch(`${bajaAutoparteUrl}${idAutoparte}?motivo=${encodeURIComponent(motivo)}`, {
//             method: 'DELETE'
//         })
//         .then(response => {
//             if (response.ok) {
//                 alert("Autoparte dada de baja correctamente.");
//                 cargarStock();  // Recargar la lista de autopartes
//             } else {
//                 alert("No se pudo dar de baja la autoparte.");
//                 cargarStock();
//             }
//         })
//         .catch(error => {
//             console.error('Error al dar de baja la autoparte:', error);
//             alert("Ocurrió un error al intentar dar de baja la autoparte.");
//         });
//     } else {
//         alert("Debe ingresar un motivo para dar de baja la autoparte.");
//     }
// }

document.addEventListener('DOMContentLoaded', () => {
    cargarStock();
});

const stockData = [
    { id: 1, motivoBaja: "", fechaBaja: "", estado: "Disponible", stock: 15, precio: 1000, descripcion: "Filtro de aceite" },
    { id: 2, motivoBaja: "Obsoleto", fechaBaja: "2023-10-15", estado: "No Disponible", stock: 0, precio: 500, descripcion: "Bujía" },
    { id: 3, motivoBaja: "", fechaBaja: "", estado: "Disponible", stock: 8, precio: 1500, descripcion: "Filtro de aire" },
    // Agrega más datos de stock aquí según sea necesario
];

function cargarStock() {
    const tableBody = document.getElementById('stockTable');
    tableBody.innerHTML = ""; // Limpiar la tabla antes de cargar datos

    stockData.forEach(item => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.motivoBaja || "-"}</td>
            <td>${item.fechaBaja || "-"}</td>
            <td>${item.estado}</td>
            <td>${item.stock}</td>
            <td>${item.precio}</td>
            <td>${item.descripcion}</td>
            <td>
                <button onclick="darDeBaja(${item.id})">Dar de Baja</button>
                <button onclick="darDeAlta(${item.id})">Dar de Alta</button>
                <button onclick="mostrarEditForm(${item.id})">Editar</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function darDeBaja(id) {
    const motivo = prompt("Ingrese el motivo de la baja:");
    const fecha = new Date().toISOString().split('T')[0];
    
    const item = stockData.find(item => item.id === id);
    if (item && motivo) {
        item.motivoBaja = motivo;
        item.fechaBaja = fecha;
        item.estado = "No Disponible";
        item.stock = 0;
        cargarStock();
    }
}

function darDeAlta(id) {
    const item = stockData.find(item => item.id === id);
    if (item) {
        item.motivoBaja = "";
        item.fechaBaja = "";
        item.estado = "Disponible";
        item.stock = 10; // Asigna un stock por defecto al dar de alta
        cargarStock();
    }
}

function mostrarEditForm(id) {
    const item = stockData.find(item => item.id === id);
    if (item) {
        document.getElementById('editMotivoBaja').value = item.motivoBaja;
        document.getElementById('editFechaBaja').value = item.fechaBaja;
        document.getElementById('editEstado').value = item.estado;
        document.getElementById('editStock').value = item.stock;
        document.getElementById('editPrecio').value = item.precio;
        document.getElementById('editDescripcion').value = item.descripcion;
        document.getElementById('editCategoria').value = item.categoria || "1";

        document.getElementById('editFormModal').style.display = 'block';
        document.getElementById('editForm').dataset.id = id;
    }
}

function closeEditForm() {
    document.getElementById('editFormModal').style.display = 'none';
}

function confirmEdit() {
    const id = parseInt(document.getElementById('editForm').dataset.id);
    const item = stockData.find(item => item.id === id);

    if (item) {
        item.motivoBaja = document.getElementById('editMotivoBaja').value;
        item.fechaBaja = document.getElementById('editFechaBaja').value;
        item.estado = document.getElementById('editEstado').value;
        item.stock = parseInt(document.getElementById('editStock').value);
        item.precio = parseFloat(document.getElementById('editPrecio').value);
        item.descripcion = document.getElementById('editDescripcion').value;
        item.categoria = document.getElementById('editCategoria').value;

        closeEditForm();
        cargarStock();
    }
}
