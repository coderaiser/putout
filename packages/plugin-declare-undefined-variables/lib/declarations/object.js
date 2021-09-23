'use strict';

const {template} = require('putout');
const lazyAST = (a) => () => template.ast(a);

module.exports = {
    assign: lazyAST('const {assign} = Object'),
    entries: lazyAST('const {entries} = Object'),
    keys: lazyAST('const {keys} = Object'),
    values: lazyAST('const {values} = Object'),
    defineProperty: lazyAST('const {defineProperty} = Object'),
};
