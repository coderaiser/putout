import {tryCatch} from 'try-catch';
import {
    parse,
    print,
    operator,
} from 'putout';
import {createGetPrivateImports} from '#private-imports';
import {determineImportType} from '#determine-import-type';
import {transformNamespaceImport} from './transform-namespace-import.js';
import {getImportsTuples} from '../apply-name-to-imported-file/get-imports-tuples.js';

const {
    getFilename,
    readFileContent,
    writeFileContent,
    crawlDirectory,
} = operator;

export const report = (file, {name, source}) => {
    const filename = getFilename(file);
    return `Use \`import * as ${name} from '${source}'\` in '${filename}'`;
};

export const fix = (file, {name, source, content, ast}) => {
    transformNamespaceImport(ast, {
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
        
        for (const [name, source, importedFilename] of importsTuples) {
            const importType = determineImportType({
                name,
                rootPath,
                importedFilename,
                privateImports,
                crawled,
            });
            
            if (importType === 'namespace')
                push(file, {
                    importType,
                    name,
                    source,
                    ast,
                    content,
                });
        }
    }
};
