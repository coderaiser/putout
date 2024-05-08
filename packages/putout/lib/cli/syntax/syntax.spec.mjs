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
