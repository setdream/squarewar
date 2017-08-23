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

        this.scene.on('removed', (id) => {
            let view = this.repositary.find(id);

            if (view) {
                view.toRemove();
            }
        });
    }

    draw() {
        let htmlFragment = null;

        this.sync();

        this.scene.each(gameObject => {
            let view = this.repositary.find(gameObject.id);

            if (!view) {
                if (!htmlFragment) {
                    htmlFragment = document.createDocumentFragment();
                }
                view = makeView(document, gameObject);
                this.repositary.add(view);

                htmlFragment.appendChild(view.toHTMLElement());
            }

            view.refresh();
        });

        if (htmlFragment) {
            this.sceneView.appendChild(htmlFragment);
        }
    }

    sync() {
        this.repositary.each(view => {
            if (view.isRemoved) {
                this.sceneView.removeChild(view.id);
                this.repositary.remove(view.id);
            }
        });
    }
}