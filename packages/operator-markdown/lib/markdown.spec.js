import {test} from 'supertape';
import {indentCodeblock} from './markdown.js';

test('@putout/operator-markdown: indentCodeblock', (t) => {
    const result = indentCodeblock('const a = 3;');
    
    t.match(result, '        ');
    t.end();
});
