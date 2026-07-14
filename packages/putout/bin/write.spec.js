import {test} from 'supertape';
import {createWrite} from './write.js';

const noop = () => {};

test('putout: bin: createWrite: parentPort', (t) => {
    const parentPort = {};
    const write = createWrite(parentPort);
    
    write();
    const result = String(write);
    const expected = String(noop);
    
    t.equal(result, expected);
    t.end();
});

test('putout: bin: createWrite: no parentPort', (t) => {
    const write = createWrite();
    const result = String(write);
    const expected = String(noop);
    
    t.notEqual(result, expected);
    t.end();
});
