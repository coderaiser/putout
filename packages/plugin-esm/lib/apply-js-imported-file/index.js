import {dirname} from 'node:path';
import {tryCatch} from 'try-catch';
import {
    parse,
    print,
    transform,
    operator,
} from 'putout';
import * as getImports from '#get-imports';
import * as changeImports from '../resolve-imported-file/change-imports/index.js';

const {
    getFilename,
    getFileType,
    getParentDirectory,
    readFileContent,
    writeFileContent,
    readDirectory,
} = operator;

const {parse: parseJson} = JSON;

const getMessage = (a) => a.message;
const applyJS = (a) => a.replace(/\.[cm]js$/, '.js');

export const report = (file, {from, to}) => `Apply 'js' imported source: '${from}' -> '${to}'`;
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
    
    const getPackageType = createGetPackageType();
    
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
        const type = getPackageType(file);
        
        if (!type)
            continue;
        
        for (const from of imports) {
            const to = applyJS(from);
            
            if (type === 'module' && from.endsWith('.mjs')) {
                push(file, {
                    from,
                    to,
                    content,
                    ast,
                });
                continue;
            }
            
            if (type === 'commonjs' && from.endsWith('.cjs')) {
                push(file, {
                    from,
                    to,
                    content,
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
    
    const [, packagePath] = findPackage(file);
    
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
