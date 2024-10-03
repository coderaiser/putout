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

export const fix = (file, {key, ast, source}) => {
    transform(ast, source, {
        rules: {
            'remove-keys': ['on', {
                keys: [key],
            }],
        },
        plugins: [
            ['remove-keys', removeKeys],
        ],
    });
    
    const code = print(ast, {
        printer: ['putout', {
            format: {
                indent: '  ',
            },
        }],
    });
    
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
        
        for (const [key, name] of tuples) {
            const full = join(dir, name);
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
