import BaseView from '../BaseView';

import './SquareView.scss';

export default class SquareView extends BaseView {
    constructor(document, gameObject, opt = {}) {
        super(document, gameObject);

        this.corners = [];
        this.vertices = [];

        this.handleClick = this.handleClick.bind(this);
    }

    init() {
        this.element.addEventListener('click', this.handleClick);

        const {width, height} = this.gameObject.size;

         this.style.width = `${width}px`;
         this.style.height = `${height}px`;
    }

    handleClick(e) {
        e.stopPropagation();
    }

    refresh() {
        const {x, y} = this.gameObject.position;
        const rotate = this.gameObject.physics.get('kinematic').rotate;

        this.style.transform = `translate(${x}px, ${y}px) rotate(${rotate.value}deg)`;
    }
};
