/*
 *   Чтоб выпустить птицу - мою тоску
 *   В пустынную ночь опять.   
 */

export default class BaseRepositary {
    data = new Map();

    find(id) {
        return this.data.get(id);
    }

    add(item) {
        if (Array.isArray(item)) {
            item.forEach((el) => {
                this.data.set(el.id, el);
            });
        } else {
            this.data.set(item.id, item);
        }
    }

    count() {
        return this.data.size;
    }

    toArray() {
        return this.data;
    }
}