'use strict';

const {operator, types} = require('putout');
const {isMemberExpression} = types;
const {remove} = operator;

module.exports.report = () => `Avoid useless 'delete'`;

module.exports.fix = (path) => {
    remove(path);
};

module.exports.traverse = ({push}) => ({
    UnaryExpression(path) {
        const {argument, operator} = path.node;
        
        if (operator !== 'delete')
            return;
        
        if (isMemberExpression(argument))
            return;
        
        push(path);
    },
});
