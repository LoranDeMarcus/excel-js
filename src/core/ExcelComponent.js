import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || '';
        this.emitter = options.emitter;
        this.subscribe = options.subscribe || [];
        this.store = options.store;
        this.unsubscribers = [];

        this.prepare();
    }

    prepare() {
    }

    toHTML() {
        return '';
    }

    $emit(e, ...args) {
        this.emitter.emit(e, ...args);
    }

    $on(e, fn) {
        const unsub = this.emitter.subscribe(e, fn);
        this.unsubscribers.push(unsub);
    }

    $dispatch(action) {
        this.store.dispatch(action);
    }

    storeChanged() {
    }

    isWatching(key) {
        return this.subscribe.includes(key);
    }

    init() {
        this.initDOMListeners();
    }

    destroy() {
        this.removeDOMListeners();
        this.unsubscribers.forEach(unsub => unsub());
    }
}
