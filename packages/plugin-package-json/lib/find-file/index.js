import {
    operator,
    parse,
    print,
    transform,
} from 'putout';
import rules from '../package-json.js';

const {
    findFile,
    readFileContent,
    writeFileContent,
    toJS,
    fromJS,
} = operator;

const plugins = Object.entries(rules);

export const report = () => `Find 'package.json'`;

export const fix = (file, {ast, content}) => {
    transform(ast, content, {
        plugins,
    });
    
    writeFileContent(file, fromJS(print(ast)));
};

export const scan = (root, {push, progress}) => {
    const files = findFile(root, 'package.json');
    const n = files.length;
    
    for (const [i, file] of files.entries()) {
        const content = toJS(readFileContent(file));
        const ast = parse(content);
        const places = transform(ast, content, {
            fix: false,
            plugins,
        });
        
        if (!places.length)
            continue;
        
        push(file, {
            content,
            ast,
        });
        
        progress({
            i,
            n,
        });
    }
};
