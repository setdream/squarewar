export default class DomElement {
    constructor(gameObject) {
        this.gameObject = gameObject;

        Object.observe(this.gameObject, function(changes) {
            console.log('changes: ', changes);
        });
    }

    toDom() {
        const domElement = this.document.createElement('div');
        
        domElement.id = this.gameObject.id;
        domElement.className = this.gameObject.type;
    }
};
