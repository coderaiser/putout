import {
    join,
    dirname,
    basename,
} from 'node:path';
import {
    parse,
    print,
    transform,
    operator,
} from 'putout';
import * as getImports from './get-imports/index.js';
import * as changeImports from '../resolve-imported-file/change-imports/index.js';

const {
    getFilename,
    readFileContent,
    writeFileContent,
} = operator;

const getMessage = (a) => a.message;

export const report = (file, {from, to}) => `Shorten import source: '${from}' -> '${to}'`;
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
                ['get-imports', getImports],
            ],
        });
        
        const imports = places.map(getMessage);
        const filename = getFilename(file);
        const dir = dirname(filename);
        const baseDir = basename(dir);
        
        for (const from of imports) {
            if (!from.startsWith(`../${baseDir}/`))
                continue;
            
            const to = join(dir, from).replace(dir, '.');
            
            if (to.length < from.length)
                push(file, {
                    from,
                    to,
                    content,
                    ast,
                });
        }
    }
};
