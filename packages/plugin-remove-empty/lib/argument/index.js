'use strict';

const {operator, types} = require('putout');
const {
    isObjectPattern,
    isArrayPattern,
} = types;

const {remove} = operator;

module.exports.report = () => 'Avoid empty destructuring argument';

module.exports.fix = (path) => {
    remove(path);
};

module.exports.traverse = ({push}) => ({
    Function: search({
        push,
    }),
});

const search = ({push}) => (path) => {
    const params = path.get('params');
    const {length} = params;
    
    if (!length)
        return;
    
    const lastPath = params.at(-1);
    
    if (lastPath.isObjectPattern() && !lastPath.node.properties.length)
        push(lastPath);
    
    if (lastPath.isArrayPattern() && !lastPath.node.elements.length)
        push(lastPath);
    
    if (isEmptyAssign(lastPath))
        push(lastPath);
};

function isEmptyAssign(path) {
    if (!path.isAssignmentPattern())
        return false;
    
    const {left} = path.node;
    
    if (isObjectPattern(left))
        return !left.properties.length;
    
    if (isArrayPattern(left))
        return !left.elements.length;
    
    return false;
}
