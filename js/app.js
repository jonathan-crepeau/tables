// NOTE - Multiple jQuery selectors, see list:
$('[type="button"]').on('click', generateTable);

// NOTE - attach event listener to parent (document in this case):
$(document).on('click', 'td', assignEvent);

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
        console.log('No match for next sibling.');
    }

    if (colorMatch(element, 'prev') && !checkClass(element, 'prev')) {
        console.log('Previous sibling a match.');
        checkImmediateSiblings($(element).prev());
    } else if (!colorMatch(element, 'prev') || checkClass(element, 'prev')) {
        console.log('No match for previous sibling.');
    }

    if (colorMatch(element, 'top') && !checkClass(element, 'top')) {
        console.log('top is a match.');
        checkImmediateSiblings(adjacentSibRgb(element, 'top'));
    } else {
        console.log('No match for top.')
    }

    if (colorMatch(element, 'bottom') && !checkClass(element, 'bottom')) {
        console.log('bottom is a match.');
        checkImmediateSiblings(adjacentSibRgb(element, 'bottom'));
    } else {
        console.log('No match for bottom.');
    }
    return;
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
    } else if (sibType === 'top') {
        const topElem = adjacentSibRgb(element, 'top');
        const topRgb = $(topElem).css('background-color').substring(4, 'background-color'.length - 1).split(" ");
        if (targetLast[2] === topRgb[2]) {
            return true;
        } else {
            return false;
        }
    } else if (sibType === 'bottom') {
        const bottomElem = adjacentSibRgb(element, 'bottom');
        const bottomRgb = $(bottomElem).css('background-color').substring(4, 'background-color'.length - 1).split(" ");
        if (targetLast[2] === bottomRgb[2]) {
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
    } else if (sibType === 'top') {
        const topElem = adjacentSibRgb(element, 'top');
        return $(topElem).hasClass("away");
    } else if (sibType === 'bottom') {
        const bottomElem = adjacentSibRgb(element, 'bottom');
        return $(bottomElem).hasClass("away");
    }
}

function adjacentSibRgb(element, sibType) {
    const table = document.querySelector('.game-table');

    const parentRow = parseInt($(element).parent().prop("class").split("").splice(-1, 1).join(""));
    const cellNum = $(element).attr("class").split("").splice(-6, 1).join("");
    
    if (sibType === 'top') {
        return table.rows[parentRow - 1].cells[cellNum];
    } else if (sibType === 'bottom') {
        return table.rows[parentRow + 1].cells[cellNum];
    }

}
