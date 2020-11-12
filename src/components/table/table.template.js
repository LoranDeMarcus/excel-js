const CODES = {
    A: 65,
    Z: 90
}
function toCell(value = '') {
    return `
    <div class="cell" contenteditable>${value}</div>
    `
}

function toColumn(col) {
    return `
    <div class="column">
        ${col}
        <div class="col-resize"></div>
    </div>
    `
}

function createRow(counter, content) {
    const resize = counter ? `<div class="row-resize"></div>` : '';
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

export function createTalbe(rowsCount = 20) {
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