import GAME_OBJECT_TYPES from './../../consts/game-object.types';


export default class Field {
    data = new Map();

    constructor(scene) {
        this.scene = scene;
        this.cellSize = scene.config.maxSize;

        this.data = new Map();
        this.rectanglesIds = 
            this.scene.findByKey('type', GAME_OBJECT_TYPES.RECTANGLE).map(go => go.id);
    }

    init() {
        const cellSize = this.cellSize;

        this.data.clear();

        this.scene.each(go => go.isCollapsed &&
            go.vertices.forEach(({x, y}) => {
                const hash = `${~~(x / cellSize)}-${~~(y / cellSize)}`;
                let ids = this.data.get(hash);

                if (ids && !ids.includes(go.id)) {
                    this.data.set(hash, [...ids, go.id]);
                } else {
                    this.data.set(hash, [go.id]);
                }
            }));
    }

    getCollapseIds(go) {
        const cellSize = this.cellSize;

        return go.vertices.reduce((acc, {x, y}) =>  {
                const hash = `${~~(x / cellSize)}-${~~(y / cellSize)}`;

                return [...acc, ...this.data.get(hash)];
            }, this.rectanglesIds);
    }
}