/**
 * A Vector
 *
 * @export
 * @class Vector
 */
export class Vector {
    /**
     * If current form is component form, parameter 1 stands for the x axis and paramater 2 for the y axis.
     * If not, then parameter 1 stands for the length and parameter 2 stands for the direction
     * 
     * @param {Number} param1 
     * @param {Number} param2 
     * @param {Boolean} compForm Whether the parameters given are in component form 
     */
    constructor(param1, param2, compForm = true) {
        let x;
        let y;

        if (compForm) {
            x = param1 !== undefined ? param1 : Math.sqrt(0.5);
            y = param2 !=- undefined ? param2 : Math.sqrt(0.5);
        } else {
            x = Math.cos(param2) * param1;
            y = Math.sin(param2) * param1;
        }

        this.x = x;
        this.y = y;
    }

    /**
     * Return magnitude of vector
     *
     * @returns {Number}
     * @memberof Vector
     */
    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Scale the vector
     *
     * @param {Number} scalar
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    scale(scalar) {
        return (this.x *= scalar, this.y *= scalar, this);
    }

    /**
     * Get direction of the vector
     *
     * @returns {Number}
     * @memberof Vector
     */
    direction() {
        return Math.atan2(this.y, this.x);
    }

    /**
     * Change the direction of the vector
     *
     * @param {Number} radians
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    setDirection(radians) {
        let mag = this.mag();
        return (this.x = mag * Math.cos(radians), this.y = mag * Math.sin(radians), this);
    }

    /**
     * Subtract 90 degrees from the vector's direction 
     *
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    lookLeft() {
        let x = this.x;
        return (this.x = -this.y, this.y = x, this);
    }

    /**
     * Add 90 degrees from the vector's direction 
     *
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    lookRight() {
        let x = this.x;
        return (this.x = this.y, this.y = -x, this);
    }

    /**
     * Change the magnitude of the vector to one, but perserve the direction
     *
     * @param {Number} scale Scale the vecter immediately and conviently
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    normalize(scale = 1) {
        let mag = this.mag();
        return (this.x *= scale / mag, this.y *= scale / mag, this);
    }

    /**
     * Make a copy of this vector
     *
     * @returns {Vector} A new vector
     * @memberof Vector
     */
    clone() {
        return new Vector(this.x, this.y);
    }

    /**
     * Add a vector
     *
     * @param {Vector} vect
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    add(vect) {
        return (this.x += vect.x, this.y += vect.y, this);
    }

    /**
     * Subtract a vector
     *
     * @param {Vector} vect
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    sub(vect) {
        return (this.x -= vect.x, this.y -= vect.y, this);
    }

    /**
     * Check if one vector is parralel to another.
     * NOTE: This may not always be trustworthy due to floating point math in programming
     *
     * @param {Vector} vect
     * @returns {Boolean}
     * @memberof Vector
     */
    isParralelTo(vect) {
        return Vector.dotProduct(this.clone().lookLeft(), vect) === 0;
    }
}

/**
 * Relative difference in angle. Can be negative
 * 
 * @param {Vector} vect1
 * @param {Vector} vect2
 * @returns {Number}
 */
Vector.angleDifference = (vect1, vect2) => {
    let difference = vect1.direction() - vect2.direction();

    if (difference > Math.PI / 2) {
        difference -= 2 * Math.PI;
    }

    if (difference < -Math.PI / 2) {
        difference += 2 * Math.PI;
    }

    return difference;
};

/**
 * The dot product
 * 
 * @param {Vector} vect1
 * @param {Vector} vect2
 * @returns {Number}
 */
Vector.dotProduct = (vect1, vect2) => {
    return vect1.x * vect2.x + vect1.y * vect2.y;
}

/**
 * Convert to radians
 * 
 * @param {Number} degree
 * @return {Number}
 */
Vector.toRad = function (degree) {
    return degree / 180 * Math.PI;
}

/**
 * Convert to degrees
 * 
 * @param {Number} radians
 * @return {Number}
 */
Vector.toDeg = function (radians) {
    return radians * 180 / Math.PI;
}