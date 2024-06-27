'use strict';

const {test} = require('supertape');
const putout = require('putout');

test('putout: engine-parser: parse-template-functions: __extract', (t) => {
    const plugin = {
        report: () => '',
        replace: () => ({
            'const __identifier__a = atom(__b)': 'const __identifier__a = atom(__b, __extract(__identifier__a))',
        }),
    };
    
    const input = 'const hello = atom(0);';
    const {code} = putout(input, {
        plugins: [{
            'apply-template-literal': plugin,
        }],
    });
    
    const expected = `const hello = atom(0, 'hello');\n`;
    
    t.equal(code, expected);
    t.end();
});
