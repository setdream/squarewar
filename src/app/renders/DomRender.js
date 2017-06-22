import DomElement from './DomElement';
import DomElementRepositary from './DomElementsRepositary';

export default class DomRender {
    constructor(container) {
        this.container = container || window.document.body;
        this.window = window;
        this.document = window.document;

        this.repositary = new DomElementRepositary();
    }

    draw(gameObjects = []) {
        const repositary = this.repositary;
        const container = this.container;

        gameObjects.forEach(gameObject => {
            let domElement = repositary.find(gameObject.id);

            if (!domElement) {
                domElement = new DomElement(gameObject);
                repositary.add(domElement);

                container.appendChild(domElement);
            }
        });

    }
}