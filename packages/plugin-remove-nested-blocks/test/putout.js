'use strict';

const test = require('supertape');
const montag = require('montag');
const putout = require('putout');

test('putout: plugin: remove-nested-blocks: remove-empty', (t) => {
    const {code} = putout(montag`
        export default () => {
            for (const [index, peace] of pieces) {
            }
        }
    `, {
        plugins: [
            'remove-empty',
            'remove-nested-blocks',
        ],
    });
    
    const expected = 'export default () => {};\n';
    
    t.equal(code, expected);
    t.end();
});
