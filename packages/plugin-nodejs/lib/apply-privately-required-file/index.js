import {join, dirname} from 'node:path';
import {
    parse,
    print,
    transform,
    operator,
} from 'putout';
import * as getImports from './get-require/index.js';
import * as changeImports from './change-require/index.js';
import {createGetPrivateImports} from './private-imports.js';

const {
    getFilename,
    readFileContent,
    writeFileContent,
} = operator;

const getMessage = (a) => a.message;

export const report = (file, {from, to}) => `Apply privately required source: '${from}' -> '${to}'`;
export const fix = (file, {ast, from, to}) => {
    transform(ast, {
        rules: {
            'change-require': ['on', {
                from,
                to,
            }],
        },
        plugins: [
            ['change-require', changeImports],
        ],
    });
    
    const newContent = print(ast);
    
    writeFileContent(file, newContent);
};

export const scan = (rootPath, {push, trackFile}) => {
    const mask = [
        '*.js',
        '*.cjs',
    ];
    
    const getPrivateImports = createGetPrivateImports();
    
    for (const file of trackFile(rootPath, mask)) {
        const content = readFileContent(file);
        
        if (!content.includes('require'))
            continue;
        
        const privateImports = getPrivateImports(file);
        
        if (!privateImports.size)
            continue;
        
        const ast = parse(content);
        
        const places = transform(ast, {
            plugins: [
                ['get-require', getImports],
            ],
        });
        
        const imports = places.map(getMessage);
        
        const filename = getFilename(file);
        const dir = dirname(filename);
        
        for (const from of imports) {
            const to = join(dir, from);
            
            if (privateImports.has(to))
                push(file, {
                    from,
                    to: privateImports.get(to),
                    content,
                    ast,
                });
        }
    }
};
