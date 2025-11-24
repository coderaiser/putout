import {parseImportSpecifiers} from 'parse-import-specifiers';
import {operator, types} from 'putout';

const {insertAfter, remove} = operator;

const {isImportDeclaration} = types;

export const report = () => `Sort imports by specifiers count`;

export const fix = ({path, nextPath}) => {
    const {node} = path;
    
    remove(path);
    insertAfter(nextPath, node);
};

export const traverse = ({push}) => ({
    Program(mainPath) {
        const paths = mainPath.get('body').filter(isImportDeclaration);
        
        for (const path of paths) {
            const {node} = path;
            const {specifiers} = node;
            const {imports} = parseImportSpecifiers(specifiers);
            
            if (imports.length < 4)
                continue;
            
            const nextPath = getLastNextPath(path);
            
            if (!nextPath)
                continue;
            
            push({
                path,
                nextPath,
            });
        }
    },
});

function getLastNextPath(path) {
    let next = path;
    let prev;
    
    do {
        prev = next;
        next = getNextPath(prev);
    } while (next);
    
    if (prev === path)
        return null;
    
    return prev;
}

function getNextPath(path) {
    const nextPath = path.getNextSibling();
    
    if (!nextPath.isImportDeclaration())
        return null;
    
    if (nextPath.node.specifiers.length !== 1)
        return null;
    
    const {source} = path.node;
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
        return null;
    
    return nextPath;
}

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
