import BaseView from '../BaseView';

import './RectangleView.scss';

export default class RectangleView extends BaseView {
    refresh() {
        const style = this.element.style;
        const {width, height} = this.gameObject.size;

        style.width = `${width}px`;
        style.height = `${height}px`;

        style.left = `${this.gameObject.position.x}px`;
        style.top = `${this.gameObject.position.y}px`;
    }
};
