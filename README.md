## `chainableCheck()` [![travis status](https://secure.travis-ci.org/insin/chainable-check.png)](http://travis-ci.org/insin/chainable-check)

Creates a validation function with the same requiredness behaviour as React's
[`React.PropTypes`](http://facebook.github.io/react/docs/reusable-components.html#prop-validation)
validators.

That is: the validaton function will not be called if the value it's supposed to
validate isn't given (or is `null`), and the function will have an
`.isRequired` property, which is a validation function which will return an
`Error` if the value isn't given (or is `null`).

This is effectively just a standalone version of React's internal
`createChainableTypeChecker()` function from `ReactPropTypes.js`.

## Install

### Node.js

`chainableCheck()` can be used on the server, or bundled for the client using an
npm-compatible packaging system such as [Browserify](http://browserify.org/) or
[webpack](http://webpack.github.io/).

```
npm install --save chainable-check
```

### Browser bundle

The browser bundle exposes a global `chainableCheck` variable.

You can find it in the [/dist directory](https://github.com/insin/chainable-check/tree/master/dist).

## Usage

```javascript
var chainableCheck = require('chainable-check')

var isEven = chainableCheck(function(props, propName, componentName, location) {
  var value = props[propName]
  if (isNaN(parseFloat(value)) || !isFinite(value) || parseFloat(value) % 2 !== 0) {
    return new Error(
      `Invalid ${locationName} \`${propName}\` supplied to ` +
      `\`${componentName}\`, expected an even number.`
    )
  }
})

var ExampleComponent = React.createClass({
  propTypes: {
    evenNumber: isEven
  , requiredEvenNumber: isEven.isRequired
  },

  // ...
})
```

### MIT Licensed