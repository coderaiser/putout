'use strict';

module.exports.report = () => `Use 'createTest' instead of 'putoutTest'`;

module.exports.filter = ({scope}) => !scope.bindings.createTest;

module.exports.include = () => [
    'import putoutTest from "@putout/test"',
];

module.exports.fix = (path) => {
    path.scope.rename('putoutTest', 'createTest');
};

