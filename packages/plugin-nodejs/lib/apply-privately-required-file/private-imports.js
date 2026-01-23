import {dirname, resolve} from 'node:path';
import {tryCatch} from 'try-catch';
import {operator} from 'putout';

const {
    getFilename,
    readFileContent,
    findFileUp,
} = operator;

const {entries} = Object;
const {parse: parseJson} = JSON;
const isString = (a) => typeof a === 'string';

function insert(a, b, {importsEntries}) {
    importsEntries.set(a, b);
}

export const createGetPrivateImports = (importsCache = new Map(), emptyMap = new Map()) => (file) => {
    const filename = getFilename(file);
    const dir = dirname(filename);
    
    if (importsCache.has(dir))
        return importsCache.get(dir);
    
    const packagePath = findFileUp(file, 'package.json');
    
    if (!packagePath) {
        importsCache.set(dir, emptyMap);
        return emptyMap;
    }
    
    const packageContent = readFileContent(packagePath);
    const [error, packageJson] = tryCatch(parseJson, packageContent);
    
    if (error) {
        importsCache.set(dir, emptyMap);
        
        return emptyMap;
    }
    
    const packageDirectory = dirname(getFilename(packagePath));
    
    const {imports = {}} = packageJson;
    const importsEntries = new Map();
    
    for (const [alias, property] of entries(imports)) {
        const filePath = parseProperty(property);
        
        if (!filePath)
            continue;
        
        const resolvedPath = resolve(packageDirectory, filePath);
        
        insert(resolvedPath, alias, {
            importsEntries,
        });
    }
    
    importsCache.set(dir, importsEntries);
    
    return importsEntries;
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
