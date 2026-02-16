import {join} from 'node:path';
import {operator} from 'putout';

const {readFileContent} = operator;

export const buildResolved = ({dir, imports, rootPath, crawlFile}) => {
    const importsTuples = buildImports(dir, imports);
    const result = [];
    
    for (const [relative, current] of importsTuples) {
        const withIndex = join(current, 'index.js');
        const withJs = `${current}.js`;
        const withJson = `${current}.json`;
        
        if (crawlFile(rootPath, withIndex).length) {
            if (relative.endsWith('/')) {
                result.push([relative, `${relative}index.js`]);
                continue;
            }
            
            result.push([relative, `${relative}/index.js`]);
            continue;
        }
        
        if (crawlFile(rootPath, withJson).length) {
            result.push([relative, `${relative}.json`]);
            continue;
        }
        
        if (crawlFile(rootPath, withJs).length) {
            result.push([relative, `${relative}.js`]);
            continue;
        }
        
        if (relative.startsWith('..')) {
            result.push(parseMainFromDotDot({
                relative,
                current,
                rootPath,
                crawlFile,
            }));
            continue;
        }
    }
    
    return result.filter(Boolean);
};

function parseMainFromDotDot({relative, current, rootPath, crawlFile}) {
    const withPackage = join(current, 'package.json');
    const [packageJson] = crawlFile(rootPath, withPackage);
    
    if (!packageJson)
        return;
    
    const json = readFileContent(packageJson);
    const {main} = JSON.parse(json);
    
    return [relative, join(relative, main)];
}

function buildImports(dir, imports) {
    const list = [];
    
    for (const current of imports) {
        const full = join(dir, current);
        list.push([current, full]);
    }
    
    return list;
}
