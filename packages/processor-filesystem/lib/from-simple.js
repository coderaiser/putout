import {dirname} from 'node:path';

const {keys} = Object;
const {isArray} = Array;
const isString = (a) => typeof a === 'string';
const maybeArray = (a) => isArray(a) ? a : [a];

const {stringify, parse} = JSON;

const isDir = (a) => a.endsWith('/');
const cutSlash = (a) => a === '/' ? a : !a.endsWith('/') ? a : a.slice(0, -1);

export const maybeFromSimple = (simple) => {
    if (!simple.startsWith('['))
        return simple;
    
    const array = parse(simple);
    
    return stringify(fromSimple(array), null, 4);
};

export const fromSimple = (simple) => {
    const [root, ...list] = simple;
    const withoutSlash = cutSlash(root);
    const rootDir = createDirectory(withoutSlash);
    
    const directories = {
        [withoutSlash]: rootDir,
    };
    
    for (const current of list) {
        let file;
        const [filename, content] = maybeArray(current);
        
        if (isDir(filename)) {
            const withoutSlash = cutSlash(filename);
            
            file = createDirectory(withoutSlash);
            directories[withoutSlash] = file;
        } else {
            file = createFile(filename);
            addContent(file, content);
        }
        
        const name = dirname(filename);
        const currentDir = directories[name];
        
        if (!currentDir)
            throw Error(`☝️ Looks like directory '${name}' not found. Only: '${keys(directories)}'`);
        
        currentDir.files.push(file);
    }
    
    return rootDir;
};

const createDirectory = (filename) => ({
    filename: cutSlash(filename),
    type: 'directory',
    files: [],
});

const createFile = (filename) => ({
    filename,
    type: 'file',
});

const addContent = (file, content) => {
    if (isString(content))
        file.content = content;
};
