'use strict';

const montag = require('montag');
const {test} = require('supertape');
const {cutShebang} = require('./shebang');

test('putout: cut-shebang', (t) => {
    const [, shebang] = cutShebang(montag`
        #!/usr/bin/env node
        import tryToCatch from 'try-to-catch';
    `);
    
    const expected = '#!/usr/bin/env node\n';
    
    t.equal(shebang, expected);
    t.end();
});
