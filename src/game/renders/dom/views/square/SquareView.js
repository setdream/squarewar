import BaseView from '../BaseView';

import './SquareView.scss';

export default class SquareView extends BaseView {
    constructor(document, gameObject, opt = {}) {
        super(document, gameObject);

        this.scale = this.gameObject.scale;

        this.border = opt.border || 1;

        this.corners = [];
        this.vertices = [];

        this.handleClick = this.handleClick.bind(this);
    }

    init() {
        this.element.addEventListener('click', this.handleClick);

        let {width, height} = this.gameObject.size;

         if (this.border) {
            width -= this.border * 2;
            height -= this.border * 2;
         }

         this.style.width = `${width}px`;
         this.style.height = `${height}px`;

         this.gameObject.vertices.forEach(vertex => {
             const el = this.document.createElement('div');

            el.style.width = `${width/10}px`;
            el.style.height = `${height/10}px`;

             el.className = 'square__vertex';

             this.document.body.appendChild(el);

             this.vertices.push(el);
         });
    }

    handleClick(e) {
        e.stopPropagation();
    }

    refresh() {
        const style = this.element.style;
        const {x, y} = this.gameObject.position;

        const scale = this.gameObject.scale;
        const rotate = this.gameObject.physics.get('kinematic').rotate;

        this.style.transform = `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate.current}deg)`;

        this.vertices.forEach((el, index) => {
            const {x, y} = this.gameObject.vertices[index]; 

            el.style.transform = `translate(${x}px, ${y}px)`;
         });
    }
};
