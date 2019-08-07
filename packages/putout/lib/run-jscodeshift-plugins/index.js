'use strict';

const once = require('once');
const print = require('../print');
const getPositions = require('../get-positions-by-diff');

const {isArray} = Array;
const {assign} = Object;

const getMessage = (a) => a.replace('/', ': ');
const parsePlugin = (a) => {
    if (!isArray(a))
        return [
            a,
            getMessage(a),
        ];
    
    const [name, message] = a;
    
    return [
        name,
        getMessage(message),
    ];
};

const getJScodeshift = once(() => require('jscodeshift'));

const wrapCodeShift = () => {
    const j = getJScodeshift();
    
    const fixedJscodeshift = (a) => {
        return assign(j(a), {
            toSource() {
                return print(this.__paths[0].value);
            },
        });
    };
    
    return assign(fixedJscodeshift, j);
};

module.exports = ({fix, ast, jscodeshiftPlugins}) => {
    const places = [];
    
    if (!jscodeshiftPlugins)
        return places;
    
    const jscodeshift = wrapCodeShift(ast);
    
    let oldCode = print(ast);
    for (const plugin of jscodeshiftPlugins) {
        const [pluginName, message] = parsePlugin(plugin);
        const fn = require(pluginName);
        
        const newCode = fn({source: ast}, {jscodeshift});
        
        if (!fix && newCode !== oldCode) {
            const positions = getPositions(oldCode, newCode);
            const rule = `jscodeshift/${pluginName}`;
            
            oldCode = newCode;
            
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

