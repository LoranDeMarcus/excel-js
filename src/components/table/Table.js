import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import { isCell, matrix, nextSelector, shouldResize } from './table.helpers';
import { TableSelection } from '@/components/table/TableSelection';
import * as actions from '@/redux/actions';
import { defaultStyles } from '@/constants';
import { parse } from '@core/parse';

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
        return createTable(20, this.store.getState());
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();

        this.selectCell(this.$root.find('[data-id="0:0"]'));

        this.$on('formula:input', value => {
            this.selection.current
                .attr('data-value', value)
                .text(parse(value));
            this.updateTextInStore(value);
        });

        this.$on('formula:done', () => {
            this.selection.current.focus();
        });

        this.$on('toolbar:applyStyle', value => {
            this.selection.applyStyle(value);
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds
            }));
        });
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:select', $cell);
        const styles = $cell.getStyles(Object.keys(defaultStyles));
        this.$dispatch(actions.changeStyles(styles));
    }

    async resizeTable(e) {
        try {
            const data = await resizeHandler(this.$root, e);
            this.$dispatch(actions.tableResize(data));
        } catch (e) {
            console.warn('Resize error', e.message);
        }
    }

    onMousedown(e) {
        if (shouldResize(e)) {
            this.resizeTable(e);
        } else if (isCell(e)) {
            const $target = $(e.target);
            if (e.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`));
                this.selection.selectGroup($cells);
            } else {
                this.selectCell($target);
            }
        }
    }

    onKeydown(e) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'ArrowDown',
            'ArrowUp'
        ];

        const { key } = e;

        if (keys.includes(key) && !e.shiftKey) {
            e.preDefault();
            const id = this.selection.current.id(true);
            const $next = this.$root.find(nextSelector(key, id));
            this.selectCell($next);
        }
    }

    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }));
    }

    onInput(e) {
        this.updateTextInStore($(e.target).text());
    }
}
