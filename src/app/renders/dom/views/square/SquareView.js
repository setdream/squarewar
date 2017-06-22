import BaseView from '../BaseView';

import './SquareView.scss';

export default class SquareView extends BaseView {
    refresh() {
         this.element.style.width = this.gameObject.size + 'px';
         this.element.style.height = this.gameObject.size + 'px';
         this.element.style.left = this.gameObject.position.x + 'px';
         this.element.style.top = this.gameObject.position.y + 'px';
    }
};
