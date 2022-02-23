'use strict';

const {types} = require('putout');
const {isIdentifier} = types;

module.exports.report = () => `Remove 'test.only'`;

module.exports.replace = () => ({
    '__a.only(__b, __c)': '__a(__b, __c)',
    '__a.only(__b, __c, __d)': '__a(__b, __c, __d)',
});

module.exports.filter = (path) => {
    return isIdentifier(path.node.callee.object, {
        name: 'test',
    });
};

