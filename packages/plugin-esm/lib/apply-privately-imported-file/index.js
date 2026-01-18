import {
    join,
    dirname,
    resolve,
} from 'node:path';
import {tryCatch} from 'try-catch';
import {
    parse,
    print,
    transform,
    operator,
} from 'putout';
import * as getImports from '#get-imports';
import * as changeImports from '#change-imports';
import {findPackage} from '#find-package';

const {
    getFilename,
    readFileContent,
    writeFileContent,
} = operator;

const {entries} = Object;
const {parse: parseJson} = JSON;

const getMessage = (a) => a.message;

export const report = (file, {from, to}) => `Apply privately imported source: '${from}' -> '${to}'`;
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
        
        const [, privateImports] = getPrivateImports(file);
        
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
            const to = join(dir, from).replace(dir, '.');
            
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

const createGetPrivateImports = (importsCache = new Map(), emptyMap = new Map()) => (file) => {
    const filename = getFilename(file);
    const dir = dirname(filename);
    
    if (importsCache.has(dir))
        return [dir, importsCache.get(dir)];
    
    const [packageDirectory, packagePath] = findPackage(file);
    
    if (!packagePath) {
        importsCache.set(dir, {});
        return ['', emptyMap];
    }
    
    const packageContent = readFileContent(packagePath);
    const [error, packageJson] = tryCatch(parseJson, packageContent);
    
    if (error) {
        importsCache.set(dir, emptyMap);
        
        return ['', emptyMap];
    }
    
    const {imports = {}} = packageJson;
    const importsEntries = new Map();
    
    for (const [alias, {default: filePath}] of entries(imports)) {
        const resolvedPath = resolve(packageDirectory, filePath);
        importsEntries.set(resolvedPath, alias);
    }
    
    importsCache.set(dir, [packageDirectory, importsEntries]);
    
    return [packageDirectory, importsEntries];
};
