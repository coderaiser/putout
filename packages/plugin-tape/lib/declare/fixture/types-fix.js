import {test} from 'supertape';
import {Test} from 'supertape';
import {Stub} from 'supertape';
import {stub} from 'supertape';
test('message', (t: Test) => {
    const fn: Stub = stub();
    t.end();
});

