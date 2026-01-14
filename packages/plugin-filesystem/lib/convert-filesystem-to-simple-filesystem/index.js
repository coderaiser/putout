import {types} from '@putout/babel';
import {replaceWith, getProperty} from '@putout/operate';
import {__filesystem_name} from '@putout/operator-json';
import {
    findFile,
    getFilename,
    getFileType,
} from '@putout/operator-filesystem';

const {
    stringLiteral,
    arrayExpression,
} = types;

const {isArray} = Array;
const maybeAddSlash = (a) => a === '/' ? a : `${a}/`;

export const report = () => `Convert Filesystem to Simple Filesystem`;

export const fix = (root, {files}) => {
    const names = [];
    
    for (const file of files) {
        const filename = getFilename(file);
        const type = getFileType(file);
        const contentPath = getProperty(file, 'content');
        const content = contentPath?.node?.value;
        
        if (content) {
            names.push([filename, content.value]);
            continue;
        }
        
        if (type === 'directory') {
            names.push(maybeAddSlash(filename));
            continue;
        }
        
        names.push(filename);
    }
    
    const list = [];
    
    for (const name of names) {
        if (isArray(name)) {
            list.push(arrayExpression([
                stringLiteral(name[0]),
                stringLiteral(name[1]),
            ]));
            continue;
        }
        
        list.push(stringLiteral(name));
    }
    
    replaceWith(root, arrayExpression(list));
};

export const traverse = ({push}) => ({
    [`${__filesystem_name}(__object)`]: (path) => {
        const root = path.get('arguments.0');
        const files = findFile(root, '*');
        
        push(root, {
            files,
        });
    },
});
