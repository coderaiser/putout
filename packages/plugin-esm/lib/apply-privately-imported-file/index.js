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
import * as getImports from '../shorten-imported-file/get-imports/index.js';
import * as changeImports from '../resolve-imported-file/change-imports/index.js';

const {
    getFilename,
    getFileType,
    getParentDirectory,
    readFileContent,
    writeFileContent,
    readDirectory,
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
        return importsCache.get(dir);
    
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

function findPackage(file) {
    const parentDirectory = getParentDirectory(file);
    const directoryName = getFilename(parentDirectory);
    
    for (const currentFile of readDirectory(parentDirectory)) {
        const type = getFileType(currentFile);
        
        if (type === 'directory')
            continue;
        
        const currentName = getFilename(currentFile);
        
        if (currentName.endsWith('package.json'))
            return [directoryName, currentFile];
    }
    
    if (directoryName === '/')
        return [];
    
    return findPackage(parentDirectory);
}
