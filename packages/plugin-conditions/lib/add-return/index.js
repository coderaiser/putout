'use strict';

module.exports.report = () => `Add return statement`;

module.exports.replace = () => ({
    'if (__a) false': 'if (__a) return false',
    'if (__a) true': 'if (__a) return true',
});
