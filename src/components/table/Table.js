import { $ } from '@core/DOM';
import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import resizeHandler from '@/components/table/table.resize';
import { isCell, isMultiplySelection, matrix, shouldResize } from '@/components/table/table.helpers';
import { TableSelection } from '@/components/table/TableSelection';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        });
    }

    toHTML() {
        return createTable();
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();

        const $cell = this.$root.find('[data-id="0:0"]');
        this.selection.select($cell);
    }

    onMousedown(e) {
        if (shouldResize(e)) {
            resizeHandler(e, this.$root);
        } else if (isCell(e)) {
            const $cell = $(e.target);
            if (isMultiplySelection(e)) {

                const $cells = matrix($cell, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"`));
                this.selection.selectGroup($cells);
            } else {
                this.selection.select($cell);
            }
        }
    }
}