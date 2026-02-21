import {
    join,
    dirname,
    basename,
} from 'node:path';
import {tryCatch} from 'try-catch';
import {
    parse,
    print,
    transform,
    operator,
} from 'putout';
import * as changeImports from '#change-imports';
import * as getImports from '#get-imports';

const {
    getFilename,
    readFileContent,
    writeFileContent,
} = operator;

const getMessage = (a) => a.message;

export const report = (file, {from, to}) => {
    const name = getFilename(file);
    return `Shorten import source: '${from}' -> '${to}' in '${name}'`;
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

export const scan = (rootPath, {push, trackFile}) => {
    const mask = [
        '*.js',
        '*.mjs',
    ];
    
    for (const file of trackFile(rootPath, mask)) {
        const content = readFileContent(file);
        const [error, ast] = tryCatch(parse, content);
        
        if (error)
            continue;
        
        const places = transform(ast, {
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
                    ast,
                });
        }
    }
};
