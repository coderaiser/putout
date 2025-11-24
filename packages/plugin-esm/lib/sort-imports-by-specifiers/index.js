import {parseImportSpecifiers} from 'parse-import-specifiers';
import {operator, types} from 'putout';

const {insertBefore, remove} = operator;
const {isImportDeclaration} = types;

export const report = () => `Sort imports by specifiers count`;

export const fix = ({path, nextPath}) => {
    const {node} = nextPath;
    remove(nextPath);
    insertBefore(path, node);
};

export const traverse = ({push}) => ({
    Program(mainPath) {
        const paths = mainPath.get('body').filter(isImportDeclaration);
        
        for (const path of paths) {
            const {node} = path;
            
            if (!node)
                continue;
            
            const {source, specifiers} = node;
            const {imports} = parseImportSpecifiers(specifiers);
            
            if (imports.length < 4)
                continue;
            
            const nextPath = path.getNextSibling();
            
            if (!nextPath.isImportDeclaration())
                continue;
            
            if (nextPath.node.specifiers.length !== 1)
                continue;
            
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
                continue;
            
            push({
                path,
                nextPath,
            });
        }
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
