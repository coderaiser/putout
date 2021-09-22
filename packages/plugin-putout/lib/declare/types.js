'use strict';

const {template, types} = require('putout');
const lazyAST = (a) => () => template.ast.fresh(a);
const lazyASTDeclare = (a) => () => template.ast.fresh(`const {${a}} = types`);

const result = {
    types: lazyAST(`import {types} from 'putout'`),
};
const {keys} = Object;

for (const name of keys(types)) {
    if (/^is/.test(name))
        result[name] = lazyASTDeclare(name);
}

module.exports = result;
