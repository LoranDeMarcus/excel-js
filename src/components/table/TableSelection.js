export class TableSelection {
    constructor() {
        this.group = [];
        this.selected = 'selected';
    }

    select($el) {
        this.group.forEach(cell => cell.removeClass(this.selected));
        this.group.push($el);
        $el.addClass(this.selected);
    }

    selectGroup($el) {
        this.group.push($el);
    }
}