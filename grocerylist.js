let id =0;


document.getElementById(`Add`).addEventListener(`click`, () => {
    let createDate = new Date();
    let table = document.getElementById(`list`);
    let row = table.insertRow(table.rows.length);
    row.setAttribute(`id`, `item-${id}`);
    row.insertCell(0).innerHTML = document.getElementById(`new-grocery-item`).value;
    row.insertCell(1).innerHTML = document.getElementById(`item-brand`).value;
    row.insertCell(2).innerHTML = document.getElementById(`item-quantity`).value;    
    let actions = row.insertCell(3);
    actions.appendChild(createDeleteButton(id++));
    document.getElementById(`new-task`).value = ``;
})

function createDeleteButton(id) {
    let btn = document.createElement(`button`);
    btn.className = `btn btn-primary`;
    btn.id = id;
    btn.innerHTML = `Delete`;
    btn.onclick = () => {
        console.log(`Deleting row with id: item-${id}`);
        let elementToDelete = document.getElementById(`item-${id}`);
        elementToDelete.parentNode.removeChild(elementToDelete);
    }
    return btn;
}