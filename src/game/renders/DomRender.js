import { makeView } from './dom/helpers/view-maker';
import ViewRepositary from './dom/repositaries/ViewRepositary';

export default class DomRender {
    constructor(document, container) {
        this.container = container;
        this.document = document;

        this.repositary = new ViewRepositary();
    }

    draw(gameObjects = []) {
        gameObjects.forEach(gameObject => {
            let view = this.repositary.find(gameObject.id);

            if (!view) {
                view = makeView(document, gameObject);
                this.repositary.add(view);

                this.container.appendChild(view.toHTMLElement());
            }

            view.refresh();
        });
    }
}