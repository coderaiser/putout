'use strict';

module.exports.report = () => '"operator" should be used instead of "operate"';

module.exports.include = () => [
    'Program',
];

module.exports.filter = (path) => {
    const noOperator = !path.scope.bindings.operator;
    const yesOperate = path.scope.bindings.operate;
    
    return noOperator && yesOperate;
};

module.exports.fix = (path) => {
    path.scope.rename('operate', 'operator');
};
