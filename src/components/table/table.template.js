const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120;

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px';
}

function widthFrom(state) {
    return function (col, index) {
        return {
            col, index, width: getWidth(state.colState, index)
        }
    }
}

function toCell(row, state) {
    return function (_, col) {
        const width = getWidth(state.colState, col);
        return `
            <div class="cell" 
            contenteditable 
            data-col="${col}"
            data-type="cell"
            data-id="${row}:${col}"
            style="width: ${width}">
            </div>
        `
    }
}

function toColumn({ col, index, width }) {
    return `
    <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
    `
}

function createRow(index, content) {
    const resize = index ? `<div class="row-resize" data-resize="row"></div>` : '';
    return `
    <div class="row" data-type="resizable">
        <div class="row-info">
            ${index ? index : ''}
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

export function createTable(rowsCount = 20, state) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(widthFrom(state))
        .map(toColumn)
        .join('');

    rows.push(createRow('', cols));

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(row, state))
            .join('');

        rows.push(createRow(row + 1, cells));
    }

    return rows.join('');
}