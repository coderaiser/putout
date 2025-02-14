'use strict';

const {operator} = require('putout');

const putout = require('putout');
const {hasParens, removeParens} = operator;

module.exports.report = (path) => {
    const source = putout.print(path);
    const code = source.slice(1, -1);
    
    return `Avoid useless parens: '${source}' -> '${code}'`;
};

module.exports.fix = (path) => {
    removeParens(path);
};

module.exports.traverse = ({push}) => ({
    Function(path) {
        const params = path.get('params');
        
        for (const param of params) {
            if (hasParens(param))
                push(param);
        }
    },
});
