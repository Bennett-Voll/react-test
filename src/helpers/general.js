/**
 * Map a number from one range to another
 * 
 * @param {Number} val 
 * @param {Number} start1 
 * @param {Number} end1 
 * @param {Number} start2 
 * @param {Number} end2
 * @returns {Number}
 */
export const map = (val, start1, end1, start2, end2) => {
    return (val - start1) / (end1 - start1) * (end2 - start2) + start2;
};

/**
 * Set a value to min if it's lower than min or to max if it's higher than max.
 * When the third parameter isn't given, min will be set to 0 and max to the second parameter
 * 
 * @param {Number} val
 * @param {Number} minOrMax 
 * @param {Number} max
 * @returns {Number}
 */
export const cap = (val, minOrMax, max = null) => {
    let min;
    
    if (max === null) {
        max = minOrMax;
        min = 0;
    } else {
        min = minOrMax;
    }

    if (val < min) {
        return min;
    }

    if (val > max) {
        return max;
    }

    return val;
}

/**
 * Retrieve a random range.
 * In floating point mode, range is [min,max).
 * In whole number mode, range is [min, max].
 * 
 * @param {Number} minOrMax Max = 0 and min = 0 if the second parameter isn't given. If it is, then this is min
 * @param {Number} max 
 * @param {Boolean} wholeNumbers
 * @return {Number}
 */
export const rand = (minOrMax, max = null, wholeNumbers = false) => {
    let min;
    
    if (max !== null) {
        min = minOrMax;
    } else {
        min = 0;
        max = minOrMax;
    }

    if (wholeNumbers) {
        max += 1;

        return Math.floor(Math.random() * (max - min)) + min;
    }

    return (Math.random() * (max - min)) + min;
};