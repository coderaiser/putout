import {test} from 'supertape';
import {lint} from './css.js';

test('@putout/processor-css: lint: no source', async (t) => {
    const [code] = await lint('{{ x }}');
    const expected = '';
    
    t.equal(code, expected);
    t.end();
});
