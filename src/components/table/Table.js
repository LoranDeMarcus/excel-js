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
            this.col = e.target.parentNode;
            this.currentWidth = this.col.offsetWidth;
            this.col_offset = e.pageX;
        }
    }

    onMousemove(e) {
        if (this.col) {
            this.calcWith = this.currentWidth + e.pageX - this.col_offset;
            let newWidth = (this.calcWith < this._minColWidth ? this._minColWidth : this.calcWith) + 'px';
            this.col.style.width = newWidth;
        }
    }

    onMouseup() {
        this.col = null;
    }
}