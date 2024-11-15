// Función para obtener los datos de los clientes desde la API
function obtenerClientes() {
    fetch('https://localhost:7219/api/Clientes/Clientes')  // URL de la API de los clientes
        .then(response => response.json())  // Convertir la respuesta a formato JSON
        .then(data => {
            // Llamamos a la función para llenar la tabla con los datos
            llenarTablaClientes(data);
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

// Función para llenar la tabla con los datos de los clientes
function llenarTablaClientes(clientes) {
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = '';  // Limpiar la tabla antes de llenarla

    // Iterar sobre los clientes y agregar una fila para cada uno
    clientes.forEach(cliente => {
        const tr = document.createElement('tr'); // Crear una nueva fila

        // Crear las celdas de la fila con los datos del cliente
        tr.innerHTML = `
           
            <td>${cliente.nombre}</td>
            <td>${cliente.apellido}</td>
            <td>${cliente.numero}</td>
            <td>${cliente.mail}</td>
        `;

        // Agregar la fila a la tabla
        tbody.appendChild(tr);
    });
}

// Abrir el modal
function openCreateClientForm() {
    document.getElementById("createClientForm").style.display = "flex";
}

// Cerrar el modal
function closeCreateClientForm() {
    document.getElementById("createClientForm").style.display = "none";
}

// Función para registrar un cliente
function registrarCliente(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

    // Obtener los valores del formulario
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const numero = document.getElementById("numero").value;
    const mail = document.getElementById("mail").value;

    // Crear el objeto con los datos del cliente
    const clienteData = {
        nombre: nombre,
        apellido: apellido,
        numero: numero,
        mail: mail
    };

    // Realizar la solicitud POST a la API para agregar el cliente
    fetch('https://localhost:7219/api/Clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clienteData)
    })
    .then(response => {
        if (response.ok) {
            alert("Cliente registrado con éxito");
            closeCreateClientForm(); // Cerrar el modal
            document.getElementById("newClientForm").reset(); // Limpiar el formulario
            obtenerClientes(); // Refrescar la lista de clientes
        } else {
            alert("Error al registrar el cliente");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error al registrar el cliente");
    });
}
// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', obtenerClientes);


