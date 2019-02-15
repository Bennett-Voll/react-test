import { ListGroupItem } from "react-bootstrap";

/**
 * Map a number from one range to another
 * 
 * @param {Number} val 
 * @param {Number} start1 
 * @param {Number} end1 
 * @param {Number} start2 
 * @param {Number} end2
 * @return {Number}
 */
export function map(val, start1, end1, start2, end2) {
    return (val - start1) / (end1 - start1) * (end2 - start2) + start2;
}

/**
 * A class in which callbacks can be stored and triggered all at once.
 * Multiple arguments can be passed trough
 * 
 * @export
 * @class Trigger
 */
export class Trigger {
    constructor() {
        this.callbacks = [];
    }

    /**
     * Add a callback
     * 
     * @param {Function} callback 
     */
    add(callback) {
        this.callbacks.push(callback);
    }

    /**
     * Fire all callbacks
     * Arguments given will be passed onto the each callback
     * 
     */
    fire(...args) {
        this.callbacks.forEach((callback) => {
            callback(...args);
        });
    }

    /**
     * Remove a callback
     * 
     * @param {Function} callback 
     */
    remove(callback) {
        const i = this.callbacks.indexOf(callback);

        this.callbacks.splice(i, 1);
    }
}

Trigger.triggers = {};

/**
 * Add a new trigger
 * 
 * @param {String} id
 */
Trigger.add = (id) => {
    Trigger.triggers[id] = new Trigger();
};

/**
 * Add a callback to a trigger
 * 
 * @param {String} id
 * @param {Function} callback
 */
Trigger.on = (id, callback) => {
    Trigger.triggers[id].add(callback);
}

/**
 * Remove a callback from a trigger
 * 
 * @param {String} id
 * @param {Function} callback
 */
Trigger.off = (id, callback) => {
    Trigger.triggers[id].add(callback);
}

/**
 * FIre a trigger. First argument is ID, rest are passed to callbacks
 * 
 * @param {String} id
 */
Trigger.fire = (id, ...args) => {
    Trigger.triggers[id].fire(...args);
}

/**
 * Remove a trigger
 * 
 * @param {String} id
 */
Trigger.remove = (id) => {
    delete Trigger.triggers[id];
}