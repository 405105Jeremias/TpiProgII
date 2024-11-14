// Array para almacenar los elementos de la factura
let invoiceItems = [];

// Función para añadir un elemento a la factura
function addToInvoice(description, price) {
    const quantitySelect = event.target.closest('tr').querySelector('.quantitySelect');
    const quantity = parseInt(quantitySelect.value);

    // Verificar si el artículo ya existe en la factura
    const existingItem = invoiceItems.find(item => item.description === description);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        invoiceItems.push({ description, quantity, price });
    }
    updateInvoiceTable();
}

// Función para actualizar la tabla de la factura
function updateInvoiceTable() {
    const invoiceTable = document.getElementById('invoiceTable');
    invoiceTable.innerHTML = ''; // Limpiar tabla

    // Rellenar tabla con los elementos de la factura
    invoiceItems.forEach((item, index) => {
        const row = document.createElement('tr');

        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = item.description;
        row.appendChild(descriptionCell);

        const quantityCell = document.createElement('td');
        quantityCell.textContent = item.quantity;
        row.appendChild(quantityCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = item.price * item.quantity;
        row.appendChild(priceCell);

        const removeButtonCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Quitar';
        removeButton.onclick = () => removeFromInvoice(index);
        removeButtonCell.appendChild(removeButton);
        row.appendChild(removeButtonCell);

        invoiceTable.appendChild(row);
    });
}

// Función para quitar un elemento de la factura
function removeFromInvoice(index) {
    invoiceItems.splice(index, 1);
    updateInvoiceTable();
}

// Función para crear la factura (actualmente solo muestra un mensaje)
function createInvoice() {
    if (invoiceItems.length === 0) {
        alert("No hay elementos en la factura.");
        return;
    }
    alert("Factura creada correctamente.");
    // Aquí se podría añadir la lógica para guardar la factura
    invoiceItems = []; // Vaciar la factura después de crearla
    updateInvoiceTable();
}


// Cambiar el estado de una factura a "Inactivo" con confirmación
function cancelInvoice(invoiceId) {
    // Confirmación antes de dar de baja la factura
    const confirmCancel = confirm("¿Estás seguro de que deseas cancelar esta factura?");
    if (confirmCancel) {
        // Seleccionar el elemento de estado correspondiente a la factura
        const statusElement = document.querySelector(`#invoicesTable tr:nth-child(${invoiceId}) .status`);
        
        // Cambiar el texto y el estilo a "Inactivo"
        statusElement.textContent = "Inactivo";
        statusElement.classList.remove("active");
        statusElement.classList.add("inactive");
    }
}




