import test from 'supertape';
import montag from 'montag';
import putout from 'putout';

test('putout: plugin: remove-nested-blocks: remove-empty: reproduced only this way', (t) => {
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
