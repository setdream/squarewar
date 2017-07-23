export default class BaseView {
    constructor(document, gameObject) {
        this.document = document;
        this.gameObject = gameObject;

        this.element = null;
        this.style = null;

        this.id = gameObject.id;
    }

    init() {}

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
        
        this.style = this.element.style;

        this.element.id = this.gameObject.id;
        this.element.className = this.gameObject.type;

        this.init();

        return this.element;
    }

    toHTMLElement() {
        return this.element ? this.element : this.makeHTMLElement();
    }

    refresh() {}
};
