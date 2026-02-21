import {dirname} from 'node:path';
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
    findFileUp,
} = operator;

const {parse: parseJson} = JSON;

const getMessage = (a) => a.message;
const applyJS = (a) => a.replace(/\.[cm]js$/, '.js');

export const report = (file, {from, to}) => `Apply 'js' imported source: '${from}' -> '${to}'`;
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
    
    const getPackageType = createGetPackageType();
    
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
        const type = getPackageType(file);
        
        if (!type)
            continue;
        
        for (const from of imports) {
            const to = applyJS(from);
            
            if (type === 'module' && from.endsWith('.mjs')) {
                push(file, {
                    from,
                    to,
                    ast,
                });
                continue;
            }
            
            if (type === 'commonjs' && from.endsWith('.cjs')) {
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

const createGetPackageType = (importsCache = new Map()) => (file) => {
    const filename = getFilename(file);
    const dir = dirname(filename);
    
    if (importsCache.has(dir))
        return importsCache.get(dir);
    
    const packagePath = findFileUp(file, 'package.json');
    
    if (!packagePath) {
        importsCache.set(dir, 'commonjs');
        return 'commonjs';
    }
    
    const packageContent = readFileContent(packagePath);
    const [error, packageJson] = tryCatch(parseJson, packageContent);
    
    if (error) {
        importsCache.set(dir, '');
        return '';
    }
    
    const {type = 'commonjs'} = packageJson;
    
    importsCache.set(dir, type);
    
    return type;
};
