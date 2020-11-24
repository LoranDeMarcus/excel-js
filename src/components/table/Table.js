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
        if (e.target.dataset.resize) {
            const $resizer = $(e.target);
            const $parent = $resizer.closest('[data-type="resizable"]');
            const counter = $parent.data.num;
            const cellsList = this.$root.findAll(`[data-num="${counter}"]`);
            const coords = $parent.getCord();
            const type = $resizer.data.resize;

            document.onmousemove = ev => {
                if (type  === 'col') {
                    const delta = ev.pageX - coords.right;
                    const value = coords.width + delta;
                    $resizer.css({opacity: '1'});
                    $parent.css({width: `${value}px`});

                    cellsList.forEach(elem => {
                        elem.classList.add('resizing');
                        $(elem).css({width: `${value}px`});
                    });
                } else {
                    const delta = ev.pageY - coords.bottom;
                    const value = coords.height + delta;
                    $resizer.css({opacity: '1'});
                    $parent.css({height: `${value}px`})
                }
            }

            document.onmouseup = () => {
                $resizer.css({opacity: '0'});

                cellsList.forEach(elem => {
                    elem.classList.remove('resizing');
                });

                document.onmousemove = null;
            }
        }
    }

    onMousemove(e) {
    }

    onMouseup(e) {
    }
}