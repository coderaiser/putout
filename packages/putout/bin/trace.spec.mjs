import {
    test,
    stub,
} from 'supertape';
import tryCatch from 'try-catch';
import {createTrace} from './trace.mjs';

test('putout: bin: trace: parentPort', (t) => {
    const data = {};
    const postMessage = stub();
    const parentPort = {
        postMessage,
    };
    
    const trace = createTrace(parentPort);
    
    trace('start', data);
    
    const args = [
        ['start', data],
    ];
    
    t.calledWith(postMessage, args);
    t.end();
});

test('putout: bin: trace: no parentPort', (t) => {
    const data = {};
    const trace = createTrace();
    const [error] = tryCatch(trace, 'start', data);
    
    t.notOk(error);
    t.end();
});
