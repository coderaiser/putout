'use strict';

const once = require('once');

const {print} = require('@putout/engine-parser');
const {assign} = Object;

const isStr = (a) => typeof a === 'string';

const printAST = (a) => isStr(a) ? a : print(a);
const getFn = (fn) => (...args) => {
    return printAST(fn(...args));
};

const getJScodeshift = once(() => require('jscodeshift'));

const wrapCodeShift = (ast) => {
    const j = getJScodeshift();
    const avoidPrint = {
        toSource() {},
    };
    
    let isCalled = false;
    const fixedJscodeshift = (a) => {
        if (isCalled)
            return j(a);
        
        isCalled = true;
        return assign(j(ast), avoidPrint);
    };
    
    return assign(fixedJscodeshift, j);
};

module.exports = (ast, source, pluginName) => {
    const jscodeshift = wrapCodeShift(ast);
    const fn = getFn(require(pluginName));
    const options = {};
    
    fn({source}, {jscodeshift}, options);
};

