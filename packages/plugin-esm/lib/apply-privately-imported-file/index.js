import {join, dirname} from 'node:path';
import {
    parse,
    print,
    transform,
    operator,
} from 'putout';
import * as getImports from '#get-imports';
import * as changeImports from '#change-imports';
import {createGetPrivateImports} from '#private-imports';

const {
    getFilename,
    readFileContent,
    writeFileContent,
} = operator;

const getMessage = (a) => a.message;

export const report = (file, {from, to, filename}) => {
    return `Apply private import: '${from}' -> '${to}' in '${filename}'`;
};
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
    
    const getPrivateImports = createGetPrivateImports();
    
    for (const file of trackFile(rootPath, mask)) {
        const content = readFileContent(file);
        
        if (!content.includes('import'))
            continue;
        
        const privateImports = getPrivateImports(file);
        
        if (!privateImports.size)
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
        
        for (const from of imports) {
            const to = join(dir, from);
            
            if (privateImports.has(to))
                push(file, {
                    from,
                    to: privateImports.get(to),
                    filename,
                    content,
                    ast,
                });
        }
    }
};
