import {dirname} from 'node:path';
import {operator} from 'putout';
import {parse, print} from '@putout/engine-parser';
import {toJS, fromJS} from '@putout/operator-json';
import {moveFile, findFile} from '@putout/operator-filesystem';

const {replaceWith} = operator;
const {isArray} = Array;
const {stringify} = JSON;

const noTrailingSlash = (a) => {
    if (a === '/')
        return a;
    
    return a.endsWith('/') ? a.slice(0, -1) : a;
};

const createFile = (filename) => ({
    type: 'file',
    filename,
});

const createFileWithContent = (filename, content) => ({
    type: 'file',
    filename,
    content,
});

const createDirectory = (filename) => ({
    type: 'directory',
    filename,
    files: [],
});

const parseFirst = (a) => isArray(a) ? a[0] : a;

export const parseSimpleFilesystem = (list) => {
    const files = createFlatFiles(list);
    const js = toJS(stringify(files));
    const ast = parse(js);
    
    const filenames = list
        .map(parseFirst)
        .map(noTrailingSlash);
    
    const [rootName] = filenames;
    
    for (const filename of filenames) {
        const [filePath] = findFile(ast, filename);
        const dir = dirname(filename);
        const [dirPath] = findFile(ast, dir);
        
        if (!dirPath)
            continue;
        
        moveFile(filePath, dirPath);
    }
    
    const [rootPath] = findFile(ast, rootName);
    
    replaceWith(rootPath.parentPath, rootPath);
    
    return JSON.parse(fromJS(print(ast)));
};

function createFlatFiles(list) {
    const result = [];
    
    for (const file of list) {
        if (isArray(file)) {
            const [filename, content] = file;
            result.push(createFileWithContent(filename, content));
            continue;
        }
        
        if (file.endsWith('/')) {
            result.push(createDirectory(noTrailingSlash(file)));
            continue;
        }
        
        result.push(createFile(file));
    }
    
    return result;
}
