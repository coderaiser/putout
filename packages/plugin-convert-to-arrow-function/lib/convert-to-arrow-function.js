'use strict';

module.exports.report = () => 'Arrow functions should be used';
module.exports.fix = (path) => {
    const right = path.get('right');
    right.node.type = 'ArrowFunctionExpression';
};

module.exports.include = () => [
    '__ = function __(__args){}',
];

module.exports.exclude = () => [
    '__.prototype.__ = function __(__args){}',
];

module.exports.filter = (path) => {
    const right = path.get('right');
    const {id} = right.node;
    
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

