import { makeView } from './dom/helpers/view-maker';
import ViewRepositary from './dom/repositaries/ViewRepositary';

export default class DomRender {
    constructor(document, container) {
        this.container = container;
        this.document = document;

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
        this.sync();

        this.scene.each(gameObject => {
            let view = this.repositary.find(gameObject.id);

            if (!view) {
                view = makeView(document, gameObject);
                this.repositary.add(view);

                this.sceneView.appendChild(view.toHTMLElement());
            }

            view.refresh();
        });
    }

    sync() {
        this.repositary.each(view => {
            let go = this.scene.find(view.id);

            if (!go) {
                this.sceneView.removeChild(view.id);
                this.repositary.remove(view.id);
            }
        });
    }
}