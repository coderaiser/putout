import {test} from 'supertape';
import {createWrite} from './write.mjs';

const noop = () => {};

test('putout: bin: createWrite: parentPort', (t) => {
    const parentPort = {};
    const write = createWrite(parentPort);
    
    write();
    
    t.equal(String(write), String(noop));
    t.end();
});

test('putout: bin: createWrite: no parentPort', (t) => {
    const write = createWrite();
    
    t.notEqual(String(write), String(noop));
    t.end();
});
