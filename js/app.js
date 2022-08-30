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
$(document).on('click', 'td', handleClick);

function generateTable() {
    const table = $('<table class="game-table"></table>');
    const tableBody = $('<tbody></tbody>')
    for (let a = 0; a < 10; a++) {
        const row = $('<tr class="row-' + a +'"></<tr>');
        for (let b = 0; b < 10; b++) {
            const cell = $('<td class="game-square cell-' + b + '"></td>');
            chooseColor(cell);
            // const cellText = document.createTextNode('cell in row ${a}, column ${b}');
            // $(cell).append(cellText);
            $(row).append(cell);
        }
        $(tableBody).append(row);
    }
    $(table).append(tableBody);
    $('.table-container').append(table)
    $(table).css('border')
}

function chooseColor(cell) {
    const num = Math.floor(Math.random() * (3 - 1 + 1)+ 1);
    if (num === 1) {
        $(cell).css('background-color', '#BF1765');
    } else if (num === 2) {
        $(cell).css('background-color', '#EDB428');
    } else {
        $(cell).css('background-color', '#0B2A81');
    }
}

function handleClick(event) {
    // console.log($(event.target).css('background-color'));
    // $(event.target).css('opacity', '0')
    // $(event.target).next().css('background', 'yellow');
    // $(event.target).siblings().css('background', 'yellow');
    // $(event.target).prev().css('background', 'yellow');

    const targetLast = $(event.target).css('background-color').substring(4, 'background-color'.length -1).split(" ");
    const prevSibLast = $(event.target).prev().css('background-color').substring(4, 'background-color'.length -1).split(" ");
    console.log(targetLast);
    console.log(prevSibLast);
    
    // NOTE - Equality operator cannot be used to comparing two arrays. Arrays are an object type and objects are compared based on teh references of the variables and not on the values.
    if (targetLast[2] == prevSibLast[2]) {
        console.log('a match!');
    } else { 
        console.log('not a match')
    }

}
