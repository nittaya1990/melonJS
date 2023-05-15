/*!
 * melonJS Game Engine - v15.2.1
 * http://www.melonjs.org
 * melonjs is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 * @copyright (C) 2011 - 2023 Olivier Biot (AltByte Pte Ltd)
 */
import { clamp } from './math.js';
import pool from '../system/pooling.js';

/**
 * @classdesc
 * a generic 2D Vector Object
 */
 class Vector2d {
    /**
     * @param {number} [x=0] - x value of the vector
     * @param {number} [y=0] - y value of the vector
     */
    constructor(x = 0, y = 0) {
        this.onResetEvent(x, y);
    }

    /**
     * @ignore
     */
    onResetEvent(x = 0, y = 0) {
        // this is to enable proper object pooling
        this.x = x;
        this.y = y;
        return this;
    }

    /**
     * @ignore
     */
    _set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    /**
     * set the Vector x and y properties to the given values<br>
     * @name set
     * @memberof Vector2d
     * @param {number} x
     * @param {number} y
     * @returns {Vector2d} Reference to this object for method chaining
     */
    set(x, y) {
        if (x !== +x || y !== +y) {
            throw new Error(
                "invalid x,y parameters (not a number)"
            );
        }

        /**
         * x value of the vector
         * @public
         * @member {number}
         * @name x
         * @memberof Vector2d
         */
        //this.x = x;

        /**
         * y value of the vector
         * @public
         * @member {number}
         * @name y
         * @memberof Vector2d
         */
        //this.y = y;

        return this._set(x, y);
    }

    /**
     * set the Vector x and y properties to 0
     * @name setZero
     * @memberof Vector2d
     * @returns {Vector2d} Reference to this object for method chaining
     */
    setZero() {
        return this.set(0, 0);
    }

    /**
     * set the Vector x and y properties using the passed vector
     * @name setV
     * @memberof Vector2d
     * @param {Vector2d} v
     * @returns {Vector2d} Reference to this object for method chaining
     */
    setV(v) {
        return this._set(v.x, v.y);
    }

    /**
     * Add the passed vector to this vector
     * @name add
     * @memberof Vector2d
     * @param {Vector2d} v
     * @returns {Vector2d} Reference to this object for method chaining
     */
    add(v) {
        return this._set(this.x + v.x, this.y + v.y);
    }

    /**
     * Substract the passed vector to this vector
     * @name sub
     * @memberof Vector2d
     * @param {Vector2d} v
     * @returns {Vector2d} Reference to this object for method chaining
     */
    sub(v) {
        return this._set(this.x - v.x, this.y - v.y);
    }

    /**
     * Multiply this vector values by the given scalar
     * @name scale
     * @memberof Vector2d
     * @param {number} x
     * @param {number} [y=x]
     * @returns {Vector2d} Reference to this object for method chaining
     */
    scale(x, y = x) {
        return this._set(this.x * x, this.y * y);
    }

    /**
     * Convert this vector into isometric coordinate space
     * @name toIso
     * @memberof Vector2d
     * @returns {Vector2d} Reference to this object for method chaining
     */
    toIso() {
        return this._set(this.x - this.y, (this.x + this.y) * 0.5);
    }

    /**
     * Convert this vector into 2d coordinate space
     * @name to2d
     * @memberof Vector2d
     * @returns {Vector2d} Reference to this object for method chaining
     */
    to2d() {
        return this._set(this.y + this.x / 2, this.y - this.x / 2);
    }

    /**
     * Multiply this vector values by the passed vector
     * @name scaleV
     * @memberof Vector2d
     * @param {Vector2d} v
     * @returns {Vector2d} Reference to this object for method chaining
     */
    scaleV(v) {
        return this._set(this.x * v.x, this.y * v.y);
    }

    /**
     * Divide this vector values by the passed value
     * @name div
     * @memberof Vector2d
     * @param {number} n - the value to divide the vector by
     * @returns {Vector2d} Reference to this object for method chaining
     */
    div(n) {
        return this._set(this.x / n, this.y / n);
    }

    /**
     * Update this vector values to absolute values
     * @name abs
     * @memberof Vector2d
     * @returns {Vector2d} Reference to this object for method chaining
     */
    abs() {
        return this._set((this.x < 0) ? -this.x : this.x, (this.y < 0) ? -this.y : this.y);
    }

    /**
     * Clamp the vector value within the specified value range
     * @name clamp
     * @memberof Vector2d
     * @param {number} low
     * @param {number} high
     * @returns {Vector2d} new me.Vector2d
     */
    clamp(low, high) {
        return new Vector2d(clamp(this.x, low, high), clamp(this.y, low, high));
    }

    /**
     * Clamp this vector value within the specified value range
     * @name clampSelf
     * @memberof Vector2d
     * @param {number} low
     * @param {number} high
     * @returns {Vector2d} Reference to this object for method chaining
     */
    clampSelf(low, high) {
        return this._set(clamp(this.x, low, high), clamp(this.y, low, high));
    }

    /**
     * Update this vector with the minimum value between this and the passed vector
     * @name minV
     * @memberof Vector2d
     * @param {Vector2d} v
     * @returns {Vector2d} Reference to this object for method chaining
     */
    minV(v) {
        return this._set((this.x < v.x) ? this.x : v.x, (this.y < v.y) ? this.y : v.y);
    }

    /**
     * Update this vector with the maximum value between this and the passed vector
     * @name maxV
     * @memberof Vector2d
     * @param {Vector2d} v
     * @returns {Vector2d} Reference to this object for method chaining
     */
    maxV(v) {
        return this._set((this.x > v.x) ? this.x : v.x, (this.y > v.y) ? this.y : v.y);
    }

    /**
     * Floor the vector values
     * @name floor
     * @memberof Vector2d
     * @returns {Vector2d} new me.Vector2d
     */
    floor() {
        return new Vector2d(Math.floor(this.x), Math.floor(this.y));
    }

    /**
     * Floor this vector values
     * @name floorSelf
     * @memberof Vector2d
     * @returns {Vector2d} Reference to this object for method chaining
     */
    floorSelf() {
        return this._set(Math.floor(this.x), Math.floor(this.y));
    }

    /**
     * Ceil the vector values
     * @name ceil
     * @memberof Vector2d
     * @returns {Vector2d} new me.Vector2d
     */
    ceil() {
        return new Vector2d(Math.ceil(this.x), Math.ceil(this.y));
    }

    /**
     * Ceil this vector values
     * @name ceilSelf
     * @memberof Vector2d
     * @returns {Vector2d} Reference to this object for method chaining
     */
    ceilSelf() {
        return this._set(Math.ceil(this.x), Math.ceil(this.y));
    }

    /**
     * Negate the vector values
     * @name negate
     * @memberof Vector2d
     * @returns {Vector2d} new me.Vector2d
     */
    negate() {
        return new Vector2d(-this.x, -this.y);
    }

    /**
     * Negate this vector values
     * @name negateSelf
     * @memberof Vector2d
     * @returns {Vector2d} Reference to this object for method chaining
     */
    negateSelf() {
        return this._set(-this.x, -this.y);
    }

    /**
     * Copy the x,y values of the passed vector to this one
     * @name copy
     * @memberof Vector2d
     * @param {Vector2d} v
     * @returns {Vector2d} Reference to this object for method chaining
     */
    copy(v) {
        return this._set(v.x, v.y);
    }

    /**
     * return true if the two vectors are the same
     * @name equals
     * @memberof Vector2d
     * @method
     * @param {Vector2d} v
     * @returns {boolean}
     */
    /**
     * return true if this vector is equal to the given values
     * @name equals
     * @memberof Vector2d
     * @param {number} x
     * @param {number} y
     * @returns {boolean}
     */
    equals() {
        let _x, _y;
        if (arguments.length === 2) {
            // x, y
            _x = arguments[0];
            _y = arguments[1];
        } else {
            // vector
            _x = arguments[0].x;
            _y = arguments[0].y;
        }
        return ((this.x === _x) && (this.y === _y));
    }

    /**
     * normalize this vector (scale the vector so that its magnitude is 1)
     * @name normalize
     * @memberof Vector2d
     * @returns {Vector2d} Reference to this object for method chaining
     */
    normalize() {
        return this.div(this.length() || 1);
    }

    /**
     * change this vector to be perpendicular to what it was before.<br>
     * (Effectively rotates it 90 degrees in a clockwise direction)
     * @name perp
     * @memberof Vector2d
     * @returns {Vector2d} Reference to this object for method chaining
     */
    perp() {
        return this._set(this.y, -this.x);
    }

    /**
     * Rotate this vector (counter-clockwise) by the specified angle (in radians).
     * @name rotate
     * @memberof Vector2d
     * @param {number} angle - The angle to rotate (in radians)
     * @param {Vector2d|ObservableVector2d} [v] - an optional point to rotate around
     * @returns {Vector2d} Reference to this object for method chaining
     */
    rotate(angle, v) {
        let cx = 0;
        let cy = 0;

        if (typeof v === "object") {
            cx = v.x;
            cy = v.y;
        }

        let x = this.x - cx;
        let y = this.y - cy;

        let c = Math.cos(angle);
        let s = Math.sin(angle);

        return this._set(x * c - y * s + cx, x * s + y * c + cy);
    }

    /**
     * return the dot product of this vector and the passed one
     * @name dot
     * @memberof Vector2d
     * @param {Vector2d} v
     * @returns {number} The dot product.
     */
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    /**
     * return the cross product of this vector and the passed one
     * @name cross
     * @memberof Vector2d
     * @param {Vector2d} v
     * @returns {number} The cross product.
     */
    cross(v) {
        return this.x * v.y - this.y * v.x;
    }

   /**
    * return the square length of this vector
    * @name length2
    * @memberof Vector2d
    * @returns {number} The length^2 of this vector.
    */
    length2() {
        return this.dot(this);
    }

    /**
     * return the length (magnitude) of this vector
     * @name length
     * @memberof Vector2d
     * @returns {number} the length of this vector
     */
    length() {
        return Math.sqrt(this.length2());
    }

    /**
     * Linearly interpolate between this vector and the given one.
     * @name lerp
     * @memberof Vector2d
     * @param {Vector2d} v
     * @param {number} alpha - distance along the line (alpha = 0 will be this vector, and alpha = 1 will be the given one).
     * @returns {Vector2d} Reference to this object for method chaining
     */
    lerp(v, alpha) {
        this.x += ( v.x - this.x ) * alpha;
        this.y += ( v.y - this.y ) * alpha;
        return this;
    }

    /**
     * interpolate the position of this vector towards the given one by the given maximum step.
     * @name moveTowards
     * @memberof Vector2d
     * @param {Vector2d} target
     * @param {number} step - the maximum step per iteration (Negative values will push the vector away from the target)
     * @returns {Vector2d} Reference to this object for method chaining
     */
     moveTowards(target, step) {
        let angle = Math.atan2(target.y - this.y, target.x - this.x);

        let distance = this.distance(target);

        if (distance === 0 || (step >= 0 && distance <= step * step)) {
            return target;
        }

        this.x += Math.cos(angle) * step;
        this.y += Math.sin(angle) * step;

        return this;
    }

    /**
     * return the distance between this vector and the passed one
     * @name distance
     * @memberof Vector2d
     * @param {Vector2d} v
     * @returns {number}
     */
    distance(v) {
        let dx = this.x - v.x, dy = this.y - v.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * return the angle between this vector and the passed one
     * @name angle
     * @memberof Vector2d
     * @param {Vector2d} v
     * @returns {number} angle in radians
     */
    angle(v) {
        return Math.acos(clamp(this.dot(v) / (this.length() * v.length()), -1, 1));
    }

    /**
     * project this vector on to another vector.
     * @name project
     * @memberof Vector2d
     * @param {Vector2d} v - The vector to project onto.
     * @returns {Vector2d} Reference to this object for method chaining
     */
    project(v) {
        return this.scale(this.dot(v) / v.length2());
    }

    /**
     * Project this vector onto a vector of unit length.<br>
     * This is slightly more efficient than `project` when dealing with unit vectors.
     * @name projectN
     * @memberof Vector2d
     * @param {Vector2d} v - The unit vector to project onto.
     * @returns {Vector2d} Reference to this object for method chaining
     */
    projectN(v) {
        return this.scale(this.dot(v));
    }

    /**
     * return a clone copy of this vector
     * @name clone
     * @memberof Vector2d
     * @returns {Vector2d} new me.Vector2d
     */
    clone() {
        return pool.pull("Vector2d", this.x, this.y);
    }

    /**
     * convert the object to a string representation
     * @name toString
     * @memberof Vector2d
     * @returns {string}
     */
    toString() {
        return "x:" + this.x + ",y:" + this.y;
    }
}

export { Vector2d as default };
