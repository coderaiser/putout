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
import * as getImports from './get-require/index.js';
import * as changeImports from './change-require/index.js';

const isString = (a) => typeof a === 'string';

const {
    getFilename,
    readFileContent,
    writeFileContent,
    findFileUp,
} = operator;

const {entries} = Object;
const {parse: parseJson} = JSON;

const getMessage = (a) => a.message;

export const report = (file, {from, to}) => `Apply privately required source: '${from}' -> '${to}'`;
export const fix = (file, {content, ast, from, to}) => {
    transform(ast, content, {
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
        
        const [, privateImports] = getPrivateImports(file);
        
        if (!privateImports.size)
            continue;
        
        const ast = parse(content);
        
        const places = transform(ast, content, {
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

const createGetPrivateImports = (importsCache = new Map(), emptyMap = new Map()) => (file) => {
    const filename = getFilename(file);
    const dir = dirname(filename);
    
    if (importsCache.has(dir))
        return [dir, importsCache.get(dir)];
    
    const [packageDirectory, packagePath] = findFileUp(file, 'package.json');
    
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
    
    for (const [alias, property] of entries(imports)) {
        const filePath = parseProperty(property);
        
        if (!filePath)
            continue;
        
        const resolvedPath = resolve(packageDirectory, filePath);
        
        importsEntries.set(resolvedPath, alias);
    }
    
    importsCache.set(dir, [packageDirectory, importsEntries]);
    
    return [packageDirectory, importsEntries];
};

function parseProperty(property) {
    if (isString(property))
        return property;
    
    const {
        default: filePath,
        node,
        browser,
    } = property;
    
    return filePath || node || browser;
}
