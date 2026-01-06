import {
    parse,
    operator,
    print,
} from 'putout';
import {test} from 'supertape';
import {getExportDefault} from './get-export-default.js';

const {traverse} = operator;

test('operate: getExportDefault: found', (t) => {
    const ast = parse(`export default {}`);
    
    traverse(ast, {
        ObjectExpression: (path) => {
            const helloPath = getExportDefault(path);
            helloPath.remove();
        },
    });
    
    const result = print(ast);
    const expected = '\n';
    
    t.equal(result, expected);
    t.end();
});

test('operate: getExportDefault: not found', (t) => {
    let result;
    const ast = parse(`({hello: 'world'})`);
    
    traverse(ast, {
        ObjectExpression: (path) => {
            result = getExportDefault(path);
        },
    });
    
    t.notOk(result);
    t.end();
});
