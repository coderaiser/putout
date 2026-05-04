import {dirname, join} from 'node:path';
import {tryCatch} from 'try-catch';
import {
    parse,
    print,
    transform,
    operator,
} from 'putout';
import * as getImports from '#get-imports';
import * as changeImports from '#change-imports';

const {
    getFilename,
    readFileContent,
    writeFileContent,
    findFile,
} = operator;

const getMessage = (a) => a.message;
const applyJS = (a) => a.replace(/\.js$/, '.jsx');

export const report = (file, {from, to}) => `Apply 'jsx' to imported source: '${from}' -> '${to}'`;
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
        '*.jsx',
    ];
    
    for (const file of trackFile(rootPath, mask)) {
        const content = readFileContent(file);
        
        if (!content.includes('import'))
            continue;
        
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
        
        for (const from of imports) {
            const to = applyJS(from);
            const importedFilename = join(dir, to);
            
            if (!isJSX(rootPath, importedFilename))
                continue;
            
            if (from.endsWith('.js')) {
                push(file, {
                    from,
                    to,
                    ast,
                });
                continue;
            }
        }
    }
};

function isJSX(rootPath, filename) {
    const [importedFile] = findFile(rootPath, filename);
    
    if (!importedFile)
        return false;
    
    return readFileContent(importedFile).includes('</');
}
