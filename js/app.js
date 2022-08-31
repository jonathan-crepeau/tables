// console.log('Fear is the mind killer.');

// NOTE - Multiple jQuery selectors, see list:
$('[type="button"]').on('click', generateTable);

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

// console.log($(event.target).css('background-color'));
// $(event.target).css('opacity', '0')
// $(event.target).next().css('background', 'yellow');
// $(event.target).siblings().css('background', 'yellow');
// $(event.target).prev().css('background', 'yellow');

// NOTE - Equality operator cannot be used to comparing two arrays. Arrays are an object type and objects are compared based on teh references of the variables and not on the values.


function traverseRow(event) {
    let table = document.querySelector('.game-table');

    const parent = $(event.target).parent().prop('class').split("");
    const rowNum = parseInt(parent.splice(-1, 1).join(""));
    console.log(typeof rowNum);

    let row = table.rows[rowNum];

    for (let j = 0, cell; cell = row.cells[j]; j++) {
        console.log(row.cells[j]);
    }

}

function siblingRgb(event, sibType) {
    const targetLast = $(event.target).css('background-color').substring(4, 'background-color'.length -1).split(" ");

    if (sibType === 'prev') {
        const prevRgb = $(event.target).prev().css('background-color').substring(4, 'background-color'.length -1).split(" ");
        if (targetLast[2] === prevRgb[2]) {
            return true;
        } else {
            return false;
        }
    } else if (sibType === 'next') {
        const nextRgb = $(event.target).next().css("background-color").substring(4, 'background-color'.length -1).split(" ");
        if (targetLast[2] === nextRgb[2]) {
            return true;
        } else {
            return false;
        }
    }
}

// NOTE - attach event listener to parent (document in this case):
$(document).on('click', 'td', checkImmediateSiblings);

// function checkAwayStatus(event) {
//     if (checkClass(event)) {
//         console.log('true');
//     } else if (!checkClass(event)) {
//         console.log('false');
//     } else {
//         console.log('error');
//     }
// }

function checkClass(event, sibType) {
    if (sibType === 'next') {
        return $(event.target).next().hasClass("away");
    } else if (sibType === 'prev') {
        return $(event.target).prev().hasClass("away");
    }   
}

function checkImmediateSiblings(event) {
    $(event.target).addClass("away");
    console.log($(event.target));
    if (siblingRgb(event, 'next') && !checkClass(event, 'next')) {
        console.log('Next sibling a match.')
    } else if (!siblingRgb(event, 'next') || checkClass(event, 'next')) {
        console.log('No match for next sibling.')
    }

    if (siblingRgb(event, 'prev') && !checkClass(event, 'prev')) {
        console.log('Previous sibling a match.');
    } else if (!siblingRgb(event, 'prev') || checkClass(event, 'prev')) {
        console.log('No match for previous sibling.');
    }
    
    
}

