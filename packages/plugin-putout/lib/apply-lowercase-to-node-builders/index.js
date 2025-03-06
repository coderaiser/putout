'use strict';

const {types} = require('putout');
const {isIdentifier} = types;

module.exports.report = () => `Use lowercased node builders`;

module.exports.fix = (path) => {
    const [first] = path.node.name;
    const other = path.node.name.slice(1);
    
    path.node.name = first.toLowerCase() + other;
};

module.exports.traverse = ({push}) => ({
    CallExpression(path) {
        const calleePath = path.get('callee');
        
        if (!isIdentifier(calleePath))
            return;
        
        const {name} = calleePath.node;
        const [first, second] = name;
        
        if (!/[A-Z]/.test(first))
            return;
        
        if (!/[a-z]/.test(second))
            return;
        
        if (!types[name])
            return;
        
        push(calleePath);
    },
});
