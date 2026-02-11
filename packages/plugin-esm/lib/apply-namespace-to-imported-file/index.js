import {tryCatch} from 'try-catch';
import {
    parse,
    print,
    operator,
} from 'putout';
import {createGetPrivateImports} from '#private-imports';
import {determineImportType} from '#determine-import-type';
import {getImportsTuples} from '#get-imports-tuples';
import {transformNamespaceImport} from './transform-namespace-import.js';

const isDeclaration = ([, , , type]) => type !== 'dynamic';
const {
    getFilename,
    readFileContent,
    writeFileContent,
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

export const scan = (rootPath, {push, trackFile, crawlFile}) => {
    const mask = [
        '*.js',
        '*.mjs',
    ];
    
    const getPrivateImports = createGetPrivateImports();
    
    for (const file of trackFile(rootPath, mask)) {
        const content = readFileContent(file);
        const [error, ast] = tryCatch(parse, content);
        
        if (error)
            continue;
        
        const importsTuples = getImportsTuples(file, content, ast);
        
        const privateImports = getPrivateImports(file, {
            aliasBased: true,
        });
        
        const declarations = importsTuples.filter(isDeclaration);
        
        for (const [name, source, importedFilename] of declarations) {
            const importType = determineImportType({
                name,
                rootPath,
                importedFilename,
                privateImports,
                crawlFile,
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
