var assert = require("assert")
var compose = require("../src/compose-simple-middleware.js")

describe("compose-middleware-function", function () {
  it("should return a function", function () {
    assert(typeof compose([function () {}]) === "function")
  })
  
  it("should call the next middleware function on next()", function () {
    var checklist = {
      a : false,
      b : false
    }
    
    var mw = [
      function (context, next) {
        next()
        checklist.a = true
      },
      function (context, next) {
        checklist.b = true
      }
    ]
    
    compose(mw)()
    
    assert(checklist.a && checklist.b)
  })
  
  it("should return from the middlware function in which no next is called", function () {
    var checklist = {
      a : false,
      b : false
    }
    
    var mw = [
      function (context, next) {
        checklist.a = true
      },
      function (context, next) {
        checklist.b = false
      }
    ]
    
    compose(mw)()
    
    assert(checklist.a && !checklist.b)
  })
  
  it("next() should return null if middleware functions are exhausted and next is called", function () {
    var mw = [
      function (context, next) {
        return next()
      }
    ]
    
    assert(null === compose(mw)())
  })
  
  it("should pass context object to middleware which may be modified by middleware", function () {
    var context = {
      foo: "foo"
    }
    
    var mw = [
      function (context, next) {
        assert(context.foo === "foo")
        context.foo = "bar"
        next()
        assert(context.foo === "bar")
      },
      function (context, next) {
        assert(context.foo === "bar")
      }
    ]
    
    compose(mw)(context)
   })
})