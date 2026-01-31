import {tryCatch} from 'try-catch';
import {
    parse,
    print,
    operator,
} from 'putout';
import {createGetPrivateImports} from '#private-imports';
import {determineImportType} from '#determine-import-type';
import {transformNamedImport} from './transform-named-import.js';
import {getImportsTuples} from './get-imports-tuples.js';

const {
    getFilename,
    readFileContent,
    writeFileContent,
    crawlDirectory,
} = operator;

export const report = (file, {name, source, type}) => {
    const filename = getFilename(file);
    
    if (type === 'import')
        return `Use \`import {${name}} from '${source}'\` in '${filename}'`;
    
    return `Use \`export {${name}} from '${source}'\` in '${filename}'`;
};

export const fix = (file, {name, source, content, ast}) => {
    transformNamedImport(ast, {
        name,
        source,
        content,
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
    const crawled = crawlDirectory(rootPath);
    
    for (const file of trackFile(rootPath, mask)) {
        const content = readFileContent(file);
        const [error, ast] = tryCatch(parse, content);
        
        if (error)
            continue;
        
        const importsTuples = getImportsTuples(file, content, ast);
        
        const privateImports = getPrivateImports(file, {
            aliasBased: true,
        });
        
        for (const [name, source, importedFilename, type] of importsTuples) {
            const importType = determineImportType({
                name,
                rootPath,
                importedFilename,
                privateImports,
                crawled,
            });
            
            if (importType === 'equal')
                push(file, {
                    type,
                    name,
                    source,
                    ast,
                    content,
                });
        }
    }
};
