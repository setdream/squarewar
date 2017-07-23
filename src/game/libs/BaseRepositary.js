/*
 *   Я вас любил. Любовь ещё (возможно,
 *   что просто боль) сверлит мои мозги, 
 */

import Observer from './Observer'; 


export default class BaseRepositary extends Observer {
    data = [];

    find(id) {
        return this.data.filter(item => item.id === id)[0];
    }

    each(cb = () => {}) {
        this.data.forEach(cb);
    }

    remove(id) {
        this.data = this.data.filter(item => item.id !== id);
        
        this.fire('removed', id);
    }

    add(item) {
        if (Array.isArray(item)) {
            this.data = [...this.data, ...item];
        } else {
            this.data.push(item);
        }
    }

    count() {
        return this.data.length;
    }

    countByKey(key, value) {
        return this.data.filter(item => value === item[key]).length;
    }

    clear() {
        this.data = [];
    }
}