'use strict';

const {parseImportSpecifiers} = require('parse-import-specifiers');
const {operator} = require('putout');
const {insertBefore, remove} = operator;

module.exports.report = () => `Sort imports by specifiers count`;

module.exports.fix = ({path, nextPath}) => {
    const {node} = nextPath;
    remove(nextPath);
    insertBefore(path, node);
};

module.exports.traverse = ({push}) => ({
    ImportDeclaration(path) {
        const {node} = path;
        const {source, specifiers} = node;
        const {imports} = parseImportSpecifiers(specifiers);
        
        if (imports.length < 4)
            return;
        
        const nextPath = path.getNextSibling();
        
        if (!nextPath.isImportDeclaration())
            return;
        
        if (nextPath.node.specifiers.length !== 1)
            return;
        
        const first = source.value;
        const second = nextPath.node.source.value;
        
        const is = isExcluded(first, second, {
            direct: [
                ['node:', 'node:'],
                ['#', '#'],
            ],
            reversed: [
                ['./', './'],
                ['../', '../'],
                ['#', '#'],
            ],
        });
        
        if (is)
            return;
        
        push({
            path,
            nextPath,
        });
    },
});

function isExcluded(first, second, {direct, reversed}) {
    for (const [current, next] of direct) {
        if (first.startsWith(current) && !second.startsWith(next))
            return true;
    }
    
    for (const [current, next] of reversed) {
        if (!first.startsWith(current) && second.startsWith(next))
            return true;
    }
    
    return false;
}
