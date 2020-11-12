import { ExcelComponent } from '@core/ExcelComponent';
import { createTalbe } from '@/components/table/table.template';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
        });
    }

    toHTML() {
        return createTalbe();
    }

    onClick() {

    }

    onMousedown(e) {
        console.log(e.target());
    }

    onMousemove() {
        console.log('mousemove')
    }

    onMouseup() {

    }
}