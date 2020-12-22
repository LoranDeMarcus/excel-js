import { DOMListener } from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || ''

        this.prepare();
    }

    prepare() {};

    toHTML() {
        return null;
    }

    init() {
        this.initDOMListeners();
    }

    destroy() {
        this.removeDOMListeners();
    }
}