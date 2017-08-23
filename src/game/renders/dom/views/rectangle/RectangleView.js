import BaseView from '../BaseView';

import PHYSIC_TYPES from '../../../../consts/physic.types';

import './RectangleView.scss';

export default class RectangleView extends BaseView {

    init() {
        const {width, height} = this.gameObject.size;
        const {x, y} = this.gameObject.position;

        this.style.width = `${width}px`;
        this.style.height = `${height}px`;

        this.style.transform = `translate(${x}px, ${y}px)`;
    }

    remove() {
        this.element.remove();
    }

    refresh() {
        if (!this.hasPhysic()) {
            return;
        }

        const {x, y} = this.gameObject.position;
        const rotate = this.gameObject.physics.get(PHYSIC_TYPES.KINEMATIC).rotate;

        this.style.transform = `translate(${x}px, ${y}px) rotate(${rotate.value}deg)`;
    }
};
