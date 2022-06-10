/**
 * @constructor
 * @param {number} x
 * @param {number} y
 * @param {boolean} [walkable]
 */
export default function Node(x, y, walkable) {
    /**
     * @type 
     */
    this.x = x;
    /**
     * @type
     */
    this.y = y;
    /**
     * @type
     */
    this.walkable = (walkable === undefined ? true : walkable);
}
