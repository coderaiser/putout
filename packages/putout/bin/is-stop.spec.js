import {test, stub} from 'supertape';
import {createIsStop} from './is-stop.js';

test('putout: bin: isStop: parentPort', (t) => {
    const on = stub();
    const parentPort = {
        on,
    };
    
    const args = ['message', stub()];
    
    createIsStop(parentPort);
    
    t.calledWith(on, args);
    t.end();
});

test('putout: bin: isStop: no parentPort', (t) => {
    const isStop = createIsStop();
    const result = isStop();
    
    t.notOk(result);
    t.end();
});

test('putout: bin: isStop: parentPort: isStop', (t) => {
    const on = stub();
    const parentPort = {
        on,
    };
    
    const isStop = createIsStop(parentPort);
    const [args] = on.args;
    const [, listener] = args;
    
    listener(['stop']);
    
    const result = isStop();
    
    t.ok(result);
    t.end();
});
