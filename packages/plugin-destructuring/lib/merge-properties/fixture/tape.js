const {stub} = require('supertape');
const test = require('supertape');

test('', (t) => {
    const a = stub();
    t.end();
});
