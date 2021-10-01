const {
    stub
} = require('supertape');

import {test} from 'supertape';
test('xxx', (t) => {
    const a = stub();
    
    t.end();
});
