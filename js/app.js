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

// NOTE - Equality operator cannot be used to comparing two arrays. Arrays are an object type and objects are compared based on teh references of the variables and not on the values.

// NOTE - attach event listener to parent (document in this case):

$(document).on('click', 'td', assignEvent);

function assignEvent(event) {
    const square = event.target;
    checkImmediateSiblings(square);
}

function checkImmediateSiblings(element) {
    $(element).addClass("away");

    if (colorMatch(element, 'next') && !checkClass(element, 'next')) {
        console.log('Next sibling a match.')
        checkImmediateSiblings($(element).next());
    } else if (!colorMatch(element, 'next') || checkClass(element, 'next')) {
        console.log('No match for next sibling.')
    }

    if (colorMatch(element, 'prev') && !checkClass(element, 'prev')) {
        console.log('Previous sibling a match.');
        checkImmediateSiblings($(element).prev());
    } else if (!colorMatch(element, 'prev') || checkClass(element, 'prev')) {
        console.log('No match for previous sibling.');
    }   
}

function colorMatch(element, sibType) {
    const targetLast = $(element).css('background-color').substring(4, 'background-color'.length -1).split(" ");

    if (sibType === 'prev') {
        const prevRgb = $(element).prev().css('background-color').substring(4, 'background-color'.length -1).split(" ");
        if (targetLast[2] === prevRgb[2]) {
            return true;
        } else {
            return false;
        }
    } else if (sibType === 'next') {
        const nextRgb = $(element).next().css("background-color").substring(4, 'background-color'.length -1).split(" ");
        if (targetLast[2] === nextRgb[2]) {
            return true;
        } else {
            return false;
        }
    }
}

function checkClass(element, sibType) {
    if (sibType === 'next') {
        return $(element).next().hasClass("away");
    } else if (sibType === 'prev') {
        return $(element).prev().hasClass("away");
    }   
}


