const tryCatch = require('try-catch');
import {test} from 'supertape';
test('some test', (t) => {
    const [error] = tryCatch(copymitter);
    t.equal(error.message, 'from should be a string!', 'should throw when no args');
    t.end();
});
