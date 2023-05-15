/**
 * @classdesc
 * a bound object contains methods for creating and manipulating axis-aligned bounding boxes (AABB).
 */
export default class Bounds {
    /**
     * @param {Vector2d[]|Point[]} [vertices] - an array of Vector2d or Point
     */
    constructor(vertices?: Vector2d[] | Point[] | undefined);
    _center: Vector2d;
    /**
     * @ignore
     */
    onResetEvent(vertices: any): void;
    min: {
        x: number;
        y: number;
    } | undefined;
    max: {
        x: number;
        y: number;
    } | undefined;
    /**
     * reset the bound
     */
    clear(): void;
    /**
     * sets the bounds to the given min and max value
     * @param {number} minX
     * @param {number} minY
     * @param {number} maxX
     * @param {number} maxY
     */
    setMinMax(minX: number, minY: number, maxX: number, maxY: number): void;
    set x(arg: number);
    /**
     * x position of the bound
     * @type {number}
     */
    get x(): number;
    set y(arg: number);
    /**
     * y position of the bounds
     * @type {number}
     */
    get y(): number;
    set width(arg: number);
    /**
     * width of the bounds
     * @type {number}
     */
    get width(): number;
    set height(arg: number);
    /**
     * width of the bounds
     * @type {number}
     */
    get height(): number;
    /**
     * left coordinate of the bound
     * @type {number}
     */
    get left(): number;
    /**
     * right coordinate of the bound
     * @type {number}
     */
    get right(): number;
    /**
     * top coordinate of the bound
     * @type {number}
     */
    get top(): number;
    /**
     * bottom coordinate of the bound
     * @type {number}
     */
    get bottom(): number;
    /**
     * center position of the bound on the x axis
     * @type {number}
     */
    get centerX(): number;
    /**
     * center position of the bound on the y axis
     * @type {number}
     */
    get centerY(): number;
    /**
     * return the center position of the bound
     * @type {Vector2d}
     */
    get center(): Vector2d;
    /**
     * center the bounds position around the given coordinates
     * @param {number} x - the x coordinate around which to center this bounds
     * @param {number} y - the y coordinate around which to center this bounds
     */
    centerOn(x: number, y: number): Bounds;
    /**
     * Updates bounds using the given vertices
     * @param {Vector2d[]|Point[]} vertices - an array of Vector2d or Point
     */
    update(vertices: Vector2d[] | Point[]): void;
    /**
     * add the given vertices to the bounds definition.
     * @param {Vector2d[]|Point[]} vertices - an array of Vector2d or Point
     * @param {boolean} [clear=false] - either to reset the bounds before adding the new vertices
     */
    add(vertices: Vector2d[] | Point[], clear?: boolean | undefined): void;
    /**
     * add the given bounds to the bounds definition.
     * @param {Bounds} bounds
     * @param {boolean} [clear=false] - either to reset the bounds before adding the new vertices
     */
    addBounds(bounds: Bounds, clear?: boolean | undefined): void;
    /**
     * add the given point to the bounds definition.
     * @param {Vector2d|Point} point - the vector or point to be added to the bounds
     * @param {Matrix2d} [m] - an optional transform to apply to the given point (if the given point is a Vector2d)
     */
    addPoint(point: Vector2d | Point, m?: any): void;
    /**
     * add the given quad coordinates to this bound definition, multiplied by the given matrix
     * @param {number} x0 - left X coordinates of the quad
     * @param {number} y0 - top Y coordinates of the quad
     * @param {number} x1 - right X coordinates of the quad
     * @param {number} y1 - bottom y coordinates of the quad
     * @param {Matrix2d} [m] - an optional transform to apply to the given frame coordinates
     */
    addFrame(x0: number, y0: number, x1: number, y1: number, m?: any): void;
    /**
     * Returns true if the bounds contains the given point.
     * @name contains
     * @memberof Bounds
     * @method
     * @param {Vector2d} point
     * @returns {boolean} True if the bounds contain the point, otherwise false
     */
    /**
     * Returns true if the bounds contains the given point.
     * @param {number} x
     * @param {number} y
     * @returns {boolean} True if the bounds contain the point, otherwise false
     */
    contains(...args: any[]): boolean;
    /**
     * Returns true if the two bounds intersect.
     * @param {Bounds|Rect} bounds
     * @returns {boolean} True if the bounds overlap, otherwise false
     */
    overlaps(bounds: Bounds | Rect): boolean;
    /**
     * determines whether all coordinates of this bounds are finite numbers.
     * @returns {boolean} false if all coordinates are positive or negative Infinity or NaN; otherwise, true.
     */
    isFinite(): boolean;
    /**
     * Translates the bounds by the given vector.
     * @name translate
     * @memberof Bounds
     * @method
     * @param {Vector2d} vector
     */
    /**
     * Translates the bounds by x on the x axis, and y on the y axis
     * @param {number} x
     * @param {number} y
     */
    translate(...args: any[]): void;
    /**
     * Shifts the bounds to the given position vector.
     * @name shift
     * @memberof Bounds
     * @method
     * @param {Vector2d} position
     */
    /**
     * Shifts the bounds to the given x, y position.
     * @param {number} x
     * @param {number} y
     */
    shift(...args: any[]): void;
    /**
     * clone this bounds
     * @returns {Bounds}
     */
    clone(): Bounds;
    /**
     * Returns a polygon whose edges are the same as this bounds.
     * @returns {Polygon} a new Polygon that represents this bounds.
     */
    toPolygon(): Polygon;
}
import Vector2d from "./../math/vector2.js";
