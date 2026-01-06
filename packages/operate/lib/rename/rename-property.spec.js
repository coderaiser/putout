import test from 'supertape';
import montag from 'montag';
import {
    parse,
    print,
    traverse,
} from 'putout';
import {renameProperty} from './rename-property.js';

test('putout: operate: rename-property: rename', (t) => {
    const ast = parse('const {hello: x} = c; hello();');
    
    traverse(ast, {
        VariableDeclaration(path) {
            renameProperty(path, 'hello', 'world');
        },
    });
    
    const result = print(ast, {
        printer: 'putout',
    });
    
    const expected = montag`
        const {hello: x} = c;
        hello();\n
    `;
    
    t.equal(result, expected);
    t.end();
});
