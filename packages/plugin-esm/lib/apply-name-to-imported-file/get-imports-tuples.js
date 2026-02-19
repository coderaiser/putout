import {dirname, join} from 'node:path';
import {transform, operator} from 'putout';
import * as getImportsPlugin from '#get-default-imports';

const {getFilename} = operator;
const getMessage = (a) => a.message;

export const getImportsTuples = (file, content, ast) => {
    const places = transform(ast, {
        fix: false,
        plugins: [
            ['get-imports', getImportsPlugin],
        ],
    });
    
    const filename = getFilename(file);
    const dir = dirname(filename);
    
    const imports = places.map(getMessage);
    
    return buildImports(dir, imports);
};

function parseFull(dir, source) {
    if (source.startsWith('#'))
        return source;
    
    return join(dir, source);
}

function buildImports(dir, imports) {
    const list = [];
    
    for (const current of imports) {
        const [name, source, type] = current.split(' <- ');
        const full = parseFull(dir, source);
        
        list.push([
            name,
            source,
            full,
            type,
        ]);
    }
    
    return list;
}
