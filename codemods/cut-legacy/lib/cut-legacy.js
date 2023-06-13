'use strict';

module.exports.report = () => `Suffix "legacy" should be avoided`;

module.exports.fix = (path) => {
    const [nameNode] = path.node.arguments;
    
    nameNode.value = nameNode.value.replace('/legacy', '');
    nameNode.raw = nameNode.raw.replace('/legacy', '');
};

module.exports.include = () => [
    'require("__")',
];

module.exports.filter = (path) => {
    const [nameNode] = path.node.arguments;
    return nameNode.value.includes('/legacy');
};
