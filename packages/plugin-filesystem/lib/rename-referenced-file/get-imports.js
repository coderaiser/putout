'use strict';

const {operator} = require('putout');
const {setLiteralValue} = operator;

module.exports.report = ({value}) => value;
module.exports.fix = ({path}, {options}) => {
    const {from, to} = options;
    const {value} = path.node.source;
    
    setLiteralValue(path.node.source, value.replace(from, to));
};

module.exports.traverse = ({push, options}) => ({
    ImportDeclaration(path) {
        const {value} = path.node.source;
        const {from} = options;
        
        if (!RegExp(`${from}$`).test(value))
            return;
        
        push({
            path,
            value,
        });
    },
});
