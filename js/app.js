console.log('Fear is the mind killer.');

// NOTE - Multiple jQuery selectors, see list:
$('[type="button"]').on('click', generateTable);

// function generateTable() {
//     const table = document.createElement("table");
//     const tableBody = document.createElement("tbody");
//     for (let a = 0; a < 2; a++) {
//         const row = document.createElement("tr");
//         for(let b = 0; b < 2; b++) {
//             const cell = document.createElement('td');
//             const cellText = document.createTextNode(`cell in row ${a}, column ${b}`);
//             cell.appendChild(cellText);
//             row.appendChild(cell);
//         }
//         tableBody.appendChild(row);
//     }
//     table.appendChild(tableBody);
//     document.body.appendChild(table);
//     table.setAttribute("border", "1");
// }

// NOTE - attach event listener to parent (document in this case):
$(document).on('click', 'td', () => {console.log('td clicked')});

function generateTable() {
    const table = $('<table class="game-table"></table>');
    const tableBody = $('<tbody></tbody>')
    for (let a = 0; a < 3; a++) {
        const row = $('<tr class="row-' + a +'"></<tr>');
        for (let b = 0; b < 3; b++) {
            const cell = $('<td class="cell-' + b + '"></td>');
            const cellText = document.createTextNode('cell in row ${a}, column ${b}');
            $(cell).append(cellText);
            $(row).append(cell);
        }
        $(tableBody).append(row);
    }
    $(table).append(tableBody);
    $('.table-container').append(table)
    $(table).css('border')
}

// function chooseColor()