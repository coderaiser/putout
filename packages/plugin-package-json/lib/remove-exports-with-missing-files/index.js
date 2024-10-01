import {join} from 'node:path';
import {
    operator,
    parse,
    print,
    transform,
    findPlaces,
} from 'putout';
import * as findKeys from './find-keys/index.js';
import * as removeKeys from './remove-keys/index.js';

const {
    findFile,
    getFilename,
    getParentDirectory,
    readFileContent,
    toJS,
    writeFileContent,
    fromJS,
} = operator;

export const report = () => `Avoid exports with missing files`;

export const fix = (file, {ast, source}) => {
    transform(ast, source, {
        plugins: [
            ['remove-keys', removeKeys],
        ],
    });
    
    const code = print(ast);
    writeFileContent(file, fromJS(code));
};

export const scan = (root, {push, trackFile}) => {
    for (const file of trackFile(root, 'package.json')) {
        const source = toJS(readFileContent(file));
        const ast = parse(source);
        const places = findPlaces(ast, source, {
            plugins: [
                ['find-keys', findKeys],
            ],
        });
        
        const tuples = [];
        
        for (const place of places) {
            tuples.push(place.message.split(' -> '));
        }
        
        const dirPath = getParentDirectory(file);
        const dir = getFilename(dirPath);
        
        const paths = [];
        
        for (const [key, name] of tuples) {
            const full = join(dir, name);
            paths.push([key, full]);
            const [exportedFile] = findFile(dirPath, full);
            
            if (!exportedFile)
                push(file, {
                    key,
                    ast,
                    source,
                });
        }
    }
};
