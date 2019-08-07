'use strict';

const once = require('once');

const print = require('../print');
const getPositions = require('../get-positions-by-diff');

const {isArray} = Array;
const {assign} = Object;

const isFn = (a) => typeof a === 'function';
const isStr = (a) => typeof a === 'string';

const printAST = (a) => isStr(a) ? a : print(a);
const getFn = (a) => (...args) => {
    const fn = isFn(a) ? a : a.default;
    return printAST(fn(...args));
};

const getMessage = (a) => a.replace('/', ': ');
const parsePlugin = (a) => {
    if (!isArray(a))
        return [
            a,
            getMessage(a),
            {},
        ];
    
    const [name, message, options] = a;
    
    return [
        name,
        message || getMessage(name),
        options || {},
    ];
};

const getJScodeshift = once(() => require('jscodeshift'));

const wrapCodeShift = (ast) => {
    const j = getJScodeshift();
    const avoidPrint = {
        toSource() {},
    };
    
    const fixedJscodeshift = () => {
        return assign(j(ast), avoidPrint);
    };
    
    return assign(fixedJscodeshift, j);
};

module.exports = ({fix, ast, jscodeshiftPlugins}) => {
    const places = [];
    
    if (!jscodeshiftPlugins)
        return places;
    
    const jscodeshift = wrapCodeShift(ast);
    
    let source = print(ast);
    for (const plugin of jscodeshiftPlugins) {
        const [pluginName, message, options] = parsePlugin(plugin);
        const fn = getFn(require(pluginName));
        
        fn({source}, {jscodeshift}, options);
        
        const newSource = print(ast);
        
        if (!fix && newSource !== source) {
            const positions = getPositions(source, newSource);
            const rule = `jscodeshift/${pluginName}`;
            
            source = newSource;
            
            for (const position of positions)
                places.push({
                    rule,
                    message,
                    position,
                });
        }
    }
    
    return places;
};

