export default class Observer {
    subscribers = {
        any: []
    }

    on(type, fn, context) {
        type = type || 'any';
        fn = typeof fn === 'function' ? fn : context[fn];

        if(typeof this.subscribers[type] === 'undefined') {
            this.subscribers[type] = [];
        }

        this.subscribers[type].push({fn: fn, context: context || this});      
    }

    off(type, fn, context) {
        this.visitSubscribers('unsubscribe', type, fn, context);
    }

    fire(type, publication) {
        this.visitSubscribers('publish', type, publication);
    }

    visitSubscribers(action, type, arg, context) {
        const pubtype = type || 'any',
            subscribers = this.subscribers[pubtype],
            max = subscribers ? subscribers.length : 0;

        for (let i = 0; i < max; i += 1) {
            if(action === 'publish') {
                subscribers[i].fn.call(subscribers[i].context, arg);
            } else {
                if(subscribers[i].fn === arg && subscribers[i].context === context) {
                    subscribers.splice(i, 1);
                }
            }
        }
    }
}