import {stub} from 'supertape';
import {Stub} from 'supertape';
import {Test} from 'supertape';
import {test} from 'supertape';
test('message', (t: Test) => {
    const fn: Stub = stub();
    t.end();
});

