/*
 *   Чтоб выпустить птицу - мою тоску
 *   В пустынную ночь опять.   
 */

import Observer from './Observer'; 


export default class GameRepositary extends Observer {
    data = new Map();

    find(id) {
        return this.data.get(id);
    }

    each(cb = () => {}) {
        this.data.forEach(cb);
    }

    remove(id) {
        this.data.delete(id);
        
        this.fire('removed', id);
    }

    some(cb) {
        for (let item of this.data.values()) {
            if (cb(item)) {
                return true;
            }
        }

        return false;
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

    countByKey(key, value) {
        let count = 0;

        this.data.forEach(item => {
            if (value === item[key]) {
                count += 1;
            }
        });

        return count;
    }

    clear() {
        this.data.clear();
    }
}