;(function () {
    
  /**
   * Returns a function which when invoked with context object will run the middleware
   * @param {Array} list An array with 1 or more middleware functions
   * @returns {Function}
   */
  
  var compose = function (list) {
    
    return function (context, superNext) { // the function returned
      var executionIndex = 0

      var next = function () {
        executionIndex++
        if (executionIndex >= list.length) {
          // if the second argument was passed, it means this composition is going to be used
          // as a middlware function itself, as a part of a larger composition
          if (superNext) {
            return superNext()
          } else {
          //else the last middleware function calls next() when no next middlware fn exists, that nonexistent fn will return null
            return null
          }
        } else {
          return list[executionIndex](context, next)
        }
      }
      
      return list[0](context, next)
    }
  }
  
  /* Exporting */
  
  // for node.js
  if (typeof module !== "undefined" &&  typeof module.exports !== "undefined") module.exports = compose ;
  
  // for browsers
  if (typeof window !== "undefined") {
    window['module:peey/compose-simple-middleware'] = compose
    if (typeof window.composeMiddleware === "undefined") window.composeMiddleware = compose ; // don't overwrite variable if it exists
  }

})();
