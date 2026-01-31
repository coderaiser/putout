import {putout, operator} from 'putout';
import * as hasExportDefaultPlugin from '#has-export-default';
import * as isESMPlugin from '#is-esm';

const isESM = (a) => a.rule === 'is-esm';
const hasExportDefault = (a) => a.rule === 'has-export-default';

const {
    findFile,
    readFileContent,
} = operator;

export const determineImportType = ({name, rootPath, importedFilename, privateImports, crawled}) => {
    const parsedName = parseImportedFilename({
        importedFilename,
        privateImports,
    });
    
    const [importedFile] = findFile(rootPath, parsedName, {
        crawled,
    });
    
    if (!importedFile)
        return '';
    
    const importedContent = readFileContent(importedFile);
    
    const {places} = putout(importedContent, {
        fix: false,
        plugins: [
            ['has-export-default', hasExportDefaultPlugin],
            ['is-esm', isESMPlugin],
        ],
    });
    
    const esm = places.filter(isESM);
    
    if (!esm.length)
        return '';
    
    const defaultExport = places.filter(hasExportDefault);
    
    if (defaultExport.length)
        return '';
    
    for (const {message} of esm) {
        const [, exportName] = message.split(':');
        
        if (name === exportName)
            return 'equal';
    }
    
    return 'namespace';
};

function parseImportedFilename({importedFilename, privateImports}) {
    if (privateImports.has(importedFilename))
        return privateImports.get(importedFilename);
    
    return importedFilename;
}
