import { $ } from '@core/DOM';
import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
        });
    }

    toHTML() {
        return createTable();
    }

    onClick() {

    }

    onMousedown(e) {
        const $resizer = $(e.target);
        const $parent = $resizer.closest('[data-type="resizable"]');
        const coords = $parent.getCord();

        document.onmousemove = ev => {
            const delta = ev.pageX - coords.right;
            const value = coords.width + delta;
            $parent.$el.style.width = value + 'px';
        }

        document.onmouseup = () => {
            document.onmousemove = null;
        }
    }

    onMousemove(e) {
    }

    onMouseup(e) {
    }
}