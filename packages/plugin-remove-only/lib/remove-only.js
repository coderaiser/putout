'use strict';

module.exports.report = () => '"test.only" should not be used';

module.exports.fix = ({node}) => {
    node.callee = node.callee.object;
};

module.exports.include = () => [
    '__.only(__)',
    '__["only"](__)',
];

