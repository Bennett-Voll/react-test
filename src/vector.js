function Vector(x = 0, y = 0) {
    this.x = x;
    this.y = y;
}

Vector.sub = function (vect1, vect2) {
    return new Vector(vect1.x - vect2.x, vect1.y - vect2.y);
}

Vector.add = function (vect1, vect2) {
    return new Vector(vect1.x + vect2.x, vect1.y + vect2.y);
}

Vector.prototype.mag = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
}

Vector.prototype.scale = function (scalar) {
    return this.x *= scalar, this.y *= scalar, this;
}

Vector.prototype.direction = function () {
    return Math.atan2(this.y, this.x);
}

Vector.prototype.setDirection = function (radians) {
    let mag = this.mag();
    return this.x = mag * Math.cos(radians), this.y = mag * Math.sin(radians), this;
}

Vector.prototype.lookLeft = function () {
    let x = this.x;
    return this.x = -this.y, this.y = x, this;
}

Vector.prototype.lookRight = function () {
    let x = this.x;
    return this.x = this.y, this.y = -x, this;
}

Vector.prototype.normalize = function () {
    let mag = this.mag();
    return this.x /= mag, this.y /= mag, this;
}

Vector.prototype.clone = function () {
    return new Vector(this.x, this.y);
}

Vector.angleDifference = function (vect1, vect2) {
    let difference = vect1.direction() - vect2.direction();

    if (difference > Math.PI / 2) {
        difference -= 2 * Math.PI;
    }

    if (difference < -Math.PI / 2) {
        difference += 2 * Math.PI;
    }

    return difference;
}

Vector.dotProduct = function (vect1, vect2) {
    return vect1.x * vect2.x + vect1.y * vect2.y;
}

Vector.prototype.add = function (vect) {
    return this.x += vect.x, this.y += vect.y, this;
}

Vector.prototype.sub = function (vect) {
    return this.x -= vect.x, this.y -= vect.y, this;
}

Vector.prototype.isParralelTo = function (vect) {
    return Vector.dotProduct(this.clone().lookLeft(), vect) == 0;
}

Vector.areParralel = function (vect1, vect2) {
    return Vector.dotProduct(vect1.clone().lookLeft(), vect2) == 0;
}

Vector.add = function (vect1, vect2) {
    return vect1.clone().add(vect2);
}

Vector.toRad = function (deg) {
    return deg / 180 * Math.PI;
}

Vector.toDeg = function (rad) {
    return rad * 180 / Math.PI;
}

export default Vector;