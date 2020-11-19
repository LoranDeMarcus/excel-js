import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
        });
        this._minColWidth = 30;
        this._minRowHeight = 24;
    }

    toHTML() {
        return createTable();
    }

    onClick() {

    }

    onMousedown(e) {
        if (e.target.dataset.resize) {
            const col = e.target.parentNode;
            const currentWidth = col.offsetWidth;
            const mousePositionX = this.onMousemove.mouseX;
            const calcWidth = currentWidth + mousePositionX;
            const newWidth = (calcWidth < this._minColWidth ? this._minColWidth : calcWidth) + 'px';
            col.style.width = newWidth;
        }
    }

    onMousemove(e) {
        return {
            mouseX: e.movementX,
            mouseY: e.movementY
        };
    }

    onMouseup() {

    }
}