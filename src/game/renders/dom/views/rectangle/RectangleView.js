import BaseView from '../BaseView';

import './RectangleView.scss';

export default class RectangleView extends BaseView {
    refresh() {
         const {width, height} = this.gameObject.size;
         this.element.style.width = width + 'px';
         this.element.style.height = height + 'px';
         this.element.style.left = this.gameObject.position.x + 'px';
         this.element.style.top = this.gameObject.position.y + 'px';
    }
};
