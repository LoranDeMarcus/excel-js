import { $ } from '@core/dom';
import { ExcelComponent } from '@core/ExcelComponent';
import { changeTableTitle } from '@/redux/actions';
import { defaultTitle } from '@/constants';

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            ...options,
            listeners: ['input'],
            subscribe: ['tableTitle']
        });
    }

    toHTML() {
        const { tableTitle } = this.store.getState() || defaultTitle;
        return `
      <input type="text" class="input" value="${tableTitle}" />

      <div>

        <div class="button">
          <i class="material-icons">delete</i>
        </div>

        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>

      </div>
    `;
    }

    onInput(e) {
        this.$dispatch(changeTableTitle($(e.target).text()));
    }
}
