let items = [];

function addItem() {
    const item = document.getElementById('item').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const value = parseFloat(document.getElementById('value').value);

    if (item && !isNaN(quantity) && !isNaN(value)) {
        const totalValue = quantity * value;
        items.push({ item, quantity, value, totalValue });
        updateList();
        updateBalance();
        clearInputs();
    } else {
        alert('Preencha todos os campos corretamente.');
    }
}

function updateList() {
    const itemsTableBody = document.querySelector('#items-table tbody');
    itemsTableBody.innerHTML = '';

    items.forEach((item, index) => {
        const itemRow = document.createElement('tr');
        itemRow.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.item}</td>
            <td>${item.quantity}</td>
            <td>${item.value.toFixed(2)}</td>
            <td>${item.totalValue.toFixed(2)}</td>
            <td class="actions">
                <button class="orange" onclick="openEditModal(${index})">Editar</button>
                <button class="red" onclick="deleteItem(${index})">Excluir</button>
            </td>
        `;

        itemsTableBody.appendChild(itemRow);
    });

    toggleEmptyMessage();
}

function updateBalance() {
    const totalElement = document.getElementById('total');
    const percentageElement = document.getElementById('percentage');
    const statusElement = document.getElementById('status');

    const total = items.reduce((acc, item) => acc + item.totalValue, 0);
    const budget = parseFloat(document.getElementById('budget').value) || 0;
    const percentage = (total / budget) * 100;

    totalElement.textContent = 'R$ ' + total.toFixed(2);
    percentageElement.textContent = percentage.toFixed(2) + '%';

    if (total > budget) {
        alert("Passou");
        statusElement.textContent = 'Negativo';
        statusElement.className = 'red';
    } else {
        statusElement.textContent = 'Positivo';
        statusElement.className = 'green';
    }
}

function clearInputs() {
    document.getElementById('item').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('value').value = '';
}

function toggleEmptyMessage() {
    const emptyMessage = document.getElementById('empty-message');
    const itemsTable = document.getElementById('items-table');

    if (items.length === 0) {
        emptyMessage.style.display = 'block';
        itemsTable.style.display = 'none';
    } else {
        emptyMessage.style.display = 'none';
        itemsTable.style.display = 'table';
    }
}


function openEditModal(index) {
    const modal = document.getElementById('modal');
    const editItemInput = document.getElementById('editItem');
    const editQuantityInput = document.getElementById('editQuantity');
    const editValueInput = document.getElementById('editValue');

    editItemInput.value = items[index].item;
    editQuantityInput.value = items[index].quantity;
    editValueInput.value = items[index].value;

    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

function saveEdit() {
    const editItemInput = document.getElementById('editItem');
    const editQuantityInput = document.getElementById('editQuantity');
    const editValueInput = document.getElementById('editValue');

    const editedItem = {
        item: editItemInput.value,
        quantity: parseInt(editQuantityInput.value),
        value: parseFloat(editValueInput.value),
        totalValue: parseInt(editQuantityInput.value) * parseFloat(editValueInput.value)
    };

    items.splice(editIndex, 1, editedItem);
    updateList();
    updateBalance();
    closeModal();
}

let editIndex;

function openEditModal(index) {
    editIndex = index;
    const modal = document.getElementById('modal');
    const editItemInput = document.getElementById('editItem');
    const editQuantityInput = document.getElementById('editQuantity');
    const editValueInput = document.getElementById('editValue');

    editItemInput.value = items[index].item;
    editQuantityInput.value = items[index].quantity;
    editValueInput.value = items[index].value;

    modal.style.display = 'block';
}

function deleteItem(index) {
    items.splice(index, 1);
    updateList();
    updateBalance();
    closeModal();
}
