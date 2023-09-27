'use strict';

module.exports.report = () => `Invalid left-hand side in assignment`;

module.exports.replace = () => ({
    '__a?.__b = __c': '__a && (__a.__b = __c)',
});
