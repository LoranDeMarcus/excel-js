const CODES = {
    A: 65,
    Z: 90
}
function toCell(value = '', counter) {
    return `
    <div class="cell" contenteditable data-num="${counter}">${value}</div>
    `
}

function toColumn(col, counter) {
    return `
    <div class="column" data-type="resizable" data-num="${counter}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
    `
}

function createRow(counter, content) {
    const resize = counter ? `<div class="row-resize" data-resize="row"></div>` : '';
    return `
    <div class="row">
        <div class="row-info">
            ${counter ? counter : ''}
            ${resize}
        </div>
        <div class="row-data">
            ${content}
        </div>
    </div>
    `
}

function toChar(_, i) {
    return String.fromCharCode(CODES.A + i);
}

export function createTable(rowsCount = 20) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('');

    rows.push(createRow('', cols));

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell)
            .join('');

        rows.push(createRow(i + 1, cells));
    }

    return rows.join('');
}