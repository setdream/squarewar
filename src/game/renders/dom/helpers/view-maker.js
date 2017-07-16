import GAME_OBJECT_TYPES from './../../../consts/game-object.types';
import SquareView from './../views/square/SquareView';
import RectangleView from './../views/rectangle/RectangleView';

const VIEW_TYPES = {
    [GAME_OBJECT_TYPES.SQUARE]: SquareView,
    [GAME_OBJECT_TYPES.RECTANGLE]: RectangleView
};

const getViewByType = (type) => VIEW_TYPES[type];

export const makeView = (document, gameObject) => {
    const View = getViewByType(gameObject.type);
    return new View(document, gameObject);
} 
