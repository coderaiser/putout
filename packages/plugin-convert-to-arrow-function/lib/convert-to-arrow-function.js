'use strict';

module.exports.report = () => 'Use arrow function';

module.exports.fix = (path) => {
    const fnPath = getFnPath(path);
    fnPath.node.type = 'ArrowFunctionExpression';
};

module.exports.include = () => [
    '__ = function __(__args){}',
    'return function (__args){}',
    '__(function __(__args){})',
];

module.exports.exclude = () => [
    '__.prototype.__ = function __(__args){}',
];

module.exports.filter = (path) => {
    const fnPath = getFnPath(path);
    const {id} = fnPath.node;
    
    if (id)
        return false;
    
    let isThis = false;
    
    path.traverse({
        ThisExpression() {
            isThis = true;
        },
    });
    
    return !isThis;
};

function getFnPath(path) {
    if (path.isCallExpression())
        return path.get('arguments.0');
    
    const argumentPath = path.get('argument');
    
    if (argumentPath.isFunction())
        return argumentPath;
    
    return path.get('right');
}
