'use strict';

const {types} = require('putout');
const {isFunction} = types;

module.exports.report = () => `"process.exit" should be used instead of top-level return`;

module.exports.filter = (path) => {
    return !path.findParent(isFunction);
};

module.exports.replace = () => ({
    'return __a()': '{__a(); process.exit()}',
    'return __a': 'process.exit()',
});

