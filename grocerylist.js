let id = 0;

// Added: Load grocery items from local storage when the page loads
window.onload = () => {
    const groceryItems = JSON.parse(localStorage.getItem('groceryItems')) || [];
    groceryItems.forEach(item => {
        addItemToTable(item);
        id = Math.max(id, item.id + 1); // Maintain highest id
    });
};

document.getElementById(`Add`).addEventListener(`click`, () => {
    let createDate = new Date();
    let itemName = document.getElementById(`new-grocery-item`).value; // Modified
    let itemBrand = document.getElementById(`item-brand`).value; // Modified
    let itemQuantity = document.getElementById(`item-quantity`).value; // Modified

    let item = {
        id: id,
        name: itemName, // Modified
        brand: itemBrand, // Modified
        quantity: itemQuantity // Modified
    };

    addItemToTable(item); // Modified
    saveItemToLocalStorage(item); // Added
    id++; // Increment id for next item
    document.getElementById(`new-grocery-item`).value = ``;
    document.getElementById(`item-brand`).value = ``;
    document.getElementById(`item-quantity`).value = ``;
});

// Modified: Create a separate function to add an item to the table
function addItemToTable(item) {
    let table = document.getElementById(`list`);
    let row = table.insertRow(table.rows.length);
    row.setAttribute(`id`, `item-${item.id}`);
    row.insertCell(0).innerHTML = item.name; // Modified
    row.insertCell(1).innerHTML = item.brand; // Modified
    row.insertCell(2).innerHTML = item.quantity; // Modified
    let actions = row.insertCell(3);
    actions.appendChild(createDeleteButton(item.id)); // Modified
}

// Added: Function to save the item to local storage
function saveItemToLocalStorage(item) {
    let groceryItems = JSON.parse(localStorage.getItem('groceryItems')) || [];
    groceryItems.push(item);
    localStorage.setItem('groceryItems', JSON.stringify(groceryItems));
}

// Function to create a delete button
function createDeleteButton(id) {
    let btn = document.createElement(`button`);
    btn.className = `btn btn-primary`;
    btn.id = id;
    btn.innerHTML = `Delete`;
    btn.onclick = () => {
        console.log(`Deleting row with id: item-${id}`);
        let elementToDelete = document.getElementById(`item-${id}`);
        elementToDelete.parentNode.removeChild(elementToDelete);
        removeItemFromLocalStorage(id); // Added
    };
    return btn;
}

// Added: Function to remove item from local storage
function removeItemFromLocalStorage(id) {
    let groceryItems = JSON.parse(localStorage.getItem('groceryItems')) || [];
    groceryItems = groceryItems.filter(item => item.id !== id);
    localStorage.setItem('groceryItems', JSON.stringify(groceryItems));
}