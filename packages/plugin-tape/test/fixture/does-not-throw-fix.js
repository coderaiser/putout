const tryCatch = require('try-catch');
import {test} from 'supertape';
test('some test', (t) => {
    const [error] = tryCatch(copymitter);
    t.notOk(error, 'should not throw when no args');
    t.end();
});
