(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.unistUtilFindBefore = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module unist:util:find-before
 * @fileoverview Utility to find a node before another node.
 */

'use strict';

/* eslint-env commonjs */

/*
 * Dependencies.
 */

var is = require('unist-util-is');

/**
 * Find a node before `index` in `parent` which passes
 * `test`.
 *
 * @param {Node} parent - Parent to search in.
 * @param {number|Node} index - (Position of) node to
 *   search before.
 * @param {*} test - See `wooorm/unist-util-is`.
 * @return {Node?} - A child node of `parent` which passes
 *   `test`.
 */
function findBefore(parent, index, test) {
    var children;
    var child;

    if (!parent || !parent.type || !parent.children) {
        throw new Error('Expected parent node');
    }

    children = parent.children;

    if (index && index.type) {
        index = children.indexOf(index);
    }

    if (isNaN(index) || index < 0 || index === Infinity) {
        throw new Error('Expected positive finite index or child node');
    }

    /* Performance. */
    if (index > children.length) {
        index = children.length;
    }

    while (index--) {
        child = children[index];

        if (is(test, child, index, parent)) {
            return child;
        }
    }

    return null;
}

/*
 * Expose.
 */

module.exports = findBefore;

},{"unist-util-is":2}],2:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module unist:util:is
 * @fileoverview Utility to check if a node passes a test.
 */

'use strict';

/* eslint-env commonjs */

/**
 * Test.
 *
 * @typedef {Function} is~test
 * @param {Node} node - Node to test.
 * @param {number} index - Position of `node` in `parent`.
 * @param {Node} parent - Parent of `node`.
 * @return {boolean?} - Whether this iteration passes.
 */

/**
 * Utility to return true.
 *
 * @type {is~test}
 */
function first() {
    return true;
}

/**
 * Utility to convert a string into a function which checks
 * a given node’s type for said string.
 *
 * @param {string} test - Node type to test.
 * @return {is~test} - Tester.
 */
function typeFactory(test) {
    return function (node) {
        return Boolean(node && node.type === test);
    }
}

/**
 * Utility to convert a node into a function which checks
 * a given node for strict equality.
 *
 * @param {Node} test - Node to test.
 * @return {is~test} - Tester.
 */
function nodeFactory(test) {
    return function (node) {
        return node === test;
    }
}

/**
 * Assert if `test` passes for `node`.
 * When a `parent` node is known the `index` of node
 *
 * @example
 *   is(null, {type: 'strong'}); // true
 *
 * @example
 *   is('strong', {type: 'strong'}); // true
 *   is('emphasis', {type: 'strong'}); // false
 *
 * @example
 *   var node = {type: 'strong'};
 *   is(node, node) // true
 *   is(node, {type: 'strong'}) // false
 *
 * @example
 *   var node = {type: 'strong'};
 *   var parent = {type: 'paragraph', children: [node]};
 *   function test(node, n) {return n === 5};
 *   is(test, {type: 'strong'}); // false
 *   is(test, {type: 'strong'}, 4, parent); // false
 *   is(test, {type: 'strong'}, 5, parent); // true
 *
 * @example
 *   var node = {type: 'strong'};
 *   var parent = {type: 'paragraph', children: [node]};
 *   is('strong'); // throws
 *   is('strong', node, 0) // throws
 *   is('strong', node, null, parent) // throws
 *   is('strong', node, 0, {type: 'paragraph'}) // throws
 *   is('strong', node, -1, parent) // throws
 *   is('strong', node, Infinity, parent) // throws
 *
 * @param {(string|Node|is~test)?} test - Tester.
 * @param {Node} node - Node to test.
 * @param {number?} [index] - Position of `node` in `parent`.
 * @param {Node?} [parent] - Parent of `node`.
 * @param {*} [context] - Context to invoke `test` with.
 * @return {boolean} - Whether `test` passes.
 */
function is(test, node, index, parent, context) {
    var hasParent = parent !== null && parent !== undefined;
    var hasIndex = index !== null && index !== undefined;

    if (typeof test === 'string') {
        test = typeFactory(test);
    } else if (test && test.type) {
        test = nodeFactory(test);
    } else if (test === null || test === undefined) {
        test = first;
    } else if (typeof test !== 'function') {
        throw new Error('Expected function, string, or node as test');
    }

    if (!node || !node.type) {
        throw new Error('Expected node');
    }

    if (
        hasIndex &&
        (typeof index !== 'number' || index < 0 || index === Infinity)
    ) {
        throw new Error('Expected positive finite index or child node');
    }

    if (hasParent && (!parent || !parent.type || !parent.children)) {
        throw new Error('Expected parent node');
    }

    if (hasParent !== hasIndex) {
        throw new Error('Expected both parent and index');
    }

    return Boolean(test.call(context, node, index, parent));
}

/*
 * Expose.
 */

module.exports = is;

},{}]},{},[1])(1)
});