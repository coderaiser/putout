import {test} from 'supertape';
import montag from 'montag';
import {lintJSON} from './json.mjs';

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
                "remove-unused-variables": "off"
            }
        }\n
    `;
    
    t.equal(code, expected);
    t.end();
});

