import {join, dirname} from 'node:path';
import {tryCatch} from 'try-catch';
import {
    parse,
    print,
    transform,
    operator,
} from 'putout';
import {createGetPrivateImports} from '#private-imports';
import * as getImportsPlugin from '#get-default-imports';
import * as applyNamedImportPlugin from './apply-named-import/index.js';
import {determineImportType} from './determine-import-type.js';

const {
    getFilename,
    readFileContent,
    writeFileContent,
} = operator;

const getMessage = (a) => a.message;

export const report = (file, {name, source}) => {
    const filename = getFilename(file);
    return `Use 'import {${name}} from '${source}' in '${filename}'`;
};

export const fix = (file, {name, source, content, ast}) => {
    transform(ast, content, {
        rules: {
            'apply-named-import': ['on', {
                name,
                source,
            }],
        },
        plugins: [
            ['apply-named-import', applyNamedImportPlugin],
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
            const importType = determineImportType({
                name,
                rootPath,
                importedFilename,
                privateImports,
            });
            
            if (importType === 'equal')
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

