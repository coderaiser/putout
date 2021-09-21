'use strict';

const {template} = require('putout');
const lazyAST = (a) => () => template.ast.fresh(a);

module.exports = {
    compare: lazyAST(`const {compare} = operator`),
    contains: lazyAST(`const {contains} = operator`),
    traverse: lazyAST(`const {traverse} = operator`),
    operator: lazyAST(`import {operator} from 'putout'`),
    types: lazyAST(`import {types} from 'putout'`),
    isIdentifier: lazyAST(`const {isIdentifier} = types`),
};

