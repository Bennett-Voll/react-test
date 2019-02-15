/**
 * A Vector
 *
 * @export
 * @class Vector
 */
export class Vector {
    constructor(x = 0, y = 0) {
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
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    normalize() {
        let mag = this.mag();
        return (this.x /= mag, this.y /= mag, this);
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

Vector.dotProduct = function (vect1, vect2) {
    return vect1.x * vect2.x + vect1.y * vect2.y;
}

Vector.areParralel = function (vect1, vect2) {
    return Vector.dotProduct(vect1.clone().lookLeft(), vect2) == 0;
}

Vector.toRad = function (deg) {
    return deg / 180 * Math.PI;
}

Vector.toDeg = function (rad) {
    return rad * 180 / Math.PI;
}