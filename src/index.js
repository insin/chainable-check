'use strict';

var ANONYMOUS = '<<anonymous>>'

function chainableCheck(validate) {
  function check(isRequired, props, propName, componentName, location) {
    componentName = componentName || ANONYMOUS
    if (props[propName] == null) {
      if (isRequired) {
        return new Error(
          `Required ${location} \`${propName}\` was not specified in ` +
          `\`${componentName}\`.`
        )
      }
    }
    else {
      return validate(props, propName, componentName, location)
    }
  }

  var chainedCheck = check.bind(null, false)
  chainedCheck.isRequired = check.bind(null, true)

  return chainedCheck
}

module.exports = chainableCheck