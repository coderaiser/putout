import {join, dirname} from 'node:path';
import {tryCatch} from 'try-catch';
import putout, {
    parse,
    print,
    transform,
    operator,
} from 'putout';
import {createGetPrivateImports} from '#private-imports';
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

export const report = (file, {name, source}) => {
    const filename = getFilename(file);
    return `Use 'import * as ${name} from '${source}' in '${filename}'`;
};

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
    
    const getPrivateImports = createGetPrivateImports();
    
    for (const file of trackFile(rootPath, mask)) {
        const content = readFileContent(file);
        const [error, ast] = tryCatch(parse, content);
        
        if (error)
            continue;
        
        const importsTuples = getImports(file, content, ast);
        
        const privateImports = getPrivateImports(file, {
            aliasBased: true,
        });
        
        for (const [name, source, importedFilename] of importsTuples) {
            const is = hasImportDefault({
                name,
                rootPath,
                importedFilename,
                privateImports,
            });
            
            if (is)
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

function parseImportedFilename({importedFilename, privateImports}) {
    if (privateImports.has(importedFilename))
        return privateImports.get(importedFilename);
    
    return importedFilename;
}

function hasImportDefault({name, rootPath, importedFilename, privateImports}) {
    const parsedName = parseImportedFilename({
        importedFilename,
        privateImports,
    });
    
    const [importedFile] = findFile(rootPath, parsedName);
    
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
    
    for (const {message} of esm) {
        const [, exportName] = message.split(':');
        
        if (name === exportName)
            return true;
    }
    
    return !esm.length;
}

function parseFull(dir, source) {
    if (source.startsWith('#'))
        return source;
    
    return join(dir, source);
}

function buildImports(dir, imports) {
    const list = [];
    
    for (const current of imports) {
        const [name, source] = current.split(' <- ');
        const full = parseFull(dir, source);
        
        list.push([name, source, full]);
    }
    
    return list;
}
