import { $ } from '@core/DOM';
import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            listeners: ['mousedown', 'mousemove', 'mouseup']
        });
    }

    toHTML() {
        return createTable();
    }

    onMousedown(e) {
        const $resizer = $(e.target);
        const $parent = $resizer.closest('[data-type="resizable"]');
        const counter = $parent.data.num;
        const cellsList = this.$root.findAll(`[data-num="${counter}"]`);
        const coords = $parent.getCord();

        document.onmousemove = ev => {
            const delta = ev.pageX - coords.right;
            const value = coords.width + delta;
            $resizer.$el.style.opacity = '1';

            cellsList.forEach(elem => {
                elem.classList.add('resizing');
                elem.style.width = `${value}px`;
            });
        }

        document.onmouseup = () => {
            $resizer.$el.style.opacity = '0';

            cellsList.forEach(elem => {
                elem.classList.remove('resizing');
            });

            document.onmousemove = null;
        }
    }

    onMousemove(e) {
    }

    onMouseup(e) {
    }
}