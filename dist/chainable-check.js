/*!
 * chainable-check 1.0.0 - https://github.com/insin/chainable-check
 * MIT Licensed
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.chainableCheck=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var ANONYMOUS = '<<anonymous>>'

function chainableCheck(validate) {
  function check(isRequired, props, propName, componentName, location) {
    componentName = componentName || ANONYMOUS
    if (props[propName] == null) {
      if (isRequired) {
        return new Error(
          ("Required " + location + " `" + propName + "` was not specified in ") +
          ("`" + componentName + "`.")
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
},{}]},{},[1])(1)
});