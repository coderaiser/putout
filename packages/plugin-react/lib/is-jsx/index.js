'use strict';

const noop = () => {};

module.exports.report = () => '';
module.exports.fix = noop;
module.exports.include = () => ['JSXElement'];
