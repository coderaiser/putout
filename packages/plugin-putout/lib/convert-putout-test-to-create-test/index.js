'use strict';

const {assign} = Object;

module.exports.report = () => `Use 'createTest' instead of 'putoutTest'`;

module.exports.filter = ({scope}) => !scope.bindings.createTest;

module.exports.include = () => [
    'import putoutTest from "@putout/test"',
];

module.exports.fix = (path) => {
    const [first] = path.node.specifiers;
    
    assign(first, {
        type: 'ImportSpecifier',
        kind: 'value',
        imported: first.local,
    });
    
    path.scope.rename('putoutTest', 'createTest');
};

