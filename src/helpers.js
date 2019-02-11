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
 * A class for creating callback objects
 */
export class Callbacks {
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
    fire() {
        const args = arguments;

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