export class Emitter {
    constructor() {
        this.listeners = {};
    }
    emit(e, ...args) {
        if (!Array.isArray(this.listeners[e])) {
            return false;
        }
        this.listeners[e].forEach(listener => {
            listener(...args);
        });
        return true;
    }
    subscribe(e, fn) {
        this.listeners[e] = this.listeners[e] || [];
        this.listeners[e].push(fn);
        return () => {
            this.listeners[e] =
                this.listeners[e].filter(listener => listener !== fn);
        };
    }
}