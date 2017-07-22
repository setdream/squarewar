import BaseView from '../BaseView';

import './SceneView.scss';

export default class SceneView extends BaseView {
    constructor(document, gameObject, opt = {}) {
        super(document, gameObject);

        this.scene = this.gameObject;

        this.handleClick = this.handleClick.bind(this);
    }

    init() {
        this.element.addEventListener('click', this.handleClick);
    }

    handleClick(e) {
        this.scene.handleClick([e.clientX, e.clientY]);
    }
};
