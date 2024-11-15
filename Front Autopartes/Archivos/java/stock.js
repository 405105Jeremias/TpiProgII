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

const urlAutopartes = 'https://localhost:7219/api/Autopartes/TodasLasAutopartes';
const urlUpdateAutoparte = 'https://localhost:7219/api/Autopartes';

// Función para cargar las autopartes en la tabla
async function cargarAutopartes() {
    try {
        const response = await fetch(urlAutopartes);
        const autopartes = await response.json();
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
    } catch (error) {
        console.error('Error al cargar las autopartes:', error);
    }
}

// Función para dar de baja una autoparte
async function darDeBajaAutoparte(idAutoparte) {
    const motivo = prompt("Ingrese el motivo de la baja:");
    if (motivo) {
        try {
            const response = await fetch(`${urlUpdateAutoparte}/${idAutoparte}?motivo=${encodeURIComponent(motivo)}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert("Autoparte dada de baja correctamente.");
                cargarAutopartes();
            } else {
                alert("No se pudo dar de baja la autoparte.");
            }
        } catch (error) {
            console.error('Error al dar de baja la autoparte:', error);
            alert("Ocurrió un error al intentar dar de baja la autoparte.");
        }
    } else {
        alert("Debe ingresar un motivo para dar de baja la autoparte.");
    }
}

// Función para abrir el formulario de edición y cargar los datos de la autoparte
async function openEditForm(idAutoparte) {
    try {
        const response = await fetch(`${urlUpdateAutoparte}/${idAutoparte}`);
        const autoparte = await response.json();

        document.getElementById("editMotivoBaja").value = autoparte.motivoBaja || '';
        document.getElementById("editFechaBaja").value = autoparte.fechaBaja || '';
        document.getElementById("editEstado").value = autoparte.estado || '';
        document.getElementById("editStock").value = autoparte.stock || '';
        document.getElementById("editPrecio").value = autoparte.precio || '';
        document.getElementById("editDescripcion").value = autoparte.descripcion || '';
        document.getElementById("editCategoria").value = autoparte.idCategoria || '';

        document.getElementById("editForm").dataset.autoparteId = autoparte.idAutoparte;
        document.getElementById("editFormModal").style.display = "block";
    } catch (error) {
        console.error('Error al cargar la autoparte:', error);
        alert("Ocurrió un error al intentar cargar la autoparte.");
    }
}

// Función para cerrar el formulario de edición
function closeEditForm() {
    document.getElementById("editFormModal").style.display = "none";
}

// Función para confirmar la edición y guardar los cambios
async function confirmEdit() {
    const idAutoparte = document.getElementById("editForm").dataset.autoparteId;
    const autoparteData = {
        motivoBaja: document.getElementById("editMotivoBaja").value,
        fechaBaja: document.getElementById("editFechaBaja").value,
        estado: document.getElementById("editEstado").value,
        stock: document.getElementById("editStock").value,
        precio: document.getElementById("editPrecio").value,
        descripcion: document.getElementById("editDescripcion").value,
        idCategoria: document.getElementById("editCategoria").value
    };

    if (confirm("¿Estás seguro de que quieres actualizar esta autoparte?")) {
        try {
            const response = await fetch(`${urlUpdateAutoparte}/${idAutoparte}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(autoparteData)
            });

            if (response.ok) {
                alert("Autoparte actualizada con éxito");
                closeEditForm();
                cargarAutopartes();
            } else {
                alert("No se pudo actualizar la autoparte.");
            }
        } catch (error) {
            console.error('Error al editar la autoparte:', error);
            alert("Ocurrió un error al intentar actualizar la autoparte.");
        }
    }
}

// Inicializar la carga de autopartes cuando se carga la página
window.onload = cargarAutopartes;
