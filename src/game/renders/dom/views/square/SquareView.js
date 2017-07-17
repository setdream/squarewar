import BaseView from '../BaseView';

import './SquareView.scss';

export default class SquareView extends BaseView {
    constructor(document, gameObject, opt = {}) {
        super(document, gameObject);

        this.border = opt.border || 1;
    }

    refresh() {
        const style = this.element.style;
        let {width, height} = this.gameObject.size;

         if (this.border) {
            width -= this.border * 2;
            height -= this.border * 2;
         }

         style.width = `${width}px`;
         style.height = `${height}px`;

         style.left = `${this.gameObject.position.x}px`;
         style.top = `${this.gameObject.position.y}px`;
    }
};
