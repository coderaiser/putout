'use strict';

module.exports.report = () => '"test.skip" should not be used';

module.exports.fix = (path) => {
    const {node} = path;
    node.callee = node.callee.object;
};

module.exports.include = () => [
    '__.skip(__)',
    '__["skip"](__)',
];

