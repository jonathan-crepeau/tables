$(document).on('click', '#start-btn', generateTable)

function generateTable() {
    const table = $('<table class="game-table"></table>');
    const tableBody = $('<tbody></tbody>');
    for (let a = 0; a < 10; a++) {
        const row = $(`<tr class="row-${a}"></tr>`);
        for (let b = 0; b < 10; b++) {
            const cell = $(`<td class="game-square cell-${b}"></td>`);
            chooseColor(cell);
            $(row).append(cell);
        }
        $(tableBody).append(row);
    }
    $(table).append(tableBody);
    $('.table-container').append(table);
}

function chooseColor(square) {
    const num = Math.floor(Math.random() * (3 - 1 + 1)+ 1);
    if (num === 1) {
        $(square).css('background-color', '#BF1765');
    } else if (num === 2) {
        $(square).css('background-color', '#EDB428');
    } else {
        $(square).css('background-color', '#0B2A81');
    }
}