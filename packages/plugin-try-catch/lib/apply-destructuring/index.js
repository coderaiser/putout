import {types} from 'putout';

const {isVariableDeclaration} = types;

export const report = (path) => {
    const {name} = parseName(path);
    return `Use '{${name}}' instead of '${name}'`;
};

export const replace = () => ({
    'import tryCatch from "try-catch"': 'import {tryCatch} from "try-catch"',
    'import tryToCatch from "try-to-catch"': 'import {tryToCatch} from "try-to-catch"',
    'const tryCatch = require("try-catch")': 'const {tryCatch} = require("try-catch")',
    'const tryToCatch = require("try-to-catch")': 'const {tryToCatch} = require("try-to-catch")',
});

function parseName(path) {
    if (isVariableDeclaration(path))
        return path.node.declarations[0].id;
    
    return path.node.specifiers[0].local;
}
