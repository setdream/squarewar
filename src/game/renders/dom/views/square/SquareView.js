import BaseView from '../BaseView';

import './SquareView.scss';

export default class SquareView extends BaseView {
    constructor(document, gameObject, opt = {}) {
        super(document, gameObject);

        this.border = opt.border || 1;
    }

    refresh() {
         let {width, height} = this.gameObject.size;

         if (this.border) {
            width -= this.border * 2;
            height -= this.border * 2;
         }

         this.element.style.width = width + 'px';
         this.element.style.height = height + 'px';
         this.element.style.left = this.gameObject.position.x + 'px';
         this.element.style.top = this.gameObject.position.y + 'px';
    }
};
