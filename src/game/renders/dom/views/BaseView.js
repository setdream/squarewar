export default class BaseView {
    constructor(document, gameObject) {
        this.document = document;
        this.gameObject = gameObject;

        this.id = gameObject.id;
        this.hasBorder = false;
    }

    makeHTMLElement(gameObject) {
        this.element = this.document.createElement('div');
        
        this.element.id = this.gameObject.id;
        this.element.className = this.gameObject.type;

        return this.element;
    }

    toHTMLElement() {
        return this.element ? this.element : this.makeHTMLElement();
    }

    refresh() {}
};
