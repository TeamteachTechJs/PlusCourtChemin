/**
 * @namespace PF.Heuristic
 * @description
 */
export default {

  /**
   * @param {number} dx
   * @param {number} dy
   * @return {number}
   */
  manhattan: function(dx, dy) {
      return dx + dy;
  },

  /**
   * @param {number} dx
   * @param {number} dy
   * @return {number}
   */
  euclidean: function(dx, dy) {
      return Math.sqrt(dx**2 + dy**2);
  },

  /**

   * @param {number} dx
   * @param {number} dy
   * @return {number}
   */
  octile: function(dx, dy) {
      var F = Math.SQRT2 - 1;
      return (dx < dy) ? F * dx + dy : F * dy + dx;
  },

  /**
   * @param {number} dx
   * @param {number} dy
   * @return {number}
   */
  chebyshev: function(dx, dy) {
      return Math.max(dx, dy);
  }
}
