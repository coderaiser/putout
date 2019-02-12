'use strict';

const {
    findClass,
} = require('../common');

module.exports.report = ({node}) => {
    const {name} = node;
    return `name of method "${name}" should not start from under score`;
};

module.exports.fix = ({node}) => {
    const {name} = node;
    node.name = name.replace(/^_/, '');
};

module.exports.find = (ast, {push, traverse}) => {
    findClass(traverse, ast, {
        ClassMethod(path) {
            const keyPath = path.get('key');
            const {name} = keyPath.node;
            
            if (!name.indexOf('_'))
                push(keyPath);
        },
    });
};

