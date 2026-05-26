import {join, extname} from 'node:path';

export const buildResolved = ({dir, imports, rootPath, crawlFile}) => {
    const importsTuples = buildImports(dir, imports);
    const result = [];
    
    for (const [relative, current] of importsTuples) {
        if (crawlFile(rootPath, current).length)
            continue;
        
        const ext = extname(current);
        const base = current.replace(ext, '');
        const baseRelative = relative.replace(ext, '');
        
        const withJs = `${base}.js`;
        const withCjs = `${base}.cjs`;
        const withMjs = `${base}.mjs`;
        const withJson = `${base}.json`;
        
        if (crawlFile(rootPath, withJson).length) {
            result.push([relative, `${baseRelative}.json`]);
            continue;
        }
        
        if (crawlFile(rootPath, withJs).length) {
            result.push([relative, `${baseRelative}.js`]);
            continue;
        }
        
        if (crawlFile(rootPath, withCjs).length) {
            result.push([relative, `${baseRelative}.cjs`]);
            continue;
        }
        
        if (crawlFile(rootPath, withMjs).length) {
            result.push([relative, `${baseRelative}.mjs`]);
            continue;
        }
    }
    
    return result.filter(Boolean);
};

function buildImports(dir, imports) {
    const list = [];
    
    for (const current of imports) {
        const full = join(dir, current);
        list.push([current, full]);
    }
    
    return list;
}
