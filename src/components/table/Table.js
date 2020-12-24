import { $ } from '@core/DOM';
import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import resizeHandler from '@/components/table/table.resize';
import { isCell, isMultiplySelection, matrix, shouldResize, nextSelector } from '@/components/table/table.helpers';
import { TableSelection } from '@/components/table/TableSelection';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
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
        this.selectCell($cell);

        this.$on('formula:input', text => {
            this.selection.current.text(text);
        })

        this.$on('formula:focus', () => {
            this.selection.current.focus();
        });

        this.$subscribe(state => {
            console.log('TableState', state);
        });
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:select', $cell);
        this.$dispatch({ type: 'Test' });
    }

    async resizeTable(e) {
        try {
            const data = await resizeHandler(e, this.$root);
            this.$dispatch({ type: 'TABLE_RESIZE' }, data);
        } catch (e) {
            console.warn('Resize error:', e.message);
        }
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

    onKeydown(e) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowLeft',
            'ArrowUp',
            'ArrowRight',
            'ArrowDown'
        ];

        const { key } = e;

        if (keys.includes(key) && !e.shiftKey) {
            e.preventDefault();
            const id = this.selection.current.id(true);
            const $next = this.$root.find(nextSelector(key, id));
            this.selectCell($next);
        }
    }

    onInput(e) {
        this.$dispatch('table:input', $(e.target));
    }
}