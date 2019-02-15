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
export const map = (val, start1, end1, start2, end2) => {
    return (val - start1) / (end1 - start1) * (end2 - start2) + start2;
};