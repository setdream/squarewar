/*
 *   Чтоб выпустить птицу - мою тоску
 *   В пустынную ночь опять.   
 */

import Observer from './Observer'; 


export default class BaseRepositary extends Observer {
    data = new Map();

    find(id) {
        return this.data.get(id);
    }

    each(cb = () => {}) {
        this.data.forEach(cb);
    }

    remove(id) {
        this.data.delete(id);
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

    clear() {
        this.data.clear();
    }
}