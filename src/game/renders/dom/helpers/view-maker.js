import GAME_OBJECT_TYPES from './../../../consts/game-object.types';
import SquareView from './../views/square/SquareView';
import RectangleView from './../views/rectangle/RectangleView';
import SceneView from './../views/scene/SceneView';

const VIEW_TYPES = {
    [GAME_OBJECT_TYPES.SQUARE]: SquareView,
    [GAME_OBJECT_TYPES.RECTANGLE]: RectangleView,
    [GAME_OBJECT_TYPES.SCENE]: SceneView
};

const getViewByType = (type) => VIEW_TYPES[type];

export const makeView = (document, gameObject) => {
    const View = getViewByType(gameObject.type);
    return new View(document, gameObject);
} 
