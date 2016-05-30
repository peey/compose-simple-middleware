# compose-simple-middleware

A utility module implementing the middleware design pattern.

## Installation

If you want to use this in browser, simply download the src/compose-simple-middleware.js file and include it via
a script tag. The module exposes a global variable called `composeMiddleware`.

If you want to use this in node.js, simply install via npm using `npm install compose-simple-middleware` and in
your code use it by `var composeMiddleware = require("compose-simple-middleware")`

## Usage

Pass an array of middleware functions of signature `function (context, next)` to get a composed function that accepts
a context object and returns the value of operations performed.

When the returned function is called, the first function in the middleware array is invoked with the context. 
`next()` can be thought of as a reference to the next function in the middleware array, except that you don't
have to pass arguments to it and this module takes care of passing `context, next` to the next function in
the middleware list.

## Examples

See `test/test.js` for simple and illustrative examples on how to use this module. Don't be overwhelmed by the 
directory being named `test`. They are just examples, specified in a way that we could make sure that they work
correctly by running them and testing their outputs.

If you want a tutorial on how you can use the middleware pattern in your code, stay tuned.

## License

MIT License. See LICENSE file.