'use strict';

var test = require('tape')

var chainableCheck = require('../lib/index')

var isEven = chainableCheck(function(props, propName, componentName, location) {
  var value = props[propName]
  if (isNaN(parseFloat(value)) || !isFinite(value) || parseFloat(value) % 2 !== 0) {
    return new Error(
      ("Invalid " + location + " `" + propName + "` supplied to ") +
      ("`" + componentName + "`, expected an even number.")
    )
  }
})

function testValidation(t, func) {
  t.error(func({value: 2}, 'value', 'tape test', 'test input'))
  var error = func({value: 3}, 'value', 'tape test', 'test input')
  t.ok(error instanceof Error, 'Error returned for invalid value')
  t.equal(error.message, 'Invalid test input `value` supplied to `tape test`, expected an even number.')
}

// The returned validation function should work as expected
test('validation function', function(t) {
  t.plan(3)
  testValidation(t, isEven)
})

// The isRequired function added by chainableCheck should validate the presence
// of a value, and should call the original validation function if present.
test('.isRequired', function(t) {
  t.plan(5)

  var error = isEven.isRequired({}, 'value', 'tape test', 'test input')
  t.ok(error instanceof Error, 'Error returned for missing value')
  t.equal(error.message, 'Required test input `value` was not specified in `tape test`.')

  testValidation(t, isEven.isRequired)
})