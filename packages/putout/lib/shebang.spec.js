import montag from 'montag';
import {test} from 'supertape';
import {cutShebang} from './shebang.js';

test('putout: cut-shebang', (t) => {
    const [, shebang] = cutShebang(montag`
        #!/usr/bin/env node
        import tryToCatch from 'try-to-catch';
    `);
    
    const expected = '#!/usr/bin/env node\n';
    
    t.equal(shebang, expected);
    t.end();
});
