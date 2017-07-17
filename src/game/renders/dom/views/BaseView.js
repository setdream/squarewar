export default class BaseView {
    constructor(document, gameObject) {
        this.document = document;
        this.gameObject = gameObject;
        this.element = null;

        this.id = gameObject.id;
        this.border = 0;
    }

    removeChild(id) {
        if (this.element) {
            this.element.removeChild(this.document.getElementById(id));
        }
    }

    appendChild(element) {
        this.element.appendChild(element);
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
