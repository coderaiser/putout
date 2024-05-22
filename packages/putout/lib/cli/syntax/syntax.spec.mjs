import {test} from 'supertape';
import montag from 'montag';
import {lintSyntax} from './syntax.mjs';

test('putout: cli: syntax: fn', async (t) => {
    const source = montag`
        function fn() {};
        fn();\n
    `;
    
    const {places} = await lintSyntax(source, {
        fix: true,
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: cli: syntax: broken string', async (t) => {
    const source = montag`
        const a = 'hello;
        const b = 'world';\n
    `;
    
    const {places} = await lintSyntax(source, {
        fix: true,
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});
