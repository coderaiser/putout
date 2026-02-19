import {dirname} from 'node:path';
import {
    parse,
    print,
    transform,
    operator,
} from 'putout';
import * as changeImports from '#change-imports';
import * as getImports from './get-imports/index.js';
import {buildResolved} from './build-resolved.js';

const {
    getFilename,
    readFileContent,
    writeFileContent,
} = operator;

const getMessage = (a) => a.message;

export const report = (file, {from, to, filename}) => {
    return `Resolve import source: '${from}' -> '${to}' in '${filename}'`;
};

export const fix = (file, {ast, from, to}) => {
    transform(ast, {
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

export const scan = (rootPath, {push, trackFile, crawlFile}) => {
    const mask = [
        '*.js',
        '*.mjs',
    ];
    
    for (const file of trackFile(rootPath, mask)) {
        const content = readFileContent(file);
        
        if (!content.includes('import'))
            continue;
        
        const ast = parse(content);
        
        const places = transform(ast, {
            plugins: [
                ['get-imports-source', getImports],
            ],
        });
        
        const imports = places.map(getMessage);
        const filename = getFilename(file);
        const dir = dirname(filename);
        
        const resolvedTuples = buildResolved({
            dir,
            imports,
            rootPath,
            crawlFile,
        });
        
        for (const [from, to] of resolvedTuples) {
            push(file, {
                filename,
                from,
                to,
                content,
                ast,
            });
        }
    }
};
