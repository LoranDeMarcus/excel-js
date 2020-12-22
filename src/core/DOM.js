class DOM {
    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector;
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html;
            return this;
        }
        return this.$el.outerHTML.trim();
    }

    append(node) {
        if (node instanceof DOM) {
            node = node.$el;
        }

        if (Element.prototype.append) {
            this.$el.append(node);
        } else {
            this.$el.appendChild(node);
        }

        return this;
    }

    closest(selector) {
        return $(this.$el.closest(selector));
    }

    getCord() {
        return this.$el.getBoundingClientRect();
    }

    get data() {
        return this.$el.dataset;
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback);
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback);
    }

    id(parse) {
        if (parse) {
            const parsed = this.id().split(':');
            return {
                row: Number.parseInt(parsed[0]),
                col: Number.parseInt(parsed[1])
            }
        }
        return this.data.id;
    }

    find(selector) {
        return $(this.$el.querySelector(selector));
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector);
    }

    css(styles = {}) {
        Object
            .keys(styles)
            .forEach(key => {
            this.$el.style[key] = styles[key];
        });
    }

    addClass(className) {
        this.$el.classList.add(className);
    }

    removeClass(className) {
        this.$el.classList.remove(className);
    }

    clear() {
        this.html('');
        return this;
    }
}

export function $(selector) {
    return new DOM(selector);
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName);

    if (classes) {
        el.classList.add(classes);
    }

    return $(el);
}