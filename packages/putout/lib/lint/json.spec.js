import {test} from 'supertape';
import montag from 'montag';
import {lintJSON} from './json.js';

const {stringify} = JSON;

test('putout: lint: json', (t) => {
    const rawSource = stringify({
        rules: {
            'remove-unused-variables': 'off',
        },
        formatter: 'json',
    });
    
    const code = lintJSON(rawSource, {
        plugins: [
            'putout-config',
        ],
    });
    
    const expected = montag`
        {
            "formatter": "json",
            "rules": {
                "variables/remove-unused": "off"
            }
        }\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: lint: json: same', (t) => {
    const rawSource = stringify({
        rules: {
            'remove-debugger': 'off',
        },
        formatter: 'json',
    });
    
    const code = lintJSON(rawSource, {
        plugins: [
            'putout-config',
        ],
    });
    
    const expected = montag`
        {
            "formatter": "json",
            "rules": {
                "remove-debugger": "off"
            }
        }\n
    `;
    
    t.equal(code, expected);
    t.end();
});
