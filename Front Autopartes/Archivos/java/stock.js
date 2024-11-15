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

// // Llamar a la función para cargar el stock al abrir la página
// cargarStock();
// URL de la API para obtener todas las autopartes
const autopartesUrl = 'https://localhost:7219/api/Autopartes/TodasLasAutopartes';
// URL de la API para dar de baja una autoparte
const bajaAutoparteUrl = 'https://localhost:7219/api/Autopartes/';


// Función para cargar las autopartes en la tabla
function cargarAutopartes() {
    fetch(autopartesUrl)
        .then(response => response.json())
        .then(autopartes => {
            const stockTable = document.getElementById('stockTable');
            stockTable.innerHTML = '';  // Limpiar la tabla antes de cargar los datos

            autopartes.forEach(autoparte => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${autoparte.idAutoparte}</td>
                    <td>${autoparte.motivoBaja || 'N/A'}</td>
                    <td>${autoparte.fechaBaja || 'N/A'}</td>
                    <td>${autoparte.estado}</td>
                    <td>${autoparte.stock}</td>
                    <td>${autoparte.precio}</td>
                    <td>${autoparte.descripcion}</td>
                    <td>
                        <button onclick="darDeBajaAutoparte(${autoparte.idAutoparte})">Dar de Baja</button>
                        <button onclick="openEditForm(${autoparte.idAutoparte})">Editar</button>
                    </td>
                `;

                stockTable.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al cargar las autopartes:', error);
        });
}

// Función para dar de baja una autoparte
function darDeBajaAutoparte(idAutoparte) {
    const motivo = prompt("Ingrese el motivo de la baja:");
    
    if (motivo) {
        fetch(`${bajaAutoparteUrl}${idAutoparte}?motivo=${encodeURIComponent(motivo)}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert("Autoparte dada de baja correctamente.");
                cargarAutopartes();  // Recargar la lista de autopartes
            } else {
                alert("No se pudo dar de baja la autoparte.");
            }
        })
        .catch(error => {
            console.error('Error al dar de baja la autoparte:', error);
            alert("Ocurrió un error al intentar dar de baja la autoparte.");
        });
    } else {
        alert("Debe ingresar un motivo para dar de baja la autoparte.");
    }
}

function openEditForm(id) {
    // Aquí recuperas la autoparte, ya sea de una lista local o llamando a un endpoint para obtenerla
    fetch(`https://localhost:7219/api/Autopartes/${idAutoparte}`)
        .then(response => response.json())
        .then(autoparte => {
            // Asigna los valores al formulario del modal
            document.getElementById("editMotivoBaja").value = autoparte.motivoBaja || '';
            document.getElementById("editFechaBaja").value = autoparte.fechaBaja || '';
            document.getElementById("editEstado").value = autoparte.estado || '';
            document.getElementById("editStock").value = autoparte.stock || '';
            document.getElementById("editPrecio").value = autoparte.precio || '';
            document.getElementById("editDescripcion").value = autoparte.descripcion || '';
            document.getElementById("editCategoria").value = autoparte.idCategoria || '';

            // Almacena el ID de la autoparte en el formulario para usarlo luego en la actualización
            document.getElementById("editForm").dataset.autoparteId = autoparte.idAutoparte;

            // Abre el modal
            document.getElementById("editFormModal").style.display = "block";
        })
        .catch(error => {
            console.error('Error al cargar la autoparte:', error);
            alert("Ocurrió un error al intentar cargar la autoparte.");
        });
}


// Función para cerrar el formulario de edición
function closeEditForm() {
    document.getElementById("editFormModal").style.display = "none";
}

// Función para cerrar el formulario de edición
function closeEditForm() {
    document.getElementById("editFormModal").style.display = "none";
}
function confirmEdit() {
    const idAutoparte = document.getElementById("editForm").dataset.autoparteId;
    const motivoBaja = document.getElementById("editMotivoBaja").value;
    const fechaBaja = document.getElementById("editFechaBaja").value;
    const estado = document.getElementById("editEstado").value;
    const stock = document.getElementById("editStock").value;
    const precio = document.getElementById("editPrecio").value;
    const descripcion = document.getElementById("editDescripcion").value;
    const idCategoria = document.getElementById("editCategoria").value;

    const autoparteData = {
        motivoBaja: motivoBaja,
        fechaBaja: fechaBaja,
        estado: estado,
        stock: parseInt(stock),
        precio: parseFloat(precio),
        descripcion: descripcion,
        idCategoria: parseInt(idCategoria)
    };

    // Realizar la solicitud PUT al backend
    fetch(`https://localhost:7219/api/Autopartes/${idAutoparte}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(autoparteData)
    })
    .then(response => {
        if (response.ok) {
            alert("Autoparte actualizada correctamente.");
            closeEditForm();  // Cerrar el modal
            cargarStock();  // Recargar la lista de autopartes
        } else {
            alert("No se pudo actualizar la autoparte.");
        }
    })
    .catch(error => {
        console.error('Error al actualizar la autoparte:', error);
        alert("Ocurrió un error al intentar actualizar la autoparte.");
    });
}


// Función para guardar los cambios de la autoparte editada
function confirmEdit() {
    const idAutoparte = document.getElementById("editForm").dataset.idAutoparte;
    const motivoBaja = document.getElementById("editMotivoBaja").value;
    const fechaBaja = document.getElementById("editFechaBaja").value;
    const estado = document.getElementById("editEstado").value;
    const stock = document.getElementById("editStock").value;
    const precio = document.getElementById("editPrecio").value;
    const descripcion = document.getElementById("editDescripcion").value;
    const categoria = document.getElementById("editCategoria").value;

    const updatedAutoparte = {
        idAutoparte,
        motivoBaja,
        fechaBaja,
        estado,
        stock,
        precio,
        descripcion,
        categoria
    };

    fetch(`https://localhost:7219/api/Autopartes/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedAutoparte)
    })
    .then(response => {
        if (response.ok) {
            alert("Autoparte actualizada correctamente.");
            cargarAutopartes();  // Recargar la lista de autopartes
            closeEditForm();     // Cerrar el formulario de edición
        } else {
            alert("No se pudo actualizar la autoparte.");
        }
    })
    .catch(error => {
        console.error('Error al actualizar la autoparte:', error);
        alert("Ocurrió un error al intentar actualizar la autoparte.");
    });
}
// Llamar a la función para cargar las autopartes al abrir la página
cargarAutopartes();
