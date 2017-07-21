import { makeView } from './dom/helpers/view-maker';
import ViewRepositary from './dom/repositaries/ViewRepositary';

export default class DomRender {
    constructor(document, container) {
        this.container = container;
        this.document = document;
        this.removeQueue = [];

        this.scene = null;
        this.sceneView = null;

        this.repositary = new ViewRepositary();
    }

    init(scene) {
        this.scene = scene;
        this.sceneView = makeView(this.document, scene);

        this.container.appendChild(this.sceneView.toHTMLElement());
    }

    draw() {
        this.scene.each(gameObject => {
            let view = this.repositary.find(gameObject.id);

            if (!gameObject.isRemoved) {
                if (!view) {
                    view = makeView(document, gameObject);
                    this.repositary.add(view);

                    this.sceneView.appendChild(view.toHTMLElement());
                }

                view.refresh();
            } else {
                this.scene.remove(gameObject.id);

                if (view) {
                    this.repositary.remove(gameObject.id);
                    this.sceneView.removeChild(gameObject.id);
                }
            }
        });
    }
}