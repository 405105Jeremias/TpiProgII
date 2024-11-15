// URL de la API para obtener todas las facturas
const facturasUrl = 'https://localhost:7219/api/Facturas/TodasLasFacturas';
// URL de la API para dar de baja una factura
const bajaFacturaUrl = 'https://localhost:7219/api/Facturas/ordenes/';

// Función para cargar las facturas en la tabla
function cargarFacturas() {
    fetch(facturasUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener las facturas");
            }
            return response.json();
        })
        .then(facturas => {
            const invoicesTable = document.getElementById('invoicesTable');
            invoicesTable.innerHTML = '';  // Limpiar la tabla antes de cargar los datos

            facturas.forEach(factura => {
                const row = document.createElement('tr');
                
                // Verificación de valores para asegurarnos de que el total se muestra correctamente
                const totalFactura = factura.total !== undefined && factura.total !== null ? factura.total : '0.00';

                row.innerHTML = `
                    <td>${factura.idFactura}</td>
                    <td>${factura.idCliente}</td>
                    <td>${factura.fecha}</td>
                    <td>${totalFactura}</td>
                    <td>${factura.estado}</td>
                    <td>
                        <button onclick="darDeBajaFactura(${factura.idFactura})">Dar de Baja</button>
                    </td>
                `;

                invoicesTable.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al cargar las facturas:', error);
            alert("Hubo un problema al cargar las facturas.");
        });
}

// Función para dar de baja una factura
function darDeBajaFactura(idFactura) {
    const motivo = prompt("Ingrese el motivo de la baja:");
    
    if (motivo) {
        fetch(`${bajaFacturaUrl}${idFactura}?motivo=${encodeURIComponent(motivo)}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert("Factura dada de baja correctamente.");
                cargarFacturas();  // Recargar la lista de facturas
            } else {
                alert("No se pudo dar de baja la factura.");
            }
        })
        .catch(error => {
            console.error('Error al dar de baja la factura:', error);
            alert("Ocurrió un error al intentar dar de baja la factura.");
        });
    } else {
        alert("Debe ingresar un motivo para dar de baja la factura.");
    }
}

// Llamar a la función para cargar las facturas al abrir la página
cargarFacturas();
