import {test} from 'supertape';
import {montag} from 'montag';
import {convertJsToCss, convertCssToJs} from './css.js';

test('putout: operator: css: convertJsToCss', ({equal}) => {
    const source = montag`
        [
            rule(selector([
                typeSelector('button'),
            ]), [
                declaration('color', string('red')),
            ]),
        ];
    `;
    
    const result = convertJsToCss(source);
    
    const expected = montag`
        button {
            color: "red";
        }
    
    `;
    
    equal(result, expected);
});

test('putout: operator: css: convertCssToJs', ({equal}) => {
    const source = montag`
        button {
            color: "red";
        }
    `;
    
    const result = convertCssToJs(source);
    
    const expected = montag`
        [
            rule(selector([
                typeSelector('button'),
            ]), [
                declaration('color', string('red')),
            ]),
        ];
    
    `;
    
    equal(result, expected);
});
