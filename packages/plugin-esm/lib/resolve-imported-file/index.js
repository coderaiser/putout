import {join, dirname} from 'node:path';
import {
    parse,
    print,
    transform,
    operator,
} from 'putout';
import * as getImports from './get-imports/index.js';
import * as changeImports from './change-imports/index.js';

const {
    findFile,
    getFilename,
    readFileContent,
    writeFileContent,
} = operator;

const getMessage = (a) => a.message;

export const report = (file, {from, to}) => `Resolve import source: '${from}' -> '${to}'`;
export const fix = (file, {content, ast, from, to}) => {
    transform(ast, content, {
        rules: {
            'change-imports': ['on', {
                from,
                to,
            }],
        },
        plugins: [
            ['change-imports', changeImports],
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
        
        if (!content.includes('import'))
            continue;
        
        const ast = parse(content);
        
        const places = transform(ast, content, {
            plugins: [
                ['get-imports-source', getImports],
            ],
        });
        
        const imports = places.map(getMessage);
        const filename = getFilename(file);
        const dir = dirname(filename);
        const importsTuples = buildImports(dir, imports);
        const resolvedTuples = buildResolved(rootPath, importsTuples);
        
        for (const [from, to] of resolvedTuples) {
            push(file, {
                from,
                to,
                content,
                ast,
            });
        }
    }
};

function buildImports(dir, imports) {
    const list = [];
    
    for (const current of imports) {
        const full = join(dir, current);
        list.push([current, full]);
    }
    
    return list;
}

function buildResolved(rootPath, importsTuples) {
    const result = [];
    
    for (const [relative, current] of importsTuples) {
        const withIndex = join(current, 'index.js');
        const withJs = `${current}.js`;
        
        if (findFile(rootPath, withIndex).length) {
            result.push([relative, `${relative}/index.js`]);
            continue;
        }
        
        if (relative === '..') {
            const withPackage = join(current, 'package.json');
            const [packageJson] = findFile(rootPath, withPackage);
            
            if (!packageJson)
                continue;
            
            const json = readFileContent(packageJson);
            const {main} = JSON.parse(json);
            
            result.push([relative, join(relative, main)]);
            
            continue;
        }
        
        if (findFile(rootPath, withJs).length) {
            result.push([relative, `${relative}.js`]);
            continue;
        }
    }
    
    return result;
}
