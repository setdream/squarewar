import RectangleView from '../rectangle/RectangleView';

import './SquareView.scss';

export default class SquareView extends RectangleView {
    constructor(document, gameObject, opt = {}) {
        super(document, gameObject);

        this.handleClick = this.handleClick.bind(this);
    }

    init() {
        super.init();
        
        this.element.addEventListener('click', this.handleClick);
    }

    handleClick(e) {
        e.stopPropagation();
    }
};
