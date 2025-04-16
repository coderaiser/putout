import {join, dirname} from 'node:path';
import putout, {
    parse,
    print,
    transform,
    operator,
} from 'putout';
import * as isESMPlugin from './is-esm/index.js';
import * as hasExportDefaultPlugin from './has-export-default/index.js';
import * as applyNamespaceImportPlugin from './apply-namespace-import/index.js';
import * as getImportsPlugin from './get-imports/index.js';

const {
    findFile,
    getFilename,
    readFileContent,
    writeFileContent,
} = operator;

const getMessage = (a) => a.message;
const isESM = (a) => a.rule === 'is-esm';
const hasExportDefault = (a) => a.rule === 'has-export-default';

export const report = (file, {name, source}) => `Use 'import * as ${name} from '${source}'`;
export const fix = (file, {name, source, content, ast}) => {
    transform(ast, content, {
        rules: {
            'apply-namespace-import': ['on', {
                name,
                source,
            }],
        },
        plugins: [
            ['apply-namespace-import', applyNamespaceImportPlugin],
        ],
    });
    
    const newContent = print(ast);
    
    writeFileContent(file, newContent);
};

export const scan = (rootPath, {push, trackFile}) => {
    const mask = [
        '*.js',
        '*.mjs',
    ];
    
    for (const file of trackFile(rootPath, mask)) {
        const content = readFileContent(file);
        const ast = parse(content);
        const importsTuples = getImports(file, content, ast);
        
        for (const [name, source, importedFilename] of importsTuples) {
            if (hasImportDefault(rootPath, importedFilename))
                continue;
            
            push(file, {
                name,
                source,
                ast,
                content,
            });
        }
    }
};

function getImports(file, content, ast) {
    if (!content.includes('import'))
        return [];
    
    const places = transform(ast, content, {
        fix: false,
        plugins: [
            ['get-imports', getImportsPlugin],
        ],
    });
    
    const filename = getFilename(file);
    const dir = dirname(filename);
    
    const imports = places.map(getMessage);
    
    return buildImports(dir, imports);
}

function hasImportDefault(rootPath, importedFilename) {
    const [importedFile] = findFile(rootPath, importedFilename);
    
    if (!importedFile)
        return true;
    
    const importedContent = readFileContent(importedFile);
    
    const {places} = putout(importedContent, {
        fix: false,
        plugins: [
            ['has-export-default', hasExportDefaultPlugin],
            ['is-esm', isESMPlugin],
        ],
    });
    
    const esm = places.filter(isESM);
    const defaultExport = places.filter(hasExportDefault);
    
    if (defaultExport.length)
        return true;
    
    return !esm.length;
}

function buildImports(dir, imports) {
    const list = [];
    
    for (const current of imports) {
        const [name, source] = current.split(' <- ');
        const full = join(dir, source);
        
        list.push([name, source, full]);
    }
    
    return list;
}
